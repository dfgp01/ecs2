
/**
 * 加载资源，创建精灵帧
 * textures : [
 *          {
 *              img : "res/a.png",
 *              frames : [
 *                  {
 *                      name : "walk1"
 *                      textureArea : {
 *                          x : 0,
 *                          y : 0,
 *                          width : 0,
 *                          height : 0
 *                      }
 *                  }
 *              ]
 *          }
 *      ],
 */
function loadResource(texturesData = null, OnloadCallback = null, OnCompleteCallback = null){
    //加载图像并创建显示帧
    if(!texturesData || texturesData.length == 0){
        return;
    }
    let _count = 0;
    texturesData.forEach(t =>{
        GetEngine().loadImg(t.img, bitmapData => {
            let bitmap = CreateBitmap(bitmapData, bitmapData.width, bitmapData.height);
            t.frames.forEach(frameData => {
                createSpriteFrameWithData(frameData.name, bitmap, frameData.textureArea);
            });
            _count++;
            if(OnloadCallback){
                OnloadCallback(_count);
            }
            if(texturesData.length == _count && OnCompleteCallback){
                OnCompleteCallback();
            }
        });
    });
}

var _spriteFrameMap = new Map();
function createSpriteFrameWithData(name = "", bitmap = null, textureAreaData = null){
    if(name == "" || !bitmap || !textureAreaData){
        console.err("error param.");
        return null;
    }
    let f = _spriteFrameMap.get(name);
    if(f){
        console.err("frame: %s is exists.", name);
        return null;
    }

    let x = textureAreaData['x'];
    let y = textureAreaData['y'];
    let width = textureAreaData['width'];
    let height = textureAreaData['height'];
    if(!width || !height){
        return null;
    }
    let f = CreateSpriteFrame(name, bitmap, x, y, width, height);
    _spriteFrameMap.set(name, f);
}

/**
 * 找不到帧时的默认空帧，可以是一张红叉图片，
 * TODO 引入默认资源机制
 */
function getSpriteFrameByName(name = ""){
    let f = _spriteFrameMap.get(name);
    return f ? f : _spriteFrameMap.get("defalut");
}



/**
 * 瓷砖地图，舞台，全局单例
 */
var tilemap = null;
function initTile(tilemapData = null){
    tilemap = createTileMapWithData(tilemapData, tilemapData.initHandler);
}
function getTilemap(){
    return tilemap;
}

export{
    loadResource, getSpriteFrameByName, 
    initGame, initCamera, GetCamera, initTile, getTilemap
}