import { BaseQuadTreeMap } from "./base";
import { createRootNode, IsLeaFNode } from "./node";

class SimpleQuadTree extends BaseQuadTreeMap {

    /**
     * 只计算叶子节点数量
     */
    getGridCount(){
        return Math.pow(4, this.deep);
        //return 4 ^ this.deep;   //原来这个是异或符，不是N次方符，晕
    }

    //深度优先遍历，只返回子节点
    iterator(callback = null){
        iteratorByDepth(this.root, callback);
    }

    //相邻对比，只处理子节点
    adjacentCompare(currGrid = null, callback = null){
        otherCheck(this, currGrid, -1, 0, callback);
        otherCheck(this, currGrid, -1, -1, callback);
        otherCheck(this, currGrid, 0, -1, callback);
        otherCheck(this, currGrid, 1, -1, callback);
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

function otherCheck(gridmap = null, node = null, xOffset = 0, yOffset = 0, callback = null){
    //获取同级别的邻格
    let sideNode = gridmap.getOffsetGrid(node, xOffset, yOffset);
    if(!sideNode){
        return;
    }
    callback(node, sideNode);
}

function NewSimpleQuadTree(width = 0, height = 0, deep = 0){
    let tree = new SimpleQuadTree(deep);
    tree.root = createRootNode(width, height, deep);
    return tree;
}

export{
    NewSimpleQuadTree
}