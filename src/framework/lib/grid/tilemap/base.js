/**
  * gridmap的网格单元
  */
 class TileGrid extends AbstractGrid {
    constructor(width = 0, height = 0, data = null, rowIndex = 0, colIndex = 0){
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
    getData(x = 0, y = 0){}
    setData(x = 0, y = 0){}
    getGrid(x = 0, y = 0){}
    getGridMapWidth(){}
    getGridMapHeight(){}
    iterator(callback = null){}
}

function checkIn(x = 0, y = 0, tilemap = null){
    return x > 0 && x < tilemap.getGridMapWidth() && y > 0 && y < tilemap.getGridMapHeight();
}

function NewTileMap(rows = 0, columns = 0, gridWidth = 0, gridHeight = 0, x = 0, y = 0){
    let gridmap = NewGridMap(rows, columns, gridWidth, gridHeight);
    return new TileMap(gridmap, x, y);
}

function GetGridMap(tilemap = null){
    return tilemap.gridmap;
}

function GetTileMapPos(tilemap = null){
    return tilemap.pos;
}

function GetTilemapStart(tilemap = null){
    return NewPos(
        tilemap.pos.x - GetHalfGridMapWidth(tilemap.gridmap),
        tilemap.pos.y - GetHalfGridMapHeight(tilemap.gridmap)
    );
}

function GetTilemapEnd(tilemap = null){
    return NewPos(
        tilemap.pos.x + GetHalfGridMapWidth(tilemap.gridmap),
        tilemap.pos.y + GetHalfGridMapHeight(tilemap.gridmap)
    );
}

function GetTilemapCenter(tilemap = null){
    return NewPos(tilemap.pos.x, tilemap.pos.y);
}

function GetGridStart(tilemap = null, grid = null){
    let start = GetTilemapStart(tilemap);
    return NewPos(
        start.x + GetGridWidth(tilemap.gridmap) * grid.colIndex,
        start.y + GetGridHeight(tilemap.gridmap) * grid.rowIndex
    );
}

function GetGridEnd(tilemap = null, grid = null){
    let start = GetTilemapStart(tilemap);
    return NewPos(
        start.x + GetGridWidth(tilemap.gridmap) * (grid.colIndex + 1),
        start.y + GetGridHeight(tilemap.gridmap) * (grid.rowIndex + 1)
    );
}

function GetGridCenter(tilemap = null, grid = null){
    let start = GetTilemapStart(tilemap);
    return NewPos(
        start.x + GetGridWidth(tilemap.gridmap) * (grid.colIndex + 0.5),
        start.y + GetGridHeight(tilemap.gridmap) * (grid.rowIndex + 0.5)
    );
}

export {
    NewTileMap, GetTilemapStart, GetTilemapEnd, GetTilemapCenter, 
    GetGridWithPos, GetGridStart, GetGridEnd, GetGridCenter
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