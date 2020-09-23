import { GetTileMapColliderContainer } from '../gridmap/tilemap';
import { GetNormalColliderSystem, GetNormalColliderContainer } from '../list/normal';
import { GetGroupColliderContainer, GetGroupColliderSystem } from '../list/group';
import { GetGridMapColliderSystem } from '../gridmap/base';
import { GetSimpleQuadtreeColliderContainer, GetStrictQuadtreeColliderContainer } from '../gridmap/quadtree';
import { NewCollider } from '../base';

//抽象接口
var colliderContainer = null;

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
    let sys = null;
    let ops = null;

    if(options['group']){
        ops = options['group'];
        colliderContainer = GetGroupColliderContainer();
        sys = GetGroupColliderSystem();
    }else if(options['tilemap']){
        ops = options['tilemap'];
        colliderContainer = GetTileMapColliderContainer();
        sys = GetGridMapColliderSystem(colliderContainer);
    }else if(options['quadtree']){
        ops = options['quadtree'];
        if(ops['use-strict']){
            colliderContainer = GetStrictQuadtreeColliderContainer();
            sys = GetGridMapColliderSystem(colliderContainer);
        }else{
            colliderContainer = GetSimpleQuadtreeColliderContainer();
            sys = GetGridMapColliderSystem(colliderContainer);
        }
    }else{
        colliderContainer = GetNormalColliderContainer();
        sys = GetNormalColliderSystem();
    }
    colliderContainer.init(ops);
    return sys;
}

function AddCollider(entityId = 0, rectOR = null, tag = 0) {
    let c = NewCollider(entityId, rectOR, tag);
    colliderContainer.addCollider(c);
    return c;
}

function RemoveCollider(collider = null) {
    colliderContainer.removeCollider(collider);
}

export {
    OpenCollider, AddCollider, RemoveCollider
}