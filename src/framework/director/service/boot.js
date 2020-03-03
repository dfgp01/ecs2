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

function createSpriteFrameWithData(name = "", bitmap = null, textureAreaData = null){
    if(name == "" || !bitmap || !textureAreaData){
        console.err("error param.");
        return null;
    }
    let f = getSpriteFrameByName(name);
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
    setSpriteFrameByName(name, f);
}


/**
 * 通过参数配置初始化系统资源
 * options {
 *      debug : false,
 *      fps : 60,
 *      textures : []格式见LoadResource()内
 *      screen-width : 800,
 *      screen-height : 800,
 *      camera : {},
 *      engine : {},
 *      layers : [
 *          {
 *              type : 1 格式参考tilemap一节
 *          }
 *      ]
 *      collide : {}
 * }
 */
function initGame(options = null) {
    //默认值
    let screenWidth = options['screen-width'];
    screenWidth = screenWidth && screenWidth > 0 ? screenWidth : 800;
    let screenHeight = options['screen-height'];
    screenHeight = screenHeight && screenHeight > 0 ? screenHeight : 800;

    //摄像机
    setDefaultCamera(
        CreateCameraWithData(options['camera'], screenWidth, screenHeight));

    //引擎
    setEngine(
        CreateEngineWithData(options['engine'], screenWidth, screenHeight));
    
    //系统
    initSystems(options['debug']);

    //开启碰撞系统
    if(options.collide){
        OpenCollider(options.collide);

        // if(options.useTileCombine){
        //     let resultNodes = CreateCombineNodes(tilemap, collide.boxHandler);
        //     resultNodes.forEach(result => {
        //         collide.loadCallback(result.value, result.rect);
        //     });
        // }
    }

    //自定义数据等
    initDatas(options['datas']);
}


/**
 * TODO 临时方法，以后优化
 * @param {*} options 
 */
function initDatas(datas = null){
    if(!datas || datas.length == 0){
        return;
    }
    datas.forEach(data => {
        initDataObj(data);
    });
}
function initDataObj(options = null){
    let dataObj = null;
    if(options['tilemap']){
        dataObj = CreateTileMapWithData(options['tilemap']);
    }
    let name = options['name'];
    if(name){
        setDataByName(name, dataObj);
    }
}

export{
    loadResource, initGame
}