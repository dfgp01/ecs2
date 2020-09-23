import { SetDefaultCamera, SetEngine, SetData, SetDef, SetSpriteFrame, GetEngine, SetScreen } from "./resource";
import { CreateCameraWithData } from "../../lib/camera/utils";
import { initSystems } from "./system";
import { CreateTileMapWithData } from "../../lib/gridmap/utils";
import { CreateEngineWithData } from "../../lib/engine/utils";
import { CreateBitmap, CreateSpriteFrame } from "../../foundation/structure/frame";

/**
 * 通过参数配置初始化系统资源
 * options {
 *      system : {
 *          debug : false,
 *          collide : {}
 *      },
 *      
 *      screen : {
 *          width : 800, height : 800
 *      },
 *      engine : {
 *          fps : 60
 *      }
 *      textures : []格式见LoadResource()内
 *      camera : {},
 *      layers : [
 *          {
 *              type : 1 格式参考tilemap一节
 *          }
 *      ]
 * }
 */
function initGame(options = null) {
    initScreen(options['screen']);
    initEngine(options['engine']);
    initCamera(options['camera']);
    initSystems(options['system']);

    //自定义数据等
    //initDef(options['def']);
    //initDatas(options['datas']);
}

function initScreen(options = null){
    //默认值
    options = options ? options : {};
    let screenWidth = options['screen-width'];
    screenWidth = screenWidth && screenWidth > 0 ? screenWidth : 800;
    let screenHeight = options['screen-height'];
    screenHeight = screenHeight && screenHeight > 0 ? screenHeight : 800;

    SetScreen(screenWidth, screenHeight);
}

/**
 * 要先初始化引擎
 * options {
 *      fps : 60,
 * }
 */
function initEngine(options = null){
    SetEngine(
        CreateEngineWithData(options));
}

/**
 * 摄像机
 */
function initCamera(options = null){
    SetDefaultCamera(
        CreateCameraWithData(options));
}

function initDef(options = null){
    for(let key in options){
        SetDef(key, options[key]);
    }
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
        SetData(name, dataObj);
    }
}


/**
 * 加载资源，创建帧
 "res" : {
		"imgs" : [
			"res/3.png"
		],
		"frames" : [
			{
				"name" : "building1",
				"res" : "res/3.png",
				"area" : {
					"width" : 151,
					"height" : 167
				}
			}
		]
	},
 */
function loadWithResource(res = null, OnloadCallback = null, OnCompleteCallback = null){
    let imgs = res ? res['imgs'] : null;
    if(imgs && imgs.length > 0){
        loadResource(imgs, res['frames'], OnloadCallback, OnCompleteCallback);
        return;
    }
    OnCompleteCallback();
}

function loadResource(imgs = null, frames = null, OnloadCallback = null, OnCompleteCallback = null){
    let _count = 0;
    let bitmaps = new Map();
    imgs.forEach(img =>{
        EngineLoadResource(GetEngine(), img, bitmapData => {
            bitmaps.set(img, CreateBitmap(bitmapData, bitmapData.width, bitmapData.height));
            _count++;
            if(OnloadCallback){
                OnloadCallback(img, _count);
            }
            if(imgs.length == _count){
                createSpriteFramesWithData(frames, bitmaps);
                if(OnCompleteCallback){
                    OnCompleteCallback();
                }
            }
        })
    });
}


/**
 "frames" : [
		{
			"name" : "building1",
			"res" : "res/3.png",
			"area" : {
				"width" : 151,
				"height" : 167
			}
		}
	],
 */
function createSpriteFramesWithData(spriteFrameDatas = null, bitmaps = null){
    if(!spriteFrameDatas || spriteFrameDatas.length == 0 || !bitmaps){
        return;
    }
    spriteFrameDatas.forEach(data => {
        createSpriteFrameWithData(
            data['name'], 
            bitmaps.get(data['res']),
            data['area']
        );
    });
}

function createSpriteFrameWithData(name = "", bitmap = null, area = null){
    if(name == "" || !bitmap || !area){
        console.error("error param.");
        return null;
    }
    let x = area['x'];
    let y = area['y'];
    let width = area['width'];
    let height = area['height'];
    if(!width || !height){
        console.err("error param.");
        return null;
    }
    let f = CreateSpriteFrame(name, bitmap, x, y, width, height);
    SetSpriteFrame(name, f);
}

export{
    initGame, loadWithResource
}