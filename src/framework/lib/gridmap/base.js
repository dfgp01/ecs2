import { GetRectHalfHeight, GetRectHalfWidth, GetRectHeight, GetRectWidth, NewRect } from "../../foundation/structure/geometric";

 /**
  * gridmap的网格单元
  *     data = 任意对象
  */
 class BaseGrid {
    constructor(width = 0, height = 0){
        this.rect = NewRect(width, height);
        this.data = null;       //存储的对象，需要重新设计机制
    }
}

/**
 * 基础属性
 */
function GetGridWidth(grid = null){
    return GetRectWidth(grid.rect);
}
function GetGridHalfWidth(grid = null){
    return GetRectHalfWidth(grid.rect);
}
function GetGridHeight(grid = null){
    return GetRectHeight(grid.rect);
}
function GetGridHalfHeight(grid = null){
    return GetRectHalfHeight(grid.rect);
}
function GetGridData(grid = null){
    return grid.data;
}
function SetGridData(grid = null, data = null){
    return grid.data = data;
}


/**
 * 网格表定位是个基础二元容器
 *  具体实现：二维网格表（瓷砖图）、四叉树、九宫格
 *  需要抽象一些共性，如通过pos定位网格，获取数据，遍历等
 *  getCenterPos() 无意义，因为gridmap就在中心(0, 0)
 */
class AbstractGridMap {
    getWidth(){}
    getHeight(){}
    getStartPos(){}
    getEndPos(){}
    getGridCount(){}
    getDataCount(){}
    getGrid(pos = null){}
    getGridStartPos(grid = null){}
    getGridCenterPos(grid = null){}
    getGridEndPos(grid = null){}
    getOffsetGrid(grid= null, xOffset = 0, yOffset = 0){}

    iterator(callback = null){}
    adjacentCompare(currGrid, callback = null){}  //相邻比较
}


/**
 * 基础宽高
 */
function GetGridMapWidth(gridmap = null){
    return gridmap.getWidth();
}
function GetGridMapHalfWidth(gridmap = null){
    return GetWidth(gridmap) * 0.5;
}
function GetGridMapHeight(gridmap = null){
    return gridmap.getHeight();
}
function GetGridMapHalfHeight(gridmap = null){
    return GetHeight(gridmap) * 0.5;
}


/**
 * 整体坐标
 */
function GetGridMapStartPos(gridmap = null){
    return gridmap.getStartPos();
}
function GetGridMapEndPos(gridmap = null){
    return gridmap.getEndPos();
}


/**
 * 对象统计
 * @param {*} gridmap 
 */
function GetGridMapGridCount(gridmap = null){
    return gridmap.getGridCount();
}
function GetGridMapDataCount(gridmap = null){
    return gridmap.getDataCount();
}

    
/**
 * 检测是否在girdmao范围内
 * @param {*} pos       todo 要转成相对坐标，若gridmap不存在坐标，则不用转
 * @param {*} gridmap 
 */
function CheckInGridMap(pos = null, gridmap = null){
    let start = GetGridMapStartPos(gridmap);
    let end = GetGridMapEndPos(gridmap);
    return pos.x >= start.x && pos.x <= end.x && pos.y >= start.y && pos.y <= end.y;
}

/**
 * 网格坐标
 * @param {*} gridmap 
 * @param {*} pos 
 */
function GetGridWithPos(gridmap = null, pos = null){
    return CheckInGridMap(pos, gridmap) ? gridmap.getGrid(pos) : null;
}
function GetGridStartPos(gridmap = null, grid = null){
    return gridmap.getGridStartPos(grid);
}
function GetGridCenterPos(gridmap = null, grid = null){
    return gridmap.getGridCenterPos(grid);
}
function GetGridEndPos(gridmap = null, grid = null){
    return gridmap.getGridEndPos(grid);
}

/**
 * 获取邻格，根据偏移量
 * @param {*} grid 
 * @param {*} xOffset 
 * @param {*} yOffset 
 */
function GetOffsetGrid(gridmap = null, grid= null, xOffset = 0, yOffset = 0){
    return gridmap.getOffsetGrid(grid = null, xOffset, yOffset);
}

/**
 * 默认遍历
 * @param {*} gridmap 
 * @param {*} callback 
 */
function GridMapIterator(gridmap = null, callback = null){
    gridmap.iterator(callback);
}

/**
 * 相邻网格间对比
 */
function GridMapAdjacentCompare(gridmap = null, callback = null){
    gridmap.iterator(grid => {
        gridmap.adjacentCompare(grid, callback);
    });
}


/**
 * 获取数据
 * @param {*} gridmap 
 * @param {*} pos 
 */
function GetGridMapData(gridmap = null, pos = null){
    let grid = GetGridWithPos(gridmap, pos);
    return grid ? GetGridData(grid) : null;
}
function SetGridMapData(gridmap = null, pos = null, data = null){
    let grid = GetGridWithPos(gridmap, pos);
    if(!grid){
        return;
    }
    SetGridData(grid, data);
}
function RemoveGridMapData(gridmap = null, pos = null){
    SetGridData(gridmap, pos, null);
}


export {
    BaseGrid, GetGridWidth, GetGridHalfWidth, GetGridHeight, GetGridHalfHeight, GetGridData, SetGridData,
    AbstractGridMap, GetGridMapWidth, GetGridMapHalfWidth, GetGridMapHeight, GetGridMapHalfHeight, 
    GetGridMapStartPos, GetGridMapEndPos, GetGridStartPos, 
    GetGridMapGridCount, GetGridMapDataCount,
    CheckInGridMap, GetGridCenterPos, GetGridEndPos, GetGridWithPos, GetOffsetGrid,
    GridMapIterator, GridMapAdjacentCompare,
    GetGridMapData, SetGridMapData, RemoveGridMapData
}