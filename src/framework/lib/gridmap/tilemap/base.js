import { GetInt } from "../../../foundation/structure/math";
import { AbstractGridMap, CheckInGridMap, GetGridHeight, GetGridMapStartPos, GetGridWidth } from "../../../foundation/container/gridmap";
import { NewTileGrid } from "./node";
import { NewPos } from "../../../foundation/structure/geometric";


/**
 * 2d瓷砖地图，由GridMap扩展
 * sample:
 * [
	1, 1, 1, 1, 1, 
	1, 0, 1, 0, 1, 
	1, 0, 0, 0, 1, 
	1, 0, 0, 0, 1, 
	1, 1, 1, 1, 1, 
	1, 1, 1, 1, 1
]
 */
class TileMap extends AbstractGridMap {
    constructor(pos = null, rows = 0, columns = 0, gridWidth = 0, gridHeight = 0){
        super(pos);
        this.rows = rows;
        this.columns = columns;
        this.grids = [];
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }

    getGridMapWidth(){
        return this.columns * this.gridWidth;
    }
    getGridMapHeight(){
        return this.rows * this.gridHeight;
    }

    getGrid(pos = null){
        if(!CheckInGridMap(pos, this)){
            return null;
        }
        let column = GetInt(pos.x / this.gridWidth);
        let row = GetInt(pos.y / this.gridHeight);
        return this.grids[row * this.columns + column];
    }

    getGridStartPos(grid = null){
        return getTileGridPos(this, grid, 0);
    }
    getGridCenterPos(grid = null){
        return getTileGridPos(this, grid, 0.5);
    }
    getGridEndPos(grid = null){
        return getTileGridPos(this, grid, 1);
    }

    getOffsetGrid(grid = null, xOffset = 0, yOffset = 0){
        let i = grid.rowIndex + yOffset;
        let j = grid.colIndex + xOffset;
        if(i<0 || j<0 || i>=this.rows || j>=this.columns){
            return null;
        }
        return this.grids[this.columns * i + j];
    }

    iterator(callback = null){
        this.grids.forEach(grid => {
            callback(grid);
        });
    }

    adjacentCompare(currGrid = null, callback = null){
        otherCheck(currGrid, -1, 0, callback);
        otherCheck(currGrid, -1, -1, callback);
        otherCheck(currGrid, 0, -1, callback);
        otherCheck(currGrid, 1, -1, callback);
    }
}

function getTileGridPos(tilemap = null, grid = null, offset = 0){
    let p = GetGridMapStartPos(tilemap);
    return NewPos(
        p.x + GetGridWidth(grid) * (grid.colIndex + offset),
        p.y + GetGridHeight(grid) * (grid.rowIndex + offset)
    );
}

function otherCheck(grid = null, xOffset = 0, yOffset = 0, callback = null){
    let sideGrid = grid._gridmap.getOffsetGrid(grid, xOffset, yOffset);
    if(!sideGrid){
        return;
    }
    callback(grid, sideGrid);
}


/**
 * @param {*} rows 
 * @param {*} columns 
 * @param {*} gridWidth 
 * @param {*} gridHeight 
 * @param {*} pos 
 */
function NewTileMap(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0, pos = null){
    pos = pos ? pos : NewPos();
    let tilemap = new TileMap(pos, rows, columns, gridWidth, gridHeight);
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            tilemap.grids.push(NewTileGrid(gridWidth, gridHeight, tilemap, rowIndex, colIndex));
        }
    }
    return tilemap;
}

function GetTileGridWithIndex(tilemap = null, index = 0){
    return tilemap.grids[index];
}

function GetTileGridCount(tilemap = null){
    return tilemap.grids.length;
}

/**
 * 是否边缘格子
 * @param {*} tileGrid 
 */
function IsSideTileGrid(tilemap = null, tileGrid = null){
    return tileGrid.rowIndex == 0 || tileGrid.rowIndex == tilemap.rows - 1 ||
    tileGrid.colIndex == 0 || tileGrid.colIndex == tilemap.columns - 1;
}

export {
    NewTileMap,
    GetTileGridWithIndex, GetTileGridCount, IsSideTileGrid
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