import { NewPos } from "../../../foundation/structure/geometric";
import { BaseQuadTreeMap } from "./base";
import { createRootNode, getNodeByFlag } from "./calc";
import { IsLeaFNode } from "./node";

class SimpleQuadTree extends BaseQuadTreeMap {

    getOffsetGrid(grid = null, xOffset = 0, yOffset = 0){
        return getNodeByFlag(this, grid.deep, grid._xFlag + xOffset, grid._yFlag + yOffset);
    }

    //深度优先遍历，只返回子节点
    iterator(callback = null){
        iteratorByDepth(this.root, callback);
    }

    //相邻对比，只处理子节点
    adjacentCompare(currGrid = null, callback = null){
        otherCheck(currGrid, -1, 0, callback);
        otherCheck(currGrid, -1, -1, callback);
        otherCheck(currGrid, 0, -1, callback);
        otherCheck(currGrid, 1, -1, callback);
    }
}

function iteratorByDepth(node = null, callback = null){
    if(IsLeaFNode(node)){
        callback(node);
        return;
    }
    node.children.forEach(child => {
        iteratorByDepth(child, callback);
    });
}

function otherCheck(node = null, xOffset = 0, yOffset = 0, callback = null){
    //获取同级别的邻格
    let sideNode = node._gridmap.getOffsetGrid(node, xOffset, yOffset);
    if(!sideNode){
        return;
    }
    callback(node, sideNode);
}

function NewSimpleQuadTree(width = 0, height = 0, deep = 0){
    let tree = new SimpleQuadTree(NewPos(), deep);
    tree.root = createRootNode(width, height, deep, tree);
    return tree;
}

export{
    NewSimpleQuadTree
}