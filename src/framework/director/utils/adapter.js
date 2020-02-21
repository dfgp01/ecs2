/**
 * 创建序列帧动画
 * animateData = {
 *  type : 0,
 *  frames : [
 *      {
 *          duration : 0,
 *          xOffset : 0,
 *          yOffset : 0
 *      }
 *  ]
 * }
 */
function CreateAnimateWithData(animateData = null){
    if(!animateData){
        return null;
    }
    
    let framesData = animateData['frames'];
    if(!framesData || framesData.length == 0){
        return null;
    }

    let animateFrames = [];
    framesData.forEach(frameData => {
        animateFrames.push(
            CreateAnimateFrame(getSpriteFrameByName(spriteFrameName),
                frameData['duration'], frameData['xOffset'], frameData['yOffset']));
    });
    return CreateAnimateAction(animateData['type'], entityId, animateFrames);
}

/**
 * options = {
 *      type : 0,
 *      x : 0, y : 0, width : 0, height : 0
 * }
 */
function CreateCameraWithData(options = null){
    if(!options){
        return null;
    }
    let width = options['width'];
    let height = options['height'];
    if(!width || !height){
        return null;
    }
    return NewCamera(
        options['x'], options['y'],
        width, height
    );
}


/**
 * tilemap以及grid的rect, pos关系
 * tilemap的相对坐标是(0, 0)，即左上角
 * grid的坐标是grid矩形中间
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
 * }
 */
function CreateTileMapWithData(options = null, initHandler = null){
    if(!options || options.columns <= 0 || !options.data || options.data.length == 0 || options.gridWidth <= 0 || options.gridHeight <= 0){
        return null;
    }
    //验证tilemap数据完整性
    let columns = options.columns;
    let rows = parseInt(options.data.length / columns);
    if(rows * columns != options.data.length){
        console.error("error param: len(grids): %d, columns: %d", options.data.length, columns);
        return null;
    }

    let tilemap = NewTileMap(rows, columns, options.gridWidth, options.gridHeight, options.x, options.y, initHandler);
    if(initHandler){
        IteratorGridmap(tilemap.gridmap, grid => {
            let val = options.data[grid.rowIndex * columns + grid.colIndex];
            initHandler(val, tilemap, grid);
        });
    }
    return tilemap;
}

export {
    CreateAnimateWithData, CreateCameraWithData, CreateTileMapWithData
}