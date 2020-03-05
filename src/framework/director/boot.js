import { initGame } from "./service/init";
import { runWithScene, stopSystem } from "./service/system";
import { GetScene, GetEngine, SetSpriteFrame } from "./resource";
import { CreateBitmap } from "../foundation/structure/frame";

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
    //stopSystems();
    stopSystem();
    StopEngine(getEngine());
}


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
        EngineLoadResource(GetEngine(), t.img, bitmapData => {
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
        })
    });
}

function createSpriteFrameWithData(name = "", bitmap = null, textureAreaData = null){
    if(name == "" || !bitmap || !textureAreaData){
        console.err("error param.");
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
    SetSpriteFrame(name, f);
}

export {
    Start, Stop
}