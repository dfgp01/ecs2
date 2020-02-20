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
 */
function Start(options = null, scene = null){
    loadResource(options.textures, null, () => {
        startGame(options, scene);
    });
}

function StartTest(options = null, scene = null){
    startGame(options, scene);
}

function startGame(options, scene = null){
    initGame(options);
    runWithScene(scene);
}

function Stop(){
    GetScene().onEnd();
    GetSystems().forEach(system => {
        system.onEnd();
    });
    engine.Stop();
}



export {Start, StartTest, Stop}