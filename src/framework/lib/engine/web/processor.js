
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
    let tick = fps / 1000;
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
function canvasOnKeyCallback(keyDownCallback = null, keyUpCallback = null){
    window.addEventListener("keydown", e => {
        let code = e.keyCode;
        if(_keyDownMap.get(code)){
            return;
        }
        _keyDownMap.set(code, 1);
        keyDownCallback(e.keyCode);
    });
    window.addEventListener("keyup", e => {
        let code = e.keyCode;
        _keyDownMap.delete(code);
        keyUpCallback(e.keyCode);
    });
}

/**
 * https://blog.csdn.net/qq_17616169/article/details/72833044
 */
function canvasOnMouseCallback(engine = null, mousedownCallback = null, mouseupCallback = null){
    engine.canvas.addEventListener("mousedown", event => {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left * (canvas.width / rect.width);
        let y = event.clientY - rect.top * (canvas.height / rect.height);
        mousedownCallback(x, y);
    });
    engine.canvas.addEventListener("mouseup", event => {
        let rect = canvas.getBoundingClientRect();
        let x = event.clientX - rect.left * (canvas.width / rect.width);
        let y = event.clientY - rect.top * (canvas.height / rect.height);
        mouseupCallback(x, y);
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