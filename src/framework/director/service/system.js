import { GetEngine } from "./resource";
import { GetSystemPriority } from "../../foundation/component/ecs";
import { EngineClear, EngineStart } from "../../foundation/component/engine";
import { OpenCollider } from "../../lib/collide/utils/boot";
import { GetRenderDebugSystem } from "../../lib/view/debug";
import { GetFrameUpdateSystem } from "../../lib/view/display";
import { GetActionSystem } from "../../lib/actions/base";
import { NewLinkList } from "../../lib/collection/linklist";
import { GetEventListenerSystem } from "../../lib/events/base";
import { GetUnitPosUpdateSystem } from "../../lib/unit/base";
import { AddToCollection, CollectionIterator } from "../../foundation/component/collection";

/**
 * 主系统列表
 */
var logicSystems = NewLinkList();
var renderSystems = NewLinkList();
function initSystems(options = null){
    options = options ? options : {};
    //InsertToLink(logicSystems, GetActionSystem());
    addSystem(GetActionSystem());
    addSystem(GetEventListenerSystem());
    addSystem(GetUnitPosUpdateSystem());
    addRenderSystem(GetFrameUpdateSystem());
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
    CollectionIterator(logicSystems, system => {
        system.onStart();
    });
    CollectionIterator(renderSystems, system => {
        system.onStart();
    });
    scene.onStart();

    //main loop
    EngineStart(GetEngine(), dt => {
        _t1 += dt;
        if(_t1 >= logicTick){
            _t1 -= logicTick;
            scene.onUpdate(dt);
            CollectionIterator(logicSystems, system => {
                system.onUpdate(dt);
            });
        }

        _t2 += dt;
        if(_t2 >= renderTick){
            _t2 -= renderTick;
            EngineClear(GetEngine());
            CollectionIterator(renderSystems, system => {
                system.onUpdate(dt);
            });
        }
    });
}

function addSystem(system = null){
    if(!system){
        return;
    }
    AddToCollection(logicSystems, system, GetSystemPriority(system));
}

function addRenderSystem(system = null){
    if(!system){
        return;
    }
    AddToCollection(renderSystems, system, GetSystemPriority(system));
}

function stopSystem(){
    CollectionIterator(logicSystems, system => {
        system.onEnd();
    });
    renderSystem.onEnd();
}

export {
    initSystems, runWithScene, addSystem, stopSystem
}