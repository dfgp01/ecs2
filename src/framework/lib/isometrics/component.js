
class IsometricsPosComponent extends Comment {
    constructor(entityId = 0){
        super(entityId);
        this.pos = NewPos();
    }
}

class IsometricsTuple extends GameObject {
    constructor(posCom = null, isoPosCom = null){
        super();
        this.posCom = posCom;
        this.isoPosCom = isoPosCom;
    }
}

class IsometricsPosUpdateSystem extends System {
    onUpdate(dt = 0){
        ListIterator(
            GetIsometricsList(), isometricsTuple => {
                updateIsoPos(isometricsTuple);
            }
        );
    }
}

function updateIsoPos(isometricsTuple = null) {
    let pos = isometricsTuple.posCom.pos;
    let isoPos = isometricsTuple.isoPosCom.pos;
    isoPos.x = pos.x - pos.y;
    isoPos.y = (pos.x + pos.y) * 0.5
}