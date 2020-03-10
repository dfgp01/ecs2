import { DispatchEvent } from "../../../director/boot";
import { EventKeydown, NewEvent, EventKeyup, EventTouchOn, EventTouchOver } from "../../../foundation/component/event";
import { NewPos } from "../../../foundation/structure/geometric";

var _callback;
var _frameNo = 0;
var _dt = 0;
var _last = 0;
var _isEnd = false;
function runTick(timestamp) {
    _dt = timestamp - _last;
    _last = timestamp;
    _callback(_dt);
    if(!_isEnd){
        _frameNo = window.requestAnimationFrame(tick);
    }
}


/**
 * debug
 */
var start = null;
var last = new Date().getTime();
function runTick2(fps = 0, onUpdateCallback = null) {
    _isEnd = false;
    onUpdateCallback;
    let tick = 1000 / fps;
    setInterval(() => {
        start = new Date().getTime();
        if(!_isEnd){
            onUpdateCallback(start - last);
        }
        last = new Date().getTime();
    }, tick);
}

function stop(){
    _isEnd = true;
}


//因为按住键的话，会不断触发onKeydown，所以做个map判断
var _keyDownMap = new Map();
function canvasOnKeyCallback(){
    window.addEventListener("keydown", e => {
        let code = e.keyCode;
        if(_keyDownMap.get(code)){
            return;
        }
        _keyDownMap.set(code, 1);
        DispatchEvent(
            NewEvent(
                EventKeydown, code));
    });
    window.addEventListener("keyup", e => {
        let code = e.keyCode;
        _keyDownMap.delete(code);
        DispatchEvent(
            NewEvent(
                EventKeyup, code));
    });
}

/**
 * https://blog.csdn.net/qq_17616169/article/details/72833044
 */
function canvasOnMouseCallback(canvas = null){
    canvas.addEventListener("mousedown", event => {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left * (canvas.width / rect.width);
        let y = event.clientY - rect.top * (canvas.height / rect.height);
        DispatchEvent(
            NewEvent(
                EventTouchOn, NewPos(x, y)));
    });
    canvas.addEventListener("mouseup", event => {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left * (canvas.width / rect.width);
        let y = event.clientY - rect.top * (canvas.height / rect.height);
        DispatchEvent(
            NewEvent(
                EventTouchOver, NewPos(x, y)));
    });
    // engine.canvas.addEventListener("click", event => {
    //     console.log(event.x, event.y);
    // });
    //engine.canvas.addEventListener("mousemove",doMouseMove,false);
    //engine.canvas.addEventListener("mouseout",doMouseOut,false);
}

export{
    runTick2, stop, canvasOnKeyCallback, canvasOnMouseCallback
}