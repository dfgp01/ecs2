import { GetActionSystem } from "./action";
import { GetRenderUpdateSystem, GetDrawRectSystem } from "./render";
import { GetPosUpdateSystem } from "./move";
import { runTick } from "../../foundation/engine/h5/processor";
import { PushToLink, NewLink, LinkIterator, InsertToLink } from "../../foundation/structure/link";

/**
 * 主系统列表
 */
var logicSystems = NewLink();
var renderSystem = null;
function initSystems(debug = false){
    InsertToLink(logicSystems, GetActionSystem());
    InsertToLink(logicSystems, GetPosUpdateSystem());
    renderSystem = GetRenderUpdateSystem();
}

var logicTick = 16;     //60fps
var renderTick = 41;    //24fps
var _t1 = 0;
var _t2 = 0;
function runWithScene(scene = null){
    LinkIterator(logicSystems, system => {
        system.onStart();
    });
    renderSystem.onStart();
    scene.onStart();

    //main loop
    runTick(dt => {
        _t1 += dt;
        if(_t1 >= logicTick){
            _t1 -= logicTick;
            scene.onUpdate(dt);
            LinkIterator(logicSystems, system => {
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

function AddSystem(system = null){
    if(!system){
        return;
    }
    InsertToLink(logicSystems, system);
}

export{initSystems, runWithScene, AddSystem}