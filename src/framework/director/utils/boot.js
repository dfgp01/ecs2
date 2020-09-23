import { initGame, loadWithResource } from "../service/init";
import { runWithScene, stopSystem, addSystem } from "../service/system";
import { GetScene, GetUnitList } from "../service/resource";
import { addEvent, addEventListener, removeEventListener } from "../service/listener";
import { GetOwnerId } from "../../foundation/component/ecs";
import { NewUnit } from "../../foundation/unit/base";
import { PushToList, RemoveFromList, GetListData } from "../../foundation/container/list";

/**
 * options {
 *      textures : 格式见LoadResource()内
 *      screen : {
 *          width : 800,
 *          height : 800
 *      },
 *      fps : 60,
 *      debug : false,
 *      camera : {
 *          x : 0,
 *          y : 0
 *      },
 *      tilemap : 格式参考tilemap一节
 *      keyHandler : function(type, keyCode)   type=1 = down, type=2 = up
 *      collide : {
 *          type: "group"
 *          pairs : [[1, 2], [2, 4], [1, 8]...]
 *      
 *          type: "grid"
 *          max-width: 64
 *          max-height: 64
 *          rows: 8
 *          columns: 8
 *      }
 * }
 * TODO scene可以是一个action?
 */
function Start(options = null, scene = null){
    options = options ? options : {};
    loadWithResource(options['res'], null, () => {
        initGame(options);
        runWithScene(scene);
    });
}

function StartTest(options = null, scene = null){
    options = options ? options : {};
    initGame(options);
    runWithScene(scene);
}

function Stop(){
    GetScene().onEnd();
    stopSystem();
    StopEngine(getEngine());
}

function AddEventListener(listener = null){
    addEventListener(listener);
}

function RemoveEventListener(listener = null){
    removeEventListener(listener);
}

function DispatchEvent(event = null){
    addEvent(event);
}

function AddSystem(system = null){
    addSystem(system);
}

/**
 * ######  Unit
 */

function GetGameUnitById(entityId = 0){
    return GetListData(GetUnitList(), entityId);
}


function GetGameUnitByClz(unitComponent = null){
    return GetGameUnitById(
        GetOwnerId(unitComponent));
}

function CreateGameUnit(pos = null, vec = null){
    let u = NewUnit(pos, vec);
    PushToList(GetUnitList(), u);
    return u;
}

function RemoveGameUnit(entityId = 0){
    RemoveFromList(GetUnitList(), entityId);
}

export {
    Start, StartTest, Stop,
    AddEventListener, RemoveEventListener, DispatchEvent,
    AddSystem,
    GetGameUnitById, GetGameUnitByClz, CreateGameUnit, RemoveGameUnit
}