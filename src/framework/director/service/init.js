import { SetDefaultCamera, SetEngine, SetData, SetDef, GetBitmap, SetSpriteFrame, GetEngine } from "./resource";
import { CreateCameraWithData } from "../../lib/camera/utils";
import { initSystems } from "./system";
import { CreateTileMapWithData } from "../../lib/grid/utils";
import { CreateEngineWithData } from "../../lib/engine/utils";
import { CreateBitmap, CreateSpriteFrame } from "../../foundation/structure/frame";
import { EngineLoadResource } from "../../lib/engine/base";

/**
 * 要先初始化引擎
 * options {
 *      screen-width : 800,
 *      screen-height : 800,
 *      fps : 60,
 * }
 */
function initEngine(options = null, keyDownHandler = null, keyUpHanler = null, touchOnCallback = null, touchOverCallback = null){
    SetEngine(
        CreateEngineWithData(options));
}

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
    SetDefaultCamera(
        CreateCameraWithData(options['camera'], screenWidth, screenHeight));

    //系统
    initSystems(options['debug']);

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

    //自定义数据等
    initDef(options['def']);
    initDatas(options['datas']);
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
    imgs.forEach(img =>{
        EngineLoadResource(GetEngine(), img, bitmapData => {
            let bitmaps = new Map();
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
        console.err("error param.");
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
    initEngine, initGame, loadWithResource
}