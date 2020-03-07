import { GridMapIterator } from "../../foundation/container/gridmap";
import { GetInt } from "../../foundation/structure/math";
import { NewTileMap } from "./tilemap/base";
import { NewPos } from "../../foundation/structure/geometric";
import { GetDef } from "../../director/resource";

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
 *      grid-width : 32
 *      gridiheight : 32     每个格子的宽高
 *      x : 0
 *      y : 0           初始位置，默认为stage中心，即(0, 0)
 *      onCreate : func
 * }
 */
function CreateTileMapWithData(options = null, onCreate = null){
    //默认值
    defaultTileMapData(options);
    
    //验证tilemap数据完整性
    let columns = options.columns;
    let rows = GetInt(options.data.length / columns);
    if(rows * columns != options.data.length){
        console.error("error param: len(grids): %d, columns: %d", options.data.length, columns);
        return null;
    }
    let tilemap = NewTileMap(
        rows, columns, options.gridWidth, options.gridHeight, NewPos(options.x, options.y));
    if(onCreate){
        GridMapIterator(tilemap, grid => {
            let data = GetDef(options.data[grid.rowIndex * columns + grid.colIndex])
            onCreate(data, tilemap, grid);
        });
    }
    return tilemap;
}

function defaultTileMapData(options = null){
    options = Object.assign({
        columns : 1,
        gridWidth : 32,
        gridHeight : 32,
        x : 0,
        y : 0,
        data : [0]
    }, options);
    options.gridWidth = options.gridWidth > 0 ? options.gridWidth : 32;
    options.gridHeight = options.gridHeight > 0 ? options.gridHeight : 32;
}

export{
    CreateTileMapWithData
}