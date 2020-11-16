import { initGame, loadWithResource } from "../service/init";
import { runWithScene, stopSystem, addSystem } from "../service/system";
import { GetScene } from "../service/resource";

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
 *          type: "group"
 *          pairs : [[1, 2], [2, 4], [1, 8]...]
 *      
 *          type: "grid"
 *          max-width: 64
 *          max-height: 64
 *          rows: 8
 *          columns: 8
 *      }
 * }
 * TODO scene可以是一个action?
 */
function Start(options = null, scene = null){
    options = options ? options : {};
    initGame(options);
    loadWithResource(options['res'], null, () => {
        runWithScene(scene);
    });
}

function StartTest(options = null, scene = null){
    options = options ? options : {};
    initGame(options);
    runWithScene(scene);
}

function Stop(){
    GetScene().onEnd();
    stopSystem();
    StopEngine(getEngine());
}


function AddSystem(system = null){
    addSystem(system);
}

export {
    Start, StartTest, Stop,
    AddSystem
}