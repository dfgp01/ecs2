import { BaseQuadTreeMap } from "./base";
import { createRootNode, IsLeaFNode } from "./node";

/**
 * 默认的四叉树
 */
class StrictQuadTree extends BaseQuadTreeMap {

    /**
     * 计算所有节点
     */
    getGridCount(){
        let i = 0;
        iteratorByDepth(this.root, node => {
            i++;
        });
        return i;
    }

    // getOffsetGrid(grid = null, xOffset = 0, yOffset = 0){
    //     let r = this.deep - grid.deep;
    //     let xFlag = grid._xFlag << r;
    //     let yFlag = grid._yFlag << r;
    //     return getNodeByFlag(this, this.deep, xFlag + xOffset, yFlag + yOffset);
    // }

    //深度优先遍历，处理每一个节点，包括根节点
    iterator(callback = null){
        iteratorByDepth(this.root, callback);
    }

    //相邻节点对比，当前节点和其所有子节点对比，当前节点和相邻节点+其所有子节点
    adjacentCompare(currGrid = null, callback = null){
        adjacentCompareByDepth(currGrid, callback);
    }
}

function iteratorByDepth(node = null, callback = null){
    if(!IsLeaFNode(node)){
        node.children.forEach(child => {
            iteratorByDepth(child, callback);
        });
    }
    callback(node);
}

function adjacentCompareByDepth(node = null, callback = null){
    //和自己的所有子节点对比
    withMyChildren(node, callback);

    //和相邻的同级节点以及其所有子节点对比
    withSideNode(node, callback);
}

function withMyChildren(node = null, callback = null){
    if(IsLeaFNode(node)){
        return;
    }
    node.children.forEach(child => {
        withOtherNode(node, child, callback);
    });
}

function withOtherNode(currNode = null, otherNode = null, callback = null){
    if(!IsLeaFNode(otherNode)){
        otherNode.children.forEach(child => {
            withOtherNode(currNode, child, callback);
        });
    }
    callback(currNode, otherNode);
}

function withSideNode(currNode = null, callback = null){
    otherCheck(currNode, -1, 0, callback);
    otherCheck(currNode, -1, -1, callback);
    otherCheck(currNode, 0, -1, callback);
    otherCheck(currNode, 1, -1, callback);
}

function otherCheck(currNode = null, xOffset = 0, yOffset = 0, callback = null){
    //获取同级别的邻格
    let sideNode = currNode._gridmap.getOffsetGrid(currNode, xOffset, yOffset);
    if(!sideNode){
        return;
    }
    withOtherNode(currNode, sideNode, callback);
}

function NewStrictQuadTree(width = 0, height = 0, deep = 0){
    let tree = new StrictQuadTree(deep);
    tree.root = createRootNode(width, height, deep);
    return tree;
}

export{
    NewStrictQuadTree
}