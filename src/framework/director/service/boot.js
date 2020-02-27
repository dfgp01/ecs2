
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
 *      
 *      layers : [
 *          {
 *              tilemap : 格式参考tilemap一节
 *          }
 *      ]
 *      collide : {}
 * }
 */
function initGame(options = null) {
    //屏幕和摄像机
    let screen = GetScreen(options['screen']);
    SetCamera(
        CreateCameraWithData(options['camera'], screen)
    )

    let ng = options['engine'];
    ng = ng ? ng : {
        width : GetRectWidth(screen),
        height : GetRectHeight(screen),
    };

    //引擎
    SetEngine(
        CreateEngineWithData(ng));
    
    
    initSystems(options['debug']);

    //瓷砖地图，舞台
    if(options.tilemap){
        SetWorld(
            CreateTileMap(options.tilemap)
        );
    }

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