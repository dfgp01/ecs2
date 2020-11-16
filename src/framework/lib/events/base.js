import { CollectionIterator } from "../../foundation/component/collection";
import { GameObject, System } from "../../foundation/component/ecs";
import { SYSTEM_PRIORITY_LISTENER } from "../../foundation/const";
import { NewLinkList } from "../collection/linklist";

export const EventKeydown = 1001;
export const EventKeyup = 1002;
export const EventTouchOn = 1003;
export const EventTouchOver = 1004;

export const EventTilemapCreated = 2001;

/**
 * 基础事件消息
 */
class Event {
    constructor(type = 0, data = null){
        this.type = type;
        this.data = data;
    }
}

function GetEventType(event = null){
    return event.type;
}

function GetEventData(event = null){
    return event.data;
}

class AbstractEventListener extends GameObject {
    constructor(type = 0, priority = 0){
        super();
        this.type = type;
        this.priority = priority;
    }
    onHandle(eventData = null){}
}

function GetEventListenerType(listener = null){
    return listener.type;
}

function GetEventListenerPriority(listener = null){
    return listener.priority;
}


/**
 * TODO 暂时使用数组，后期优化
 */
var eventList = [];
function AddNewEvent(type = 0, data = null){
    eventList.push(new Event(type, data));
}

/**
 * 监听器组
 */
var listenerMap = new Map();
function GetEventListenerList(eventType = 0){
    let lisList = listenerMap.get(eventType);
    if(!lisList){
        lisList = NewLinkList();
        listenerMap.set(eventType, lisList);
    }
    return lisList;
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
            CollectionIterator(
                GetEventListenerList(evt.type), listener => {
                    listener.onHandle(evt.data);
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

export {
    AddNewEvent, GetEventType, GetEventData,
    AbstractEventListener, GetEventListenerType, GetEventListenerPriority,
    GetEventListenerList, GetEventListenerSystem
}