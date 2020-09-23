import { NewPos } from "../../../foundation/structure/geometric";

const { BaseGrid, GetGridMapStartPos, GetGridWidth, GetGridHeight } = require("../../../foundation/container/gridmap");

/**
  * tilemap的网格单元
  *     data = UnitComponent
  */
 class TileGrid extends BaseGrid {
    constructor(width = 0, height = 0, _gridmap = null, rowIndex = 0, colIndex = 0){
        super(width, height, _gridmap);
        this.rowIndex = rowIndex;
        this.colIndex = colIndex;
    }
    getStartPos(){
        return newTileGridPos(this, 0);
    }
    getCenterPos(){
        return newTileGridPos(this, 0.5);
    }
    getEndPos(){
        return newTileGridPos(this, 1);
    }
}

function newTileGridPos(tileGrid = null, offset = 0){
    let start = GetGridMapStartPos(tileGrid._gridmap);
    return NewPos(
        start.x + GetGridWidth(tileGrid) * (tileGrid.colIndex + offset),
        start.y + GetGridHeight(tileGrid) * (tileGrid.rowIndex + offset)
    );
}

function NewTileGrid(width = 0, height = 0, tilemap = null, rowIndex = 0, colIndex = 0){
    return new TileGrid(width, height, tilemap, rowIndex, colIndex);
}

export{
    NewTileGrid
}