import { runTick2, canvasOnKeyCallback, canvasOnMouseCallback } from "./processor";
import { GetSpriteFrameBitmapData, GetSpriteFrameStartX, GetSpriteFrameStartY, GetSpriteFrameWidth, GetSpriteFrameHeight, GetSpriteFrameHalfWidth, GetSpriteFrameHalfHeight } from "../../../foundation/structure/frame";
import { AbstractEngine } from "../base";
import { GetRectHalfWidth, GetRectHalfHeight, GetRectHeight, GetRectWidth } from "../../../foundation/structure/geometric";

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

class H5Engine extends AbstractEngine {
    constructor(fps = 60, canvas = null, ctx = null){
        super(fps);
        this.canvas = canvas;
        this.ctx = ctx;
    }

    clear(){
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }

    drawFrame(centerPos = null, spriteFrame = null){
        //参考：context.drawImage(img,sx,sy,swidth,sheight,x,y,width,height);
        this.ctx.drawImage(
            GetSpriteFrameBitmapData(spriteFrame),
            GetSpriteFrameStartX(spriteFrame), GetSpriteFrameStartY(spriteFrame), GetSpriteFrameWidth(spriteFrame), GetSpriteFrameHeight(spriteFrame),
            centerPos.x - GetSpriteFrameHalfWidth(spriteFrame), centerPos.y - GetSpriteFrameHalfHeight(spriteFrame), GetSpriteFrameWidth(spriteFrame), GetSpriteFrameHeight(spriteFrame));
    }

    drawRect(centerPos = null, rect = null){
        this.ctx.strokeRect(
            centerPos.x - GetRectHalfWidth(rect), centerPos.y - GetRectHalfHeight(rect),
            GetRectWidth(rect), GetRectHeight(rect));
    }

    drawLine(startPos = null, endPos = null){
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.moveTo(startPos.x, startPos.y);
        ctx.lineTo(endPos.x, endPos.y);
        ctx.stroke();
    }

    drawCircle(centerPos = null, radius = 0){
        let ctx = this.ctx;
        ctx.beginPath();
        ctx.arc(centerPos.x, centerPos.y, radius, 0, 2 * Math.PI);
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

    onTouchCallback(touchOnCallback = null, touchOverCallback = null){
        canvasOnMouseCallback(this, touchOnCallback, touchOverCallback);
    }

    start(onEnterFrameCallback = null){
        runTick2(this.fps, onEnterFrameCallback);
    }
}


function NewH5Engine(width = 0, height = 0, fps = 0){
    let canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle="#0000ff";          //画矩形框用的
    return new H5Engine(fps, canvas, ctx);
}

export{
    NewH5Engine
}


const Radius = Math.PI/180;
function DrawImageWithAngle(angle = 0, imgData, sx = 0, sy = 0, swidth = 0, sheight = 0, x = 0, y = 0, width = 0, height = 0) {
    let ctx = _engine.ctx;
    ctx.save();
    ctx.translate(x + width/2, y + height/2);
    ctx.rotate(angle * Radius);
    DrawImage(imgData, sx, sy, swidth, sheight, -width/2, -height/2, width, height);
    ctx.restore();

    // ctx.translate(100, 100);
	// ctx.rotate(90 * Math.PI/180);	//以上面的偏移点为准，进行旋转
	// ctx.drawImage(i, 187, 0, 186, 130, -0, -0, 100, 100);
}