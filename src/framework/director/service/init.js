
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
    initGame
}