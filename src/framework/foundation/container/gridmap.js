import { GetRectHalfHeight, GetRectHalfWidth, GetRectHeight, GetRectWidth, NewPos, NewRect } from "../structure/geometric";

 /**
  * gridmap的网格单元
  *     data = 任意对象
  */
 class BaseGrid {
    constructor(width = 0, height = 0, _gridmap = null){
        this.rect = NewRect(width, height);
        this.data = null;       //存储的对象，需要重新设计机制
        this._gridmap = _gridmap;    //双向引用，内部变量
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
 * 
 * TODO 关于pos属性可能会移除，暂没发现其必要性
 *      因removeData等操作，目前data限定为list
 */
class AbstractGridMap {
    constructor(pos = null){
        this.pos = pos;
    }
    getGridMapWidth(){}
    getGridMapHeight(){}
    getGridCount(){}
    getGrid(pos = null){}
    getGridStartPos(grid = null){}
    getGridCenterPos(grid = null){}
    getGridEndPos(grid = null){}
    getOffsetGrid(grid= null, xOffset = 0, yOffset = 0){}

    iterator(callback = null){}
    adjacentCompare(currGrid, callback = null){}  //相邻比较

    refresh(){}    //更新，重新排列
    updatePart(data = null){}   //根据自定义的数据格式更新局部区域
}


/**
 * 基础宽高
 */
function GetGridMapWidth(gridmap = null){
    return gridmap.getGridMapWidth();
}
function GetGridMapHalfWidth(gridmap = null){
    return GetGridMapWidth(gridmap) * 0.5;
}
function GetGridMapHeight(gridmap = null){
    return gridmap.getGridMapHeight();
}
function GetGridMapHalfHeight(gridmap = null){
    return GetGridMapHeight(gridmap) * 0.5;
}

function GetGridMapGridCount(gridmap = null){
    return gridmap.getGridCount();
}

/**
 * 基础坐标
 * @param {*} gridmap 
 */
function GetGridMapPos(gridmap = null){
    return gridmap.pos;
}

/**
 * 注意和GetGridMapPos的区别
 */
function GetGridMapCenterPos(gridmap = null){
    return NewPos(gridmap.pos.x, gridmap.pos.y);
}
function GetGridMapStartPos(gridmap = null){
    return NewPos(
        gridmap.pos.x - GetGridMapHalfWidth(gridmap),
        gridmap.pos.y - GetGridMapHalfHeight(gridmap)
    );
}
function GetGridMapEndPos(gridmap = null){
    return NewPos(
        gridmap.pos.x + GetGridMapHalfWidth(gridmap),
        gridmap.pos.y + GetGridMapHalfHeight(gridmap)
    );
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

/**
 * 根据坐标获取合适的网格
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
 * 根据自定义的数据格式更新局部区域
 * 为了热更新or无缝连接
 * 以后可能将data抽象成标准类
 * @param {*} data 
 */
function GridMapUpdatePart(gridmap = null, data = null){
    gridmap.updatePart(data);
}

/**
 * 检测是否在girdmao范围内
 * @param {*} pos       todo 要转成相对坐标
 * @param {*} gridmap 
 */
function CheckInGridMap(pos = null, gridmap = null){
    let start = GetGridMapStartPos(gridmap);
    let end = GetGridMapEndPos(gridmap);
    return pos.x >= start.x && pos.x <= end.x && pos.y >= start.y && pos.y <= end.y;
}

export {
    BaseGrid, GetGridWidth, GetGridHalfWidth, GetGridHeight, GetGridHalfHeight, GetGridData, SetGridData,
    AbstractGridMap, GetGridMapWidth, GetGridMapHalfWidth, GetGridMapHeight, GetGridMapHalfHeight, GetGridMapGridCount,
    GetGridMapPos, GetGridMapCenterPos, GetGridMapStartPos, GetGridMapEndPos, GetGridStartPos, GetGridCenterPos, GetGridEndPos, GetGridWithPos, GetOffsetGrid,
    GetGridMapData, SetGridMapData, RemoveGridMapData, GridMapIterator, GridMapAdjacentCompare, GridMapUpdatePart,
    CheckInGridMap
}