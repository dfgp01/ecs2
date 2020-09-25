import { AbstractGridMap, GetGridHeight, GetGridMapPos, GetGridWidth } from "../../../foundation/container/gridmap";
import { NewPos, ToLocatePos } from "../../../foundation/structure/geometric";
import { calcGridPos, findNodeWithPos, getNodeByFlag } from "./calc";

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
        //这里要将pos变为相对坐标
        let rPos = ToLocatePos(pos, GetGridMapPos(this));
        return findNodeWithPos(this.root, rPos, NewPos());
    }

    getOffsetGrid(grid = null, xOffset = 0, yOffset = 0){
        return getNodeByFlag(this, grid.deep, grid._xFlag + xOffset, grid._yFlag + yOffset);
    }

    getGridStartPos(grid = null){
        return calcGridPos(this, grid, -1);
    }
    getGridCenterPos(grid = null){
        return calcGridPos(this, grid, 0);
    }
    getGridEndPos(grid = null){
        return calcGridPos(this, grid, 1);
    }
}

export{
    BaseQuadTreeMap
}