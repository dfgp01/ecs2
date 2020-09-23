const { BaseGrid } = require("../../../foundation/container/gridmap");

class QuadTreeNode extends BaseGrid {
    constructor(width = 0, height = 0, deep = 0, _gridmap = null, parent = null, xFlag = 0, yFlag = 0){
        super(width, height, _gridmap);
        this.deep = deep;
        this.parent = parent;
        this.children = [];
        this._xFlag = xFlag;
        this._yFlag = yFlag;
    }

    dataLength(){
        //todo 需要完善
        return this.data ? GetListSize(this.data) : 0;
    }

    getStartPos(){
        let pos = getGridNodeStartPos(this);
        pos.x -= GetGridHalfWidth(this);
        pos.y -= GetGridHalfHeight(this);
        return pos;
    }

    getCenterPos(){
        return getGridNodeCenterPos(this);
    }

    getEndPos(){
        let pos = getGridNodeStartPos(this);
        pos.x += GetGridHalfWidth(this);
        pos.y += GetGridHalfHeight(this);
        return pos;
    }
}

function NewQuadTreeNode(width = 0, height = 0, deep = 0, _gridmap = null, parent = null, xFlag = 0, yFlag = 0){
    return new QuadTreeNode(width, height, deep, _gridmap, parent, xFlag, yFlag);
}

function getGridNodeCenterPos(node = null){
    if(node.deep == 0){
        return GetGridMapCenterPos(GetGridOwner(node));
    }
    let pStart = getGridNodeCenterPos(node.parent);
    let index = node.code >> (node.deep - 1) * 2;
    let offsetX = index & 1 ? 1 : -1;
    let offsetY = index & 2 ? 1 : -1;
    return NewPos(
        pStart.x + offsetX * GetGridHalfWidth(node),
        pStart.y + offsetY * GetGridHalfHeight(node)
    );
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


export{
    NewQuadTreeNode, IsLeaFNode, GetChildrenNodes, GetParentNode
}