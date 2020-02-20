import { initSystems } from "../system/run";
import { NewCamera } from "../../component/camera/utils";
import { createTileMapWithData } from "./adapter";
import { OpenCollider } from "../../component/collide/utils";
import { SetEngine, GetEngine } from "../component/engine";
import { GetH5Engine } from "../../lib/engine/web/model";

/**
 * 通过参数配置初始化系统资源
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
function initGame(options = null) {
    if(!options){
        console.error("options is null");
        return;
    }

    //引擎初始化
    if(!options['engine']){
        SetEngine(GetH5Engine(options));
    }

    //注册按键回调
    if(options.keyDownHandler && options.keyUpHanler){
        GetEngine().onKeyCallback(options.keyDownHandler, options.keyUpHanler);
    }
    if(options.mousedownHandler && options.mouseupHandler){
        GetEngine().onMouseCallback(options.mousedownHandler, options.mouseupHandler);
    }
    
    initCamera(options.camera, options.screen);
    initSystems(options.debug);

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

/**
 * 摄像机，全局单例
 * TODO camera is a director.component
 */
var camera = null;
function initCamera(cameraData = null, screenData = null){
    let width = cameraData.width ? cameraData.width : screenData.width;
    let height = cameraData.height ? cameraData.height : screenData.height;
    camera = NewCamera(cameraData.x, cameraData.y, width, height);
}
function GetCamera(){
    return camera;
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

export{initGame, initCamera, GetCamera, initTile, getTilemap}