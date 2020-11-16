import { GetInt } from "../../foundation/structure/math";
import { NewTileMap, GetTileGridCount, GetTileGridWithIndex } from "./tilemap/base";
import { GetGridMapGridCount } from "./base";

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
 *      rows : 6        行数
 *      grid-width : 32
 *      gridiheight : 32     每个格子的宽高
 *      x : 0
 *      y : 0           初始位置，默认为stage中心，即(0, 0)
 * }
 */
function CreateTileMapWithData(options = null){
    //默认值
    //defaultTileMapData(options);
    
    //验证tilemap数据完整性，rows和data仅能选其一
    let rows = options['rows'];
    let data = options['data'];
    if(!rows && !data){
        console.error("error param: rows or data is required.");
        return null;
    }

    let columns = options['columns'];
    if(!columns){
        console.error("error param: columns is required.");
        return null;
    }

    //如果填了data，rows参数就无用，但是要校验columns
    if(data && data.length > 0){
        let realRows = GetInt(options.data.length / columns);
        if(realRows * columns != data.length){
            console.error("error param: len(grids): %d, columns: %d", data.length, columns);
            return null;
        }
    }else{
        if(!rows){
            console.error("error param: rows is required.");
            return null;
        }
    }

    let tilemap = NewTileMap(
        rows, columns, options['grid-width'], options['grid-height']);
    // GridMapIterator(tilemap, grid => {
    //     let data = GetDef(options.data[grid.rowIndex * columns + grid.colIndex]);
    //     SetGridData(grid, data);
    // });
    // DispatchEvent(
    //     NewEvent(EventTilemapCreated, tilemap));
    return tilemap;
}

function defaultTileMapData(options = null){
    options = Object.assign({
        columns : 1,
        "grid-width" : 32,
        "grid-height" : 32,
        x : 0,
        y : 0,
        data : []
    }, options);
    options['grid-width'] = options['grid-width'] > 0 ? options['grid-width'] : 32;
    options['grid-height'] = options['grid-height'] > 0 ? options['grid-height'] : 32;
}

/**
 * 不重复随机遍历tilemap
 */
function TilemapRandomAccess(tilemap = null, callback = null){
    let arr = [];
    let size = GetGridMapGridCount(tilemap);
    for(let i=0; i<size; i++){
        arr.push(i);
    }

    let results = [];
    for(let i=0; i<size; i++){
        let index = Math.floor(Math.random() * arr.length);
        results.push(arr.splice(index, 1));
    }

    results.forEach(i => {
        callback(GetTileGridWithIndex(tilemap, i));
    });
}

/**
 * 随机访问一个tile-grid
 * @param {*} tilemap 
 */
function GetRandomTileGrid(tilemap = null){
    let size = GetGridMapGridCount(tilemap);
    let index = Math.floor(Math.random() * size);
    return GetTileGridWithIndex(tilemap, index);
}


export{
    CreateTileMapWithData, TilemapRandomAccess, GetRandomTileGrid
}