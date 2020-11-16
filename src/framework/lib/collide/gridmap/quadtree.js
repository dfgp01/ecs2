import { GetGridData, GetGridHeight, GetGridWidth, GetGridWithPos } from "../../gridmap/base";
import { GetRectHeight, GetRectWidth } from "../../../foundation/structure/geometric";
import { GetParentNode } from "../../gridmap/quad/node";
import { NewSimpleQuadTree } from "../../gridmap/quad/simple";
import { NewStrictQuadTree } from "../../gridmap/quad/strict";
import { GetColliderRect, NewColliderRectCenter } from "../base";
import { AddToCollection } from "../../../foundation/component/collection";

const { BaseGridMapColliderContainer } = require("./base");

class SimpleQuadtreeColliderContainer extends BaseGridMapColliderContainer {
    
    onInit(options = null){
        let deep = options['deep'];
        let width = options['width'];
        let height = options['height'];
        this.gridmap = NewSimpleQuadTree(width, height, deep);
        super.initGrids();
    }
}

function NewSimpleQuadtreeColliderContainer(){
    return new SimpleQuadtreeColliderContainer();
}

class StrictQuadtreeColliderContainer extends BaseGridMapColliderContainer {
    
    onInit(options = null){
        let deep = options['deep'];
        let width = options['width'];
        let height = options['height'];
        this.gridmap = NewStrictQuadTree(width, height, deep);
        super.initGrids();
    }

    addCollider(collider = null){
        addColliderBySize(this.gridmap, collider);
    }
    removeCollider(collider = null){
        //todo
    }
}

function addColliderBySize(quadtree = null, collider = null){
    let grid = GetGridWithPos(quadtree, NewColliderRectCenter(collider));
    if(!grid){
        return; //log here todo要完善GetGridWithPos的错误提示
    }
    let targetGrid = findNodeBySize(grid, GetColliderRect(collider));
    AddToCollection(GetGridData(targetGrid), collider);
}

/**
 * 找到合适的grid 
 */
function findNodeBySize(grid = null, rect = null){
    if(GetRectWidth(rect) <= (GetGridWidth(grid) * 2) && GetRectHeight(rect) <= (GetGridHeight(grid) * 2)){
        return grid;
    }
    let parent = GetParentNode(grid);
    if(!parent){
        return grid;    //已经是root了
    }
    return findNodeBySize(parent, rect);
}

function NewStrictQuadtreeColliderContainer(){
    return new StrictQuadtreeColliderContainer();
}

export{
    NewSimpleQuadtreeColliderContainer, NewStrictQuadtreeColliderContainer
}