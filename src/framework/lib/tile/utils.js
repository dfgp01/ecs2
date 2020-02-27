/**
 * TODO
 * TilemapLayer, IsoMetricTilemapLayer
 */

/**
 * tilemap = gridmap + pos
 * gridmap的相对坐标是(0, 0)，即左上角
 * tilemap.pos和其他对象一样，从中间开始
 * gridPos是grid矩形中间
 * 例如：tilemap.pos.x = 20, gridWidth = 50, column = 5;
 * 那么grid[0]的pos.x= 20 + 0*50 + 50/2 = 45, posStart.x = 45 - 50/2 = 20
 * 同理grid[4]的pos.x= 20 + 4*50 + 50/2 = 245, posStart.x = 245 - 50/2 = 220
 * 
 * options:{
 *      data : [                一维数组
 *          1, 1, 1, 0, 0, 1,
 *          2, 1, 0, 0, 1, 2,
 *          2, 2, 1, 1, 1, 1
 *          ]
 *      columns : 6     列数
 *      gridWidth : 32
 *      gridHeight : 32     每个格子的宽高
 *      x : 0
 *      y : 0           初始位置，默认为stage中心，即(0, 0)
 *      onCreate : func
 * }
 */
function CreateTileMapWithData(options = null){
    //默认值
    options = options ? options : {};
    options.data = options.data || options.data.length > 0 ? options.data : [0];
    options.columns = options.columns ? options.columns : 1;
    options.gridWidth = options.gridWidth && options.gridWidth > 0 ? options.gridWidth : 32;
    options.gridHeight = options.gridHeight && options.gridHeight > 0 ? options.gridHeight : 32;
    
    //验证tilemap数据完整性
    let columns = options.columns;
    let rows = parseInt(options.data.length / columns);
    if(rows * columns != options.data.length){
        console.error("error param: len(grids): %d, columns: %d", options.data.length, columns);
        return null;
    }

    let tilemap = NewTileMap(
        rows, columns, options.gridWidth, options.gridHeight, options.x, options.y);
    if(options.onCreate){
        IteratorGridmap(tilemap.gridmap, grid => {
            let val = options.data[grid.rowIndex * columns + grid.colIndex];
            options.onCreate(val, tilemap, grid);
        });
    }
    return tilemap;
}


function IteratorTileMap(tilemap = null, callback = null){
    IteratorGridmap(tilemap.gridmap, callback);
}

/**
 * 移动tilemap
 */
function MoveTilemap(tilemap = null, x = 0, y = 0){
    let pos = GetTileMapPos(tilemap);
    pos.x = x;
    pos.y = y;
}

/**
 * 根据目标现在位置，求当前所在的grid的相关坐标点
 */
function GetTilemapGrid(tilemap = null, targetPos = null){
    let locatePos = ToLocatePos(targetPos, GetTilemapStart(tilemap));
    return GetGrid(tilemap.gridmap, locatePos.x, locatePos.y);
}

function GetTilemapGridData(tilemap = null, x = 0, y = 0){
    let locatePos = ToLocatePos(targetPos, GetTilemapStart(tilemap));
    return GetGridData(tilemap.gridmap, locatePos.x, locatePos.y);
}

export{CreateTileMapWithData, IteratorTileMap, MoveTilemap, GetTilemapGrid, GetTilemapGridData}