import { AddToCollection, RemoveFromCollection } from "../../foundation/component/collection";
import { GetEventListenerList, GetEventListenerPriority, GetEventListenerType } from "./base";

function AddEventListener(listener = null){
    AddToCollection(
        GetEventListenerList(
            GetEventListenerType(listener)), 
        listener,
        GetEventListenerPriority(listener));
}

function RemoveEventListener(listener = null){
    RemoveFromCollection(
        GetEventListenerList(
            GetEventListenerType(listener)), 
        listener.id);
}

export{
    AddEventListener, RemoveEventListener
}