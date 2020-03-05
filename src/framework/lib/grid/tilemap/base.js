import { NewPos, ToLocatePos } from "../../../foundation/structure/geometric";
import { GetInt } from "../../../foundation/structure/math";
import { GetHalfGridMapWidth, GetHalfGridMapHeight, GetGridWidth, GetGridHeight } from "../../../foundation/container/gridmap";

/**
  * gridmap的网格单元
  */
 class TileGrid extends AbstractGrid {
    constructor(width = 0, height = 0, rowIndex = 0, colIndex = 0, data = null){
        super(width, height, data);
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
    }
}

/**
 * 2d瓷砖地图，由GridMap扩展
 * sample:
 * [
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 
	0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1,
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 
]
 */
class TileMap extends AbstractGridMap {
    constructor(pos = null, rows = 0, columns = 0, gridWidth = 0, gridHeight = 0, grids = null){
        super();
        this.pos = pos;
        this.rows = rows;
        this.columns = columns;
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
        this.grids = grids;
    }

    getData(pos = null){
        let grid = getGridWithPos(pos, this);
        return grid ? grid.data : null;
    }
    setData(pos = null, data = null){
        let grid = getGridWithPos(pos, this);
        if(grid){
            grid.data = data;
        }
    }
    getGrid(pos = null){
        return getGridWithPos(pos, this);
    }
    getGridMapWidth(){
        return this.columns * this.gridWidth;
    }
    getGridMapHeight(){
        return this.rows * this.gridHeight;
    }
    iterator(callback = null){
        this.grids.forEach(grid => {
            callback(grid);
        });
    }
}

function NewTileMap(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0, pos = null){
    let grids = [];
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            grids.push(new TileGrid(gridWidth, gridHeight, rowIndex, colIndex));
        }
    }
    pos = pos ? pos : NewPos();
    return new TileMap(pos, rows, columns, gridWidth, gridHeight, grids);
}

function checkIn(x = 0, y = 0, tilemap = null){
    return x > 0 && x < tilemap.getGridMapWidth() && y > 0 && y < tilemap.getGridMapHeight();
}

function getGridWithPos(pos = null, tilemap = null){
    let tPos = ToLocatePos(pos, tilemap.pos);
    if(!checkIn(tPos.x, tPos.y, tilemap)){
        return null;
    }
    let column = GetInt(tPos.x / gridmap.gridWidth);
    let row = GetInt(tPos.y / gridmap.gridHeight);
    return gridmap.grids[row * gridmap.columns + column];
}


/**
 * 基础坐标
 * @param {*} tilemap 
 */
function GetTilemapStart(tilemap = null){
    return NewPos(
        tilemap.pos.x - GetHalfGridMapWidth(tilemap),
        tilemap.pos.y - GetHalfGridMapHeight(tilemap)
    );
}
function GetTilemapEnd(tilemap = null){
    return NewPos(
        tilemap.pos.x + GetHalfGridMapWidth(tilemap),
        tilemap.pos.y + GetHalfGridMapHeight(tilemap)
    );
}
function GetTilemapCenter(tilemap = null){
    return NewPos(tilemap.pos.x, tilemap.pos.y);
}

function GetTileGridStart(tilemap = null, grid = null){
    let start = GetTilemapStart(tilemap);
    return NewPos(
        start.x + GetGridWidth(tilemap.gridmap) * grid.colIndex,
        start.y + GetGridHeight(tilemap.gridmap) * grid.rowIndex
    );
}
function GetTileGridEnd(tilemap = null, grid = null){
    let start = GetTilemapStart(tilemap);
    return NewPos(
        start.x + tilemap.gridWidth * (grid.colIndex + 1),
        start.y + tilemap.gridHeight * (grid.rowIndex + 1)
    );
}
function GetTileGridCenter(tilemap = null, grid = null){
    let start = GetTilemapStart(tilemap);
    return NewPos(
        start.x + tilemap.gridWidth * (grid.colIndex + 0.5),
        start.y + tilemap.gridHeight * (grid.rowIndex + 0.5)
    );
}

export {
    NewTileMap, 
    GetTilemapStart, GetTilemapEnd, GetTilemapCenter, 
    GetTileGridStart, GetTileGridEnd, GetTileGridCenter
}

/**
 * 找出与rect相交的所有grid
 * TODO 未定，可能不需要这种做法
 */
function GetGridsByRect(tileMap = null, rect = null){
    //是否在tilemap中
    if(!IsRectCross(tileMap.rect, rect)){
        return null;
    }
    let grids = [];
    let posStart = rect.posStart;
    let columnStart = parseInt(posStart.x / tileMap.gridWidth);
    let rowStart = parseInt(posStart.y / tileMap.gridHeight);
    columnStart = columnStart < 0 ? 0 : columnStart;
    rowStart = rowStart < 0 ? 0 : rowStart;

    let posEnd = rect.posEnd;
    let columnEnd = parseInt(posEnd.x / tileMap.gridWidth);
    let rowEnd = parseInt(posEnd.y / tileMap.gridHeight);
    columnEnd = columnEnd > tileMap.columns - 1 ? tileMap.columns - 1 : columnEnd;
    rowEnd = rowEnd > tileMap.rows - 1 ? tileMap.rows - 1 : rowEnd;

    for(let row=rowStart; row<=rowEnd; row++){
        for(let column=columnStart; column<=columnEnd; column++){
            grids.push(tileMap.grids[row][column]);
        }
    }
    return grids;
}