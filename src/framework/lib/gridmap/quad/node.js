import { NewPos } from "../../../foundation/structure/geometric";
import { BaseGrid, GetGridHalfHeight, GetGridHalfWidth, GetGridHeight, GetGridWidth } from "../base";

class QuadTreeNode extends BaseGrid {
    constructor(width = 0, height = 0, deep = 0, parent = null, xFlag = 0, yFlag = 0){
        super(width, height);
        this.deep = deep;
        this.parent = parent;
        this.children = [];
        this._xFlag = xFlag;
        this._yFlag = yFlag;
    }
}

function IsLeaFNode(node = null){
    return node.children.length == 0;
}

function GetChildrenNodes(grid = null){
    return grid.children;
}

function GetParentNode(grid = null){
    return grid.parent;
}


/**
 * ###########  辅助运算，将quadtree.js中晦涩难懂的运算放在这，其他地方不要import
 *      所有算法都建立在full-quadtree上，不支持动态伸缩的四叉树
 */


function createRootNode(width = 0, height = 0, maxDeep = 0){
    return addChild(width, height, 0, maxDeep, null);
}

function addChild(width = 0, height = 0, currDeep = 0, maxDeep = 0, parent = null, xFlag = 0, yFlag = 0){
    let node = new QuadTreeNode(width, height, currDeep, parent, xFlag, yFlag);
    if(currDeep < maxDeep){
        node.children.push(
            addChild(
                width * 0.5, height * 0.5, currDeep + 1, maxDeep, 
                node, xFlag << 1, yFlag << 1));
        node.children.push(
            addChild(
                width * 0.5, height * 0.5, currDeep + 1, maxDeep,
                node, (xFlag << 1) + 1, yFlag << 1));
        node.children.push(
            addChild(
                width * 0.5, height * 0.5, currDeep + 1, maxDeep, 
                node, xFlag << 1, (yFlag << 1) + 1));
        node.children.push(
            addChild(
                width * 0.5, height * 0.5, currDeep + 1, maxDeep, 
                node, (xFlag << 1) + 1, (yFlag << 1) + 1));
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
    return bin[targetDeep - 1];
    //return Math.pow(2, targetDeep - 1);
}
var squre = [1, 2, 4, 6, 8, 16, 32, 64, 128, 255, 512, 1024];
function getSqure2(pow = 0){
    return squre[pow];
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
    if(remainDeep == 0 || IsLeaFNode(node)){
        return node;
    }
    //let mask = 2 ^ r;         //原来这个是异或符，不是N次方符，晕，要用Math.pow(2, rate)
    
    //获取最高位，用于定位index，然后去掉最高位，用尾部继续递归
    let tailFlagNum = (remainDeep - 1);
    let j = xFlag >> tailFlagNum;
    let i = yFlag >> tailFlagNum << 1;
    let tailMask = getFlagMask(tailFlagNum);
    return findByFlag(node.children[i | j], remainDeep - 1, xFlag & tailMask, yFlag & tailMask);
}

/**
 * 根据坐标查询叶子节点
 * @param {*} tree 
 * @param {*} pos 
 */
function getNodeWithPos(tree = null, pos = null){
    return findChildNodeWithPos(tree.root, pos);
    // let xFlag = 0;
    // let yFlag = 0;
    // for(let i=0; i<tree.deep; i++){
    //     xFlag = (xFlag << 1) + gridPos.x > pos.x ? 0 : 1;
    //     yFlag = (yFlag << 1) + gridPos.y > pos.y ? 0 : 1;
    // }
    // return getNodeByFlag(tree, tree.deep, xFlag, yFlag);
}

/**
 * 按坐标递归查找子节点
 * @param {*} parentGrid 
 * @param {*} targetPos
 * @param {*} anchor    中间锚点
 */
function findChildNodeWithPos(parentGrid = null, targetPos = null, anchor = null){
    if(IsLeaFNode(parentGrid)){
        return parentGrid;
    }
    let xFlag = targetPos.x > anchor.x ? 1 : 0;
    let yFlag = targetPos.y > anchor.y ? 2 : 0;
    anchor.x += GetGridWidth(parentGrid) * 0.25 * (xFlag > 0 ? 1 : -1);
    anchor.y += GetGridHeight(parentGrid) * 0.25 * (yFlag > 0 ? 1 : -1);
    return findChildNodeWithPos(parentGrid.children[xFlag | yFlag], targetPos, anchor);
}

/**
 * 计算当前网格的坐标
 * @param {*} grid 
 * @param {*} offset 
 */
function calcGridPos(grid = null, offset = 0){
    let pos = NewPos();
    calcPos(pos, grid);
    pos.x += GetGridHalfWidth(grid) * offset;
    pos.y += GetGridHalfHeight(grid) * offset;
    return pos;
}

function calcPos(anchor = null, grid = null){
    let parent = GetParentNode(grid);
    if(!parent){//is root
        return;
    }
    calcPos(anchor, parent);

    let i = 0;
    //新知识，some和every，forrach是不能跳出循环的..............
    parent.children.some((item, index, array) => {
        i = index;
        return item == grid;
    });

    anchor.x += GetGridHalfWidth(grid) * (i & 1 ? 1 : -1);
    anchor.y += GetGridHalfHeight(grid) * (i & 2 ? 1 : -1);
}


export{
    IsLeaFNode, GetChildrenNodes, GetParentNode,
    createRootNode, getNodeByFlag, findChildNodeWithPos, calcGridPos
}