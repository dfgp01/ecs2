import { GetEngine } from "./resource";
import { ListIterator, InsertToList } from "../../foundation/container/list";
import { NewLink } from "../../lib/list/linklist";
import { GetEventListenerSystem } from "./listener";
import { GetSystemPriority } from "../../foundation/component/ecs";
import { GetUnitPosUpdateSystem } from "./unit";
import { GetRenderDebugSystem } from "../../lib/view/debug";
import { EngineStart } from "../../foundation/component/engine";
import { GetRenderUpdateSystem } from "../../lib/view/system";
import { OpenCollider } from "../../lib/collide/utils/boot";

/**
 * 主系统列表
 */
var logicSystems = NewLink();
var renderSystems = NewLink();
function initSystems(options = null){
    options = options ? options : {};
    //InsertToLink(logicSystems, GetActionSystem());
    //InsertToLink(logicSystems, GetPosUpdateSystem());
    
    addSystem(GetEventListenerSystem());
    addSystem(GetUnitPosUpdateSystem());
    addRenderSystem(GetRenderUpdateSystem());
    if(options['debug']){
        addRenderSystem(GetRenderDebugSystem());
    }
    //开启碰撞系统
    if(options['collide']){
        addSystem(OpenCollider(options['collide']));
    }
}

var logicTick = 16;     //60fps
var renderTick = 41;    //24fps
var _t1 = 0;
var _t2 = 0;
function runWithScene(scene = null){
    ListIterator(logicSystems, system => {
        system.onStart();
    });
    ListIterator(renderSystems, system => {
        system.onStart();
    });
    scene.onStart();

    //main loop
    EngineStart(GetEngine(), dt => {
        _t1 += dt;
        if(_t1 >= logicTick){
            _t1 -= logicTick;
            scene.onUpdate(dt);
            ListIterator(logicSystems, system => {
                system.onUpdate(dt);
            });
        }

        _t2 += dt;
        if(_t2 >= renderTick){
            _t2 -= renderTick;
            ListIterator(renderSystems, system => {
                system.onUpdate(dt);
            });
        }
    });
}

function addSystem(system = null){
    if(!system){
        return;
    }
    InsertToList(logicSystems, system, GetSystemPriority(system));
}

function addRenderSystem(system = null){
    if(!system){
        return;
    }
    InsertToList(renderSystems, system, GetSystemPriority(system));
}

function stopSystem(){
    ListIterator(logicSystems, system => {
        system.onEnd();
    });
    renderSystem.onEnd();
}

export {
    initSystems, runWithScene, addSystem, stopSystem
}