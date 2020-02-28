
class Line extends DisplayObject {
    constructor(x = 0, y = 0, vecX = 0, vecY = 0){
        super(x, y);
        this.vecX = vecX;
        this.vecY = vecY;
    }
    draw(engine = null){
        engine.drawLine(
            this.x, this.y, 
            this.x + this.vecX, this.y + this.vecY);
    }
}

class Rect extends DisplayObject {
    constructor(x = 0, y = 0, width = 0, height = 0) {
        super(x, y);
        this.width = width;
        this.height = height;
    }
    draw(engine = null){
        engine.drawRect(this.x, this.y, this.width, this.height);
    }
}

class Circle extends DisplayObject {
    constructor(x = 0, y = 0, radius = 0) {
        super(x, y);
        this.radius = radius;
    }
    draw(engine = null){
        engine.drawCircle(this.x, this.y, this.radius);
    }
}