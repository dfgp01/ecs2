import { runTick2, canvasOnKeyCallback, canvasOnMouseCallback } from "./processor";
import { GetSpriteFrameBitmapData, GetSpriteFrameStartX, GetSpriteFrameStartY, GetSpriteFrameWidth, GetSpriteFrameHeight, GetSpriteFrameHalfWidth, GetSpriteFrameHalfHeight } from "../../../foundation/structure/frame";
import { GetRectHalfWidth, GetRectHalfHeight, GetRectHeight, GetRectWidth } from "../../../foundation/structure/geometric";
import { AbstractEngine } from "../../../foundation/component/engine";
import { DEBUG_BORDER_BLUE, DEBUG_BORDER_BLACK, DEBUG_FILL_BLACK, DEBUG_BORDER_GRAY, DEBUG_BORDER_GREEN, DEBUG_BORDER_RED, DEBUG_BORDER_YELLOW, DEBUG_BORDER_PINK, DEBUG_BORDER_GREENBLUE, DEBUG_FILL_BLUE, DEBUG_FILL_GREEN, DEBUG_FILL_RED, DEBUG_FILL_PINK, DEBUG_FILL_GREENBLUE, DEBUG_FILL_YELLOW } from "../../../foundation/const";

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

    drawRect(centerPos = null, rect = null, style = 0){
        setStyle(this.ctx, style);
        if(style < DEBUG_FILL_BLACK){
            this.ctx.strokeRect(
                centerPos.x - GetRectHalfWidth(rect), centerPos.y - GetRectHalfHeight(rect),
                GetRectWidth(rect), GetRectHeight(rect));
        }else{
            this.ctx.fillRect(
                centerPos.x - GetRectHalfWidth(rect), centerPos.y - GetRectHalfHeight(rect),
                GetRectWidth(rect), GetRectHeight(rect));
        }
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

    start(onEnterFrameCallback = null){
        runTick2(this.fps, onEnterFrameCallback);
    }
}

function setStyle(ctx = null, style = 0){
    switch(style){
        case DEBUG_BORDER_BLACK:
            ctx.strokeStyle="#000000";
            break;
        case DEBUG_BORDER_BLUE:
            ctx.strokeStyle="#0000ff";
            break;
        case DEBUG_BORDER_GREEN:
            ctx.strokeStyle="#00ff00";
            break;
        case DEBUG_BORDER_RED:
            ctx.strokeStyle="#ff0000";
            break;
        case DEBUG_BORDER_YELLOW:
            ctx.strokeStyle="#ffff00";
            break;
        case DEBUG_BORDER_PINK:
            ctx.strokeStyle="#ff00ff";
            break;
        case DEBUG_BORDER_GREENBLUE:
            ctx.strokeStyle="#00ffff";
            break;

        case DEBUG_FILL_BLACK:
            ctx.fillStyle="#000000";
            break;
        case DEBUG_FILL_BLUE:
            ctx.fillStyle="#0000ff";
            break;
        case DEBUG_FILL_GREEN:
            ctx.fillStyle="#00ff00";
            break;
        case DEBUG_FILL_RED:
            ctx.fillStyle="#ff0000";
            break;
        case DEBUG_FILL_YELLOW:
            ctx.fillStyle="#ffff00";
            break;
        case DEBUG_FILL_PINK:
            ctx.fillStyle="#ff00ff";
            break;
        case DEBUG_FILL_GREENBLUE:
            ctx.fillStyle="#00ffff";
            break;
    }
}


function NewH5Engine(width = 0, height = 0, fps = 0){
    let canvas = document.getElementById("canvas");
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    ctx.strokeStyle="#0000ff";          //画矩形框用的
    let engine = new H5Engine(fps, canvas, ctx);
    canvasOnKeyCallback();
    canvasOnMouseCallback(engine.canvas);
    return engine;
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