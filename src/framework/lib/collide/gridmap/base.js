import { GetGameUnitByClz } from "../../../director/utils/boot";
import { GetGridData, GetGridMapData, GridMapAdjacentCompare, GridMapIterator, SetGridData } from "../../../foundation/container/gridmap";
import { NewRectORCenter } from "../../../foundation/utils/rect";
import { NewLink } from "../../list/linklist";
import { AbstractColliderContainer, AbstractColliderSystem, GetColliderCenterPos, GetColliderRectOR } from "../base";

const { AddToList, RemoveFromList, ListIteratorCompare, ListIterator } = require("../../../foundation/container/list");

/**
 * 网格类的装载容器
 */
class BaseGridMapColliderContainer extends AbstractColliderContainer {
    constructor(){
        super();
        this.gridmap = null;    //gridmap.data限定为list<collider>
    }

    init(options = null){
        GridMapIterator(this.gridmap, (grid) => {
            SetGridData(grid, NewLink());
        });
    }

    addCollider(collider = null){
        let list = GetGridMapData(this.gridmap, GetColliderCenterPos(collider));
        AddToList(list, collider);
    }

    //todo
    removeCollider(collider = null){
        let pos = NewRectORCenter(
            GetGameUnitByClz(collider), 
            GetColliderRectOR(collider));
        let list = GetGridMapData(this.gridmap, pos);
        RemoveFromList(list, collider.id);
    }
}

/**
 * 基于网格算法的检测系统
 */
class GridMapColliderSystem extends AbstractColliderSystem {
    constructor(container = null){
        super();
        this.container = container;
    }
    onUpdate(dt = 0){
        GridMapIterator(this.container.gridmap, grid => {
            let list = GetGridData(grid);
            ListIteratorCompare(list, (collider1, collider2) => {
                super.check(dt, collider1, collider2);
            });
        });
        GridMapAdjacentCompare(this.container.gridmap, (currGrid = null, sideGrid = null) => {
            let list1 = GetGridData(currGrid);
            let list2 = GetGridData(sideGrid);
            ListIterator(list1, collider1 => {
                ListIterator(list2, collider2 => {
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