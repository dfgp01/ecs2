import { GetInt } from "../../../foundation/structure/math";
import { AbstractGridMap, BaseGrid, GetGridHeight, GetGridMapStartPos, GetGridWidth } from "../base";
import { NewPos } from "../../../foundation/structure/geometric";


/**
  * tilemap的网格单元
  *     data = UnitComponent
  */
 class TileGrid extends BaseGrid {
    constructor(width = 0, height = 0, rowIndex = 0, colIndex = 0){
        super(width, height);
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
    }
}


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
    constructor(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0){
        super();
        this.rows = rows;
        this.columns = columns;
        this.grids = [];
        this.gridWidth = gridWidth;
        this.gridHeight = gridHeight;
    }

    getWidth(){
        return this.columns * this.gridWidth;
    }
    getHeight(){
        return this.rows * this.gridHeight;
    }

    getStartPos(){
        return NewPos(
            -this.columns * this.gridWidth * 0.5,
            -this.rows * this.gridHeight * 0.5
        );
    }
    getEndPos(){
        return NewPos(
            this.columns * this.gridWidth * 0.5,
            this.rows * this.gridHeight * 0.5
        );
    }

    getGridCount(){
        return this.grids.length;
    }
    getDataCount(){}

    getGrid(pos = null){
        //这里要将pos变为相对坐标，todo 已经取消了gridmap的pos机制了
        //let rPos = ToLocatePos(pos, GetGridMapStartPos(this));
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
        otherCheck(this, currGrid, -1, 0, callback);
        otherCheck(this, currGrid, -1, -1, callback);
        otherCheck(this, currGrid, 0, -1, callback);
        otherCheck(this, currGrid, 1, -1, callback);
    }
}

function getTileGridPos(tilemap = null, grid = null, offset = 0){
    let p = GetGridMapStartPos(tilemap);
    return NewPos(
        p.x + GetGridWidth(grid) * (grid.colIndex + offset),
        p.y + GetGridHeight(grid) * (grid.rowIndex + offset)
    );
}

function otherCheck(gridmap = null, grid = null, xOffset = 0, yOffset = 0, callback = null){
    let sideGrid = gridmap.getOffsetGrid(grid, xOffset, yOffset);
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
 */
function NewTileMap(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0){
    let tilemap = new TileMap(rows, columns, gridWidth, gridHeight);
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
        for (let colIndex = 0; colIndex < columns; colIndex++) {
            tilemap.grids.push(new TileGrid(gridWidth, gridHeight, rowIndex, colIndex));
        }
    }
    return tilemap;
}

function GetTileGridWithIndex(tilemap = null, index = 0){
    return tilemap.grids[index];
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
    GetTileGridWithIndex, IsSideTileGrid
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