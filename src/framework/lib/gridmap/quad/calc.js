import { GetGridCenterPos, GetGridHeight, GetGridMapStartPos, GetGridWidth } from "../../../foundation/container/gridmap";
import { NewPos } from "../../../foundation/structure/geometric";
import { GetParentNode, IsLeaFNode, NewQuadTreeNode } from "./node";



/**
 * ###########  辅助运算，将quadtree.js中晦涩难懂的运算放在这，其他地方不要import
 *      所有算法都建立在full-quadtree上，不支持动态伸缩的四叉树
 */



function createRootNode(width = 0, height = 0, maxDeep = 0, quadtree = null){
    return addChild(width, height, 0, maxDeep, null, quadtree);
}

function addChild(width = 0, height = 0, currDeep = 0, maxDeep = 0, parent = null, _gridmap = null, xFlag = 0, yFlag = 0){
    let node = NewQuadTreeNode(width, height, currDeep, _gridmap, parent, xFlag, yFlag);
    if(currDeep < maxDeep){
        node.children.push(
            addChild(
                width * 0.5, height * 0.5, currDeep + 1, maxDeep, 
                node, _gridmap, xFlag << 1, yFlag << 1));
        node.children.push(
            addChild(
                width * 0.5, height * 0.5, currDeep + 1, maxDeep,
                node, _gridmap, (xFlag << 1) + 1, yFlag << 1));
        node.children.push(
            addChild(
                width * 0.5, height * 0.5, currDeep + 1, maxDeep, 
                node, _gridmap, xFlag << 1, (yFlag << 1) + 1));
        node.children.push(
            addChild(
                width * 0.5, height * 0.5, currDeep + 1, maxDeep, 
                node, _gridmap, (xFlag << 1) + 1, (yFlag << 1) + 1));
    }
    return node;
}


 /**
 * 2的N次方：[1, 2, 4, 6, 8, 16, 32, 64, 128, 255, 512, 1024]
 * 2的N次方-1，n>0：[1, 3, 7, 15, 31, 63, 127, 255, 511, 1023]
 * 12个也够用了吧
 */
var bin = [1, 3, 7, 15, 31, 63, 127, 255, 511, 1023, 2047, 4095];
function getFlagMask(targetDeep = 0){
    //return bin[targetDeep - 1];
    return 2 ^ targetDeep - 1;
}

//边界检测
function checkEdge(maxDeep = 0, xFlag = 0, yFlag = 0){
    let max = getFlagMask(maxDeep);
    return xFlag >= 0 && xFlag <= max && yFlag >= 0 && yFlag <= max;
}

function getNodeByFlag(tree = null, targetDeep = 0, xFlag = 0, yFlag = 0){
    if(!checkEdge(tree.deep, xFlag, yFlag)){
        return null;
    }
    return findByFlag(tree.root, targetDeep, xFlag, yFlag);
}

//递归按照编码找节点
function findByFlag(node = null, remainDeep = 0, xFlag = 0, yFlag = 0){
    if(remainDeep == 0){
        return node;
    }
    let r = (remainDeep - 1);
    let mask = 2 ^ r;
    let j = xFlag & mask >> r;
    let i = yFlag & mask >> r;
    return findByFlag(node.children[i | j], xFlag - j, yFlag - j);
}

/**
 * 根据坐标查询叶子节点
 * @param {*} tree 
 * @param {*} pos 
 */
function getNodeWithPos(tree = null, pos = null){
    return findNodeWithPos(tree.root, pos);
    // let xFlag = 0;
    // let yFlag = 0;
    // for(let i=0; i<tree.deep; i++){
    //     xFlag = (xFlag << 1) + gridPos.x > pos.x ? 0 : 1;
    //     yFlag = (yFlag << 1) + gridPos.y > pos.y ? 0 : 1;
    // }
    // return getNodeByFlag(tree, tree.deep, xFlag, yFlag);
}

function findNodeWithPos(grid = null, pos = null){
    if(IsLeaFNode(grid)){
        return grid;
    }
    //todo 这里可能需要优化
    let gridPos = GetGridCenterPos(grid._gridmap, grid);
    let xFlag = gridPos.x > pos.x ? 0 : 1;
    let yFlag = gridPos.y > pos.y ? 0 : 1;
    return findNodeWithPos(grid.children[xFlag | yFlag], pos);
}

/**
 * 计算当前网格的坐标
 * @param {*} grid 
 * @param {*} offset 
 */
function calcGridPos(grid = null, offset = 0){
    let parent = GetParentNode(grid);
    if(!parent){//is root
        return GetGridMapStartPos(grid._gridmap);
        
    }
    let parentPos = calcGridPos(parent, offset);
    let i = 0;
    parent.children.forEach(node => {
        if(node == grid){
            return; //这里不会退出主函数，只会退出匿名函数
        }
        i++;
    });
    return NewPos(
        parentPos.x + GetGridWidth(grid) * ((i & 1 ? 1 : 0) + offset),
        parentPos.y + GetGridHeight(grid) * ((i & 2 ? 1 : 0) + offset)
    );
}

export{
    createRootNode, getNodeByFlag, getNodeWithPos, calcGridPos
}