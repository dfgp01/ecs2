import { initGame } from "../world/res";
import { runWithScene } from "../system/run";

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
    GetScene().onEnd();
    GetSystems().forEach(system => {
        system.onEnd();
    });
    engine.Stop();
}

export {
    Start, Stop
}