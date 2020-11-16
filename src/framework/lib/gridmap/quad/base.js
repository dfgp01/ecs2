import { AbstractGridMap, GetGridHeight, GetGridWidth } from "../base";
import { NewPos } from "../../../foundation/structure/geometric";
import { calcGridPos, findChildNodeWithPos, getNodeByFlag } from "./node";


/**
 * 四叉树
 */
class BaseQuadTreeMap extends AbstractGridMap {
    constructor(deep = 0){
        super();
        this.deep = deep;
        this.root = null;
    }

    getWidth(){
        return GetGridWidth(this.root);
    }
    getHeight(){
        return GetGridHeight(this.root);
    }

    getStartPos(){
        return this.getGridStartPos(this.root);
    }
    getEndPos(){
        return this.getGridEndPos(this.root);
    }

    getDataCount(){}

    //获取叶子节点
    getGrid(pos = null){
        //这里要将pos变为相对坐标
        //let rPos = ToLocatePos(pos, GetGridMapPos(this));
        return findChildNodeWithPos(this.root, pos, NewPos());
    }

    getGridStartPos(grid = null){
        return calcGridPos(grid, -1);
    }
    getGridCenterPos(grid = null){
        return calcGridPos(grid, 0);
    }
    getGridEndPos(grid = null){
        return calcGridPos(grid, 1);
    }
    getOffsetGrid(grid = null, xOffset = 0, yOffset = 0){
        return getNodeByFlag(this, grid.deep, grid._xFlag + xOffset, grid._yFlag + yOffset);
    }
}

export{
    BaseQuadTreeMap
}