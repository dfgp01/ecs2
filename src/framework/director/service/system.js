import { NewLink, ListIterator } from "@/framework/foundation/container/list";
import { GetActionSystem } from "@/framework/lib/action/system";
import { GetPosUpdateSystem } from "@/framework/lib/pos/system";
import { GetRenderUpdateSystem } from "@/framework/lib/view/system";
import { EngineStart } from "@/framework/lib/engine/base";
import { GetEngine } from "../resource";

/**
 * 主系统列表
 */
var logicSystems = NewLink();
var renderSystem = null;
function initSystems(debug = false){
    //InsertToLink(logicSystems, GetActionSystem());
    //InsertToLink(logicSystems, GetPosUpdateSystem());
    renderSystem = GetRenderUpdateSystem();
}

var logicTick = 16;     //60fps
var renderTick = 41;    //24fps
var _t1 = 0;
var _t2 = 0;
function runWithScene(scene = null){
    ListIterator(logicSystems, system => {
        system.onStart();
    });
    renderSystem.onStart();
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
            renderSystem.onUpdate(dt);
        }
    });
}

function addSystem(system = null){
    if(!system){
        return;
    }
    InsertToLink(logicSystems, system);
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