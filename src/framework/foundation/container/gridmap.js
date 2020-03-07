
 /**
  * gridmap的网格单元
  */
 class BaseGrid {
    constructor(width = 0, height = 0, data = null){
        this.width = width;
        this.height = height;
        this.data = data;       //存储的对象
    }
}

/**
 * 网格表是个基础二元容器，应归类为元数据
 * rows = 行数
 * columns = 列数
 * gridWidth, gridHeight = 每个网格的宽高范围，建议1:1
 * 
 */
class AbstractGridMap {
    getData(pos = null){}
    setData(pos = null, data = null){}
    getGrid(pos = null){}
    getGridMapWidth(){}
    getGridMapHeight(){}
    iterator(callback = null){}
}

function GetGridDataWithPos(gridmap = null, pos = null){
    return gridmap.getData(pos);
}
function SetGridDataWithPos(gridmap = null, pos = null, data = null){
    return gridmap.setData(pos, data);
}
function GetGridData(grid = null){
    return grid.data;
}
function SetGridData(grid = null, data = null){
    return grid.data = data;
}
function GetGrid(gridmap = null, pos = null){
    return gridmap.getGrid(pos);
}


/**
 * 基础属性：宽度
 */
function GetGridWidth(grid = null){
    return grid.width;
}
function GetHalfGridWidth(grid = null){
    return GetGridWidth(grid) * 0.5;
}
function GetGridMapWidth(gridmap = null){
    return gridmap.getGridMapWidth();
}
function GetHalfGridMapWidth(gridmap = null){
    return GetGridMapWidth(gridmap) * 0.5;
}

/**
 * 基础属性：高度
 */
function GetGridHeight(grid = null){
    return grid.height;
}
function GetHalfGridHeight(grid = null){
    return GetGridHeight(grid) * 0.5;
}
function GetGridMapHeight(gridmap = null){
    return gridmap.getGridMapHeight();
}
function GetHalfGridMapHeight(gridmap = null){
    return GetGridMapHeight(gridmap) * 0.5;
}

/**
 * 遍历
 * @param {*} gridmap 
 * @param {*} callback 
 */
function GridMapIterator(gridmap = null, callback = null){
    gridmap.iterator(callback);
}

export {
    BaseGrid, AbstractGridMap, 
    GetGridDataWithPos, SetGridDataWithPos, GetGridData, SetGridData, GetGrid,
    GetGridWidth, GetHalfGridWidth, GetGridMapWidth, GetHalfGridMapWidth,
    GetGridHeight, GetHalfGridHeight, GetGridMapHeight, GetHalfGridMapHeight,
    GridMapIterator
}