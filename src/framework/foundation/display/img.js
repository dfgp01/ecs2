
/**
 * 序列帧显示对象
 *  结构：sprite + cameraPos
 *  这样spriteFrame可以单例复用，不必每次创建
 */
class SpriteFrameDisplayer extends DisplayObject {
    constructor(x = 0, y = 0, spriteFrame = null) {
        super(x, y);
        this.spriteFrame = spriteFrame;
    }
    draw(engine = null, x = 0, y = 0){
        engine.drawFrame(
            x - GetSpriteFrameWidth() * 0.5, 
            y - GetSpriteFrameHeight() * 0.5, 
            this.spriteFrame);
    }
}