import { NewTileMapColliderContainer } from '../gridmap/tilemap';
import { GetNormalColliderSystem } from '../list/normal';
import { GetGroupColliderSystem } from '../list/group';
import { GetGridMapColliderSystem } from '../gridmap/base';
import { NewSimpleQuadtreeColliderContainer, NewStrictQuadtreeColliderContainer } from '../gridmap/quadtree';
import { NewCollideEventListener, NewCollider } from '../base';
import { AddEventListener } from '../../events/utils';

var colliderContainer = null;

var sys = null;
function GetColliderSystem(){
    return sys;
}

/**
 * 启用碰撞检测机制
 * {
 *      "group" : {
            "pairs" : [[1,2], [1,3], [2,3]]
        },
        "quadtree" : {
            "deep" : 3, "width" : 800, "height" : 600, "use-strict" : 1
        },
        "tilemap" : {
            "width" : 800, "height" : 800, "rows" : 10, "columns" : 10
        }
 * }
 */
function OpenCollider(options = null){
    if(!options){
        return
    }
    let ops = null;

    if(options['group']){
        ops = options['group'];
        sys = GetGroupColliderSystem();
    }else if(options['tilemap']){
        ops = options['tilemap'];
        sys = GetGridMapColliderSystem(NewTileMapColliderContainer());
    }else if(options['quadtree']){
        ops = options['quadtree'];
        if(ops['use-strict']){
            sys = GetGridMapColliderSystem(NewStrictQuadtreeColliderContainer());
        }else{
            sys = GetGridMapColliderSystem(NewSimpleQuadtreeColliderContainer());
        }
    }else{
        sys = GetNormalColliderSystem();
    }
    colliderContainer = sys.container;
    colliderContainer.onInit(ops);
    return sys;
}

function AddCollider(entityId = 0, rect = null, tag = 0, offset = null) {
    let c = NewCollider(entityId, rect, tag, offset);
    colliderContainer.addCollider(c);
    return c;
}

function RemoveCollider(collider = null) {
    colliderContainer.removeCollider(collider);
}


/**
 * 碰撞处理器
 * @param {*} callback  func(collider1, collider2, tag)
 */
function NewCollideHandler(callback = null){
    let lis = NewCollideEventListener(callback);
    AddEventListener(lis);
    return lis.id;
}

export {
    GetColliderSystem, OpenCollider, AddCollider, RemoveCollider, NewCollideHandler
}