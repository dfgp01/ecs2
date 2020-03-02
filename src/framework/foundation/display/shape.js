
class Line extends DisplayObject {
    constructor(vecX = 0, vecY = 0){
        this.vecX = vecX;
        this.vecY = vecY;
    }
    draw(engine = null, x = 0, y = 0){
        engine.drawLine(
            x, y, 
            x + this.vecX, y + this.vecY);
    }
}

class Rect extends DisplayObject {
    constructor(width = 0, height = 0) {
        this.width = width;
        this.height = height;
    }
    draw(engine = null, x = 0, y = 0){
        engine.drawRect(
            x - this.width * 0.5, 
            y - this.height * 0.5, 
            this.width, this.height);
    }
}

class Circle extends DisplayObject {
    constructor(radius = 0) {
        this.radius = radius;
    }
    draw(engine = null, x = 0, y = 0){
        engine.drawCircle(x, y, this.radius);
    }
}