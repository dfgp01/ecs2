import { initGame, loadWithResource, initEngine } from "./service/init";
import { runWithScene, stopSystem } from "./service/system";
import { GetScene, getListenerList } from "./service/resource";
import { InsertToList, RemoveFromList, ListIterator } from "../foundation/container/list";

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
 *          useBox : false,
 *          useGroup : false,
 *          pairs : [
 *              {
 *                  team1 : 1,
 *                  team2 : 2
 *              }
 *          ],
 *          handler : function(dt, collider1, collider2)
 *      }
 * }
 * TODO scene可以是一个action?
 */
function Start(options = null, scene = null){
    options = options ? options : {};
    initEngine(options);
    loadWithResource(options['res'], null, () => {
        initGame(options);
        runWithScene(scene);
    });
}

function Stop(){
    GetScene().onEnd();
    //stopSystems();
    stopSystem();
    StopEngine(getEngine());
}


function AddEventListener(listener = null){
    let lisList = getListenerList(listener.type);
    InsertToList(lisList, listener, listener.order);
}

function RemoveEventListener(listener = null){
    let lisList = getListenerList(listener.type);
    RemoveFromList(lisList, listener.id);
}

function DispatchEvent(event = null){
    let lisList = getListenerList(event.type);
    ListIterator(lisList, listener => {
        listener.handle(event);
    });
}

export {
    Start, Stop,
    AddEventListener, RemoveEventListener, DispatchEvent
}