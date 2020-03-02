
 /**
  * gridmap的网格单元
  */
 class AbstractGrid {
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
    constructor(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0, grids = null){
        this.rows = rows;
        this.columns = columns;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.grids = grids;
    }
    getData(x = 0, y = 0){}
    setData(x = 0, y = 0){}
    getGrid(x = 0, y = 0){}
    getGridMapWidth(){}
    getGridMapHeight(){}
    iterator(callback = null){}
}

function NewGridMap(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0, pos = null){
    let grids = [];
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            let grid = new Grid(rowIndex, colIndex);
            grids.push(grid);
        }
    }
    pos = pos ? pos : NewPos();
    return new GridMap(rows, columns, gridWidth, gridHeight, grids, pos);
}

/**
 * 基础属性：宽度
 */
function GetGridWidth(gridmap = null){
    return gridmap.gridWidth;
}
function GetHalfGridWidth(gridmap = null){
    return GetGridWidth(gridmap) * 0.5;
}
function GetGridMapWidth(gridmap = null){
    return gridmap.columns * GetGridWidth(gridmap);
}
function GetHalfGridMapWidth(gridmap = null){
    return GetGridMapWidth(gridmap) * 0.5;
}

/**
 * 基础属性：高度
 */
function GetGridHeight(gridmap = null){
    return gridmap.gridHeight;
}
function GetHalfGridHeight(gridmap = null){
    return GetGridHeight(gridmap) * 0.5;
}
function GetGridMapHeight(gridmap = null){
    return gridmap.rows * GetGridHeight(gridmap);
}
function GetHalfGridMapHeight(gridmap = null){
    return GetGridMapHeight(gridmap) * 0.5;
}

/**
 * 根据位置定位grid，相对坐标法
 */
function GetGrid(gridmap = null, pos = null){
    let gPos = ToLocatePos(pos, gridmap.pos);
    if(!checkIn(gPos, gridmap)){
        return null;
    }
    let column = parseInt(gPos.x / gridmap.gridWidth);
    let row = parseInt(gPos.y / gridmap.gridHeight);
    return gridmap.grids[row * gridmap.columns + column];
}
function checkIn(inGridPos = null, gridmap = null){
    return inGridPos.x > 0 && inGridPos.x < GetGridMapWidth(gridmap) && inGridPos.y > 0 && inGridPos.y < GetGridMapHeight(gridmap);
}

function GridmapIterator(gridmap = null, callback = null){
    gridmap.grids.forEach(grid => {
        callback(grid);
    });
}

function GetGridData(gridmap = null, pos = null){
    let grid = GetGrid(gridmap, pos);
    return grid ? grid.data : null;
}

function SetGridData(gridmap = null, pos = null, data = null){
    let grid = GetGrid(gridmap, pos);
    if(grid){
        grid.data = data;
    }
}

export {
    NewGridMap, 
    GetGridWidth, GetHalfGridWidth, GetGridMapWidth, GetHalfGridMapWidth,
    GetGridHeight, GetHalfGridHeight, GetGridMapHeight, GetHalfGridMapHeight,
    GetGridMapPosStart, GetGridMapPosEnd,
    GetGrid, GridmapIterator, GetGridData, SetGridData
}