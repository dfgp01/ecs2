
/**
 * world，只是一个舞台范围概念
 */
var world = null;
function GetWorld(options = null){
    if(!world){
        world = createWithDefaultRect(options);
    }
    return world;
}

/**
 * 全局屏幕对象
 */
var screen = null;
function GetScreen(options = null){
    if(!screen){
        screen = createWithDefaultRect(options);
    }
    return screen;
}

function createWithDefaultRect(options = null){
    //默认值
    options = options ? options : {};
    let width = options['width'];
    width = width && width > 0 ? width : 800;
    let height = options['height'];
    height = height && height > 0 ? height : 800;
    return NewRect(width, height);
}