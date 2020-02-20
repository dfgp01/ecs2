import { AbstractEngine } from "../../../director/component/engine";
import { runTick2, canvasOnKeyCallback, canvasOnMouseCallback } from "./processor";

/**
 * 浏览器的key-code
 */
export const KEY_RIGHT = 39;
export const KEY_LEFT = 37;
export const KEY_UP = 38;
export const KEY_DOWN = 40;

export const KEY_SPACE = 32;

export const KEY_W = 87;
export const KEY_A = 65;
export const KEY_S = 83;
export const KEY_D = 68;

/**
 *  engine = web-browser, canvas
 *  options {
 *      screen : {
 *          width : 800,
 *          height : 800
 *      },
 *      fps : 60
 *  }
 */
var _engine;
function GetH5Engine(options = null){
    if(!_engine){
        _engine = createH5Engine(options);
    }
    return _engine;
}

function createH5Engine(options = null){
    options = options ? options : {};
    options.screen = options.screen ? options.screen : {};
    
    let width = options['screen']['width'];
    width = width ? width : 400;
    let height = options['screen']['height'];
    height = height ? height : 400;
    let fps = options['fps'];

    let canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle="#0000ff";          //画矩形框用的

    return new H5Engine(fps, canvas, ctx);
}


class H5Engine extends AbstractEngine {
    constructor(fps = 60, canvas = null, ctx = null){
        super(fps);
        this.canvas = canvas;
        this.ctx = ctx;
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawFrame(spriteFrame = null, cameraPos = null){
        //参考：context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        this.ctx.drawImage(
            spriteFrame.bitmap.data,
            spriteFrame.seg.x, spriteFrame.seg.y, spriteFrame.seg.width, spriteFrame.seg.height,
            cameraPos.x, cameraPos.y, spriteFrame.seg.width, spriteFrame.seg.height);
    }

    drawRect(rect = null, cameraPos = null){
        this.ctx.strokeRect(cameraPos.x, cameraPos.y, rect.width, rect.height);
    }

    drawLine(vec = null, cameraPos = null){
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(cameraPos.x, cameraPos.y);
        ctx.lineTo(cameraPos.x + vec.x, cameraPos.y + vec.y);
        ctx.stroke();
    }

    drawCircle(radius = 0, cameraPos = null){
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(cameraPos.x, cameraPos.y, radius, 0, 2 * Math.PI);
        ctx.stroke();
    }

    loadResource(imgSrc = "", onLoadCallback = null){
        let img = new Image();
        img.src = imgSrc;
        img.onload = function () {
            onLoadCallback(img);
        }
    }

    onKeyCallback(keyDownCallback = null, keyUpCallback = null){
        canvasOnKeyCallback(keyDownCallback, keyUpCallback);
    }

    onMouseCallback(mousedownCallback = null, mouseupCallback = null){
        canvasOnMouseCallback(this, mousedownCallback, mouseupCallback);
    }

    start(onEnterFrameCallback = null){
        runTick2(this, onEnterFrameCallback());
    }
}

export{
    GetH5Engine
}