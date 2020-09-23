import { System } from "../../foundation/component/ecs";
import { HandleEventListener, GetEventListenerType, GetEventListenerPriority } from "../../foundation/component/event";
import { InsertToList, RemoveFromList, ListIterator } from "../../foundation/container/list";
import { SYSTEM_PRIORITY_LISTENER } from "../../foundation/const";
import { NewLink } from "../../lib/list/linklist";

var eventList = [];
function addEvent(event = null){
    eventList.push(event);
}

/**
 * 监听器
 */
var listenerMap = new Map();
function getEventListenerList(eventType = 0){
    let lisList = listenerMap.get(eventType);
    if(!lisList){
        lisList = NewLink();
        listenerMap.set(eventType, lisList);
    }
    return lisList;
}

function addEventListener(listener = null){
    let type = GetEventListenerType(listener);
    InsertToList(
        getEventListenerList(type), 
        listener,
        GetEventListenerPriority(listener));
}

function removeEventListener(listener = null){
    let type = GetEventListenerType(listener);
    RemoveFromList(
        getEventListenerList(type), listener.id);
}

class EventListenerSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_LISTENER);
    }
    onUpdate(dt = 0){
        if(eventList.length == 0){
            return
        }
        let evt = null;
        do{
            evt = eventList.shift();
            ListIterator(
                getEventListenerList(evt.type), listener => {
                HandleEventListener(listener, evt, dt);
            });
        }while(eventList.length > 0);
    }
}

var sys = null;
function GetEventListenerSystem(){
    if(!sys){
        sys = new EventListenerSystem();
    }
    return sys;
}

export{
    addEvent, addEventListener, removeEventListener,
    GetEventListenerSystem
}