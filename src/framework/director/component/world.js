var currWorld = null;

function SetWorld(worldObj = null){
    currWorld = worldObj;
}

function GetWorld(){
    return currWorld;
}

/**
 * 世界/舞台抽象类
 */
class AbstractWorld {
    constructor(width = 0, height = 0){
        this.width = width;
        this.height = height;
    }
}