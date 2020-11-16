import { AddToCollection, CollectionIterator, CollectionIteratorCompare, RemoveFromCollection } from "../../../foundation/component/collection";
import { NewLinkList } from "../../collection/linklist";
import { GetGridData, GetGridMapData, GridMapAdjacentCompare, GridMapIterator, SetGridData } from "../../gridmap/base";
import { AbstractColliderContainer, AbstractColliderSystem, NewColliderRectCenter } from "../base";

/**
 * 网格类的装载容器
 */
class BaseGridMapColliderContainer extends AbstractColliderContainer {
    constructor(){
        super();
        this.gridmap = null;    //gridmap.data限定为list<collider>
    }

    initGrids(){
        GridMapIterator(this.gridmap, (grid) => {
            SetGridData(grid, NewLinkList());
        });
    }

    addCollider(collider = null){
        let list = GetGridMapData(this.gridmap, NewColliderRectCenter(collider));
        if(list){
            AddToCollection(list, collider);
        }
    }

    //todo
    removeCollider(collider = null){
        let list = GetGridMapData(this.gridmap, NewColliderRectCenter(collider));
        if(list){
            RemoveFromCollection(list, collider.id);
        }
    }
}

/**
 * 基于网格算法的检测系统
 */
class GridMapColliderSystem extends AbstractColliderSystem {
    onUpdate(dt = 0){
        GridMapIterator(this.container.gridmap, grid => {
            let list = GetGridData(grid);
            CollectionIteratorCompare(list, (collider1, collider2) => {
                super.check(dt, collider1, collider2);
            });
        });
        GridMapAdjacentCompare(this.container.gridmap, (currGrid = null, sideGrid = null) => {
            let list1 = GetGridData(currGrid);
            let list2 = GetGridData(sideGrid);
            CollectionIterator(list1, collider1 => {
                CollectionIterator(list2, collider2 => {
                    super.check(dt, collider1, collider2);
                });
            });
        });
    }
}

var sys = null;
function GetGridMapColliderSystem(container = null){
    if(!sys){
        sys = new GridMapColliderSystem(container);
    }
    return sys;
}

export{
    BaseGridMapColliderContainer, GetGridMapColliderSystem
}