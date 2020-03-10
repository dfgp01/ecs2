import { GameObject } from "./ecs";

export const EventKeydown = 1001;
export const EventKeyup = 1002;
export const EventTouchOn = 1003;
export const EventTouchOver = 1004;

export const EventTilemapCreated = 2001;

class Event {
    constructor(type = 0, data = null){
        this.type = type;
        this.data = data;
    }
}

function NewEvent(type = 0, data = null){
    return new Event(type, data);
}

function GetEventType(event = null){
    return event.type;
}

function GetEventData(event = null){
    return event.data;
}

class AbstractEventListener extends GameObject {
    constructor(type = 0, order = 0){
        super();
        this.type = type;
        this.order = order;
    }
    handle(event = null){}
}

function GetEventListenerType(listener = null){
    return listener.type;
}

function GetEventListenerOrder(listener = null){
    return listener.order;
}

function HandleEventListener(listener = null, event = null){
    listener.handle(event);
}

export {
    Event, NewEvent, GetEventType, GetEventData,
    AbstractEventListener, GetEventListenerType, GetEventListenerOrder, HandleEventListener
}