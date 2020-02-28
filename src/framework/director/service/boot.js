
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
    SetCamera(
        CreateCameraWithData(options['camera'], screenWidth, screenHeight)
    )

    //引擎
    SetEngine(
        CreateEngineWithData(options['engine'], screenWidth, screenHeight));
    
    
    //系统
    initSystems(options['debug']);

    //瓷砖地图，舞台图层
    let layers = options['layers'];
    layers = layers && layers.length >= 0 ? layers : [];
    layers.forEach(layerOptions => {
        if(layerOptions['tilemap']){
            CreateTileMapWithData(options.tilemap);
        }
        else{

        }
    });

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
}