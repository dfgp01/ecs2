import { initSystems } from "../system/run";
import { NewCamera } from "../../component/camera/utils";
import { createTileMapWithData } from "./adapter";
import { OpenCollider } from "../../component/collide/utils";
import { SetEngine, GetEngine } from "../component/engine";
import { GetH5Engine } from "../../lib/engine/web/model";
import { CreateBitmap, CreateSpriteFrame } from "../../foundation/structure/frame";

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

var _spriteFrameMap = new Map();
function createSpriteFrameWithData(name = "", bitmap = null, textureAreaData = null){
    if(name == "" || !bitmap || !textureAreaData){
        console.err("error param.");
        return null;
    }
    let f = _spriteFrameMap.get(name);
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
    _spriteFrameMap.set(name, f);
}

/**
 * 找不到帧时的默认空帧，可以是一张红叉图片，
 * TODO 引入默认资源机制
 */
function getSpriteFrameByName(name = ""){
    let f = _spriteFrameMap.get(name);
    return f ? f : _spriteFrameMap.get("defalut");
}

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
 *      cameras : [
 *          {
 *              x : 0,
 *              y : 0,
 *              offset-x : 0,
 *              offset-y : 0,
 *              width : 0,
 *              height : 0
 *          }
 *      ],
 *      camera-style : 1
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
function initGameEngine(options = null) {
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


const SingleCamera = 0;
const TwinCameraHorizontal = 1;
const TwinCameraVerticle = 2;
const FourCamera = 3;
const TypeNormal = 0;
const TypeISOmetric = 1;
/**
 * 
 * @param {*} options 
 * {
 *      style : 0,
 *      cfgs : [
 *          {type: 0, x : 0, y : 0, offset-x : 0, offset-y : 0, width : 0, height : 0}
 *      ]
 * }
 */
function CreateCameraWithData(options = null, screen = null){
    let width = GetScreenWidth(screen);
    let height = GetScreenHeight(screen);
    defaultCameraData(options);
    switch(options.style){
        case SingleCamera:
            createSingleCamera(options.cfgs[0], width, height);
            break;
            case TwinCameraHorizontal:
                case TwinCameraVerticle:
                    case FourCamera:
    }
}

//默认值兼容模式
function defaultCameraData(options = null){
    if(!options){
        options = {};
    }
    if(!options['style']){
        options.style = SingleCamera;
    }
    let cfgs = options['cfgs'];
    if(!cfgs || cfgs.length == 0){
        cfgs = [];
    }
}

function createSingleCamera(options = null, screenWidth = 0, screenHeight = 0){
    options = options ? options : {};
    options.width = screenWidth;
    options.height = screenHeight;
    AddCamera(
        newCamera(options)
    );
}

function createTwinCameraHorizontal(optionsArr = null, screenWidth = 0, screenHeight = 0){
    let width = screenWidth * 0.5;
    let left = optionsArr[0];
    left = left ? left : {};
    left.width = width;
    left.height = screenHeight;
    AddCamera(
        newCamera(left)
    );
    let right = optionsArr[1];
    right = right ? right : {};
    right.width = width;
    right.height = screenHeight;
    right['offset-x'] = width;
    AddCamera(
        newCamera(right)
    );
}

function createTwinCameraVertical(optionsArr = null, screenWidth = 0, screenHeight = 0){
    let height = screenHeight * 0.5;
    let up = optionsArr[0];
    up = up ? up : {};
    up.width = screenWidth;
    up.height = height;
    AddCamera(
        newCamera(up)
    );
    let down = optionsArr[1];
    down = down ? down : {};
    down.width = screenWidth;
    down.height = height;
    down['offset-y'] = height;
    AddCamera(
        newCamera(down)
    );
}

function newCamera(options = null){
    let pos = NewPos(options['x'], options['y']);
    let screenOffset = NewPos(options['offset-x'], options['offset-y']);
    let type = options.type ? options.type : TypeNormal;
    switch(type){
        case TypeNormal:
            return CreateNormalCamera(pos, screenOffset, options['width'], options['height']);
        case TypeISOmetric:
            return CreateISOmetricCamera(pos, screenOffset, options['width'], options['height']);
    }
    console.error("error camera type: %d", type);
    return null;
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

export{
    loadResource, getSpriteFrameByName, 
    initGame, initCamera, GetCamera, initTile, getTilemap
}