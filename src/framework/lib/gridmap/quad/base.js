import { AbstractGridMap, GetGridHeight, GetGridWidth } from "../../../foundation/container/gridmap";
import { calcGridPos, getNodeWithPos } from "./calc";

class BaseQuadTreeMap extends AbstractGridMap {
    constructor(pos = null, deep = 0){
        super(pos);
        this.deep = deep;
        this.root = null;
    }

    getGridMapWidth(){
        return GetGridWidth(this.root);
    }
    getGridMapHeight(){
        return GetGridHeight(this.root);
    }

    //获取叶子节点
    getGrid(pos = null){
        return getNodeWithPos(this, pos);
    }

    getGridStartPos(grid = null){
        return calcGridPos(grid, 0);
    }
    getGridCenterPos(grid = null){
        return calcGridPos(grid, 0.5);
    }
    getGridEndPos(grid = null){
        return calcGridPos(grid, 1);
    }
}

export{
    BaseQuadTreeMap
}