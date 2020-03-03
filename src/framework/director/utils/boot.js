
/**
 * options {
 *      textures : 格式见LoadResource()内
 *      screen : {
 *          width : 800,
 *          height : 800
 *      },
 *      fps : 60,
 *      debug : false,
 *      camera : {
 *          x : 0,
 *          y : 0
 *      },
 *      tilemap : 格式参考tilemap一节
 *      keyHandler : function(type, keyCode)   type=1 = down, type=2 = up
 *      collide : {
 *          useBox : false,
 *          useGroup : false,
 *          pairs : [
 *              {
 *                  team1 : 1,
 *                  team2 : 2
 *              }
 *          ],
 *          handler : function(dt, collider1, collider2)
 *      }
 * }
 * TODO scene可以是一个action?
 */
function Start(options = null, scene = null){
    options = options ? options : {};
    if(options['textures']){
        loadResource(options['textures'], null, () => {
            initGame(options);
            runWithScene(scene);
        });
    }else{
        initGame(options);
        runWithScene(scene);
    }
}

function Stop(){
    getScene().onEnd();
    //stopSystems();
    GetSystems().forEach(system => {
        system.onEnd();
    });
    StopEngine(getEngine());
}


/**
 * 获取精灵帧
 * TODO 
 * 可能会改成id形式
 * 引入默认资源机制，找不到帧时的默认空帧，可以是一张红叉图片，
 */
function GetSpriteFrame(name = ""){
    let f = getSpriteFrameByName(name);
    return f ? f : getSpriteFrameByName("defalut");
}

/**
 * 自定义数据
 * @param {*} name 
 */
function GetData(name = ""){
    return getDataByName(name);
}
function SetData(name = "", data = null){
    setDataByName(name, data);
}

export {
    Start, Stop, GetSpriteFrame,
    GetData, SetData
}