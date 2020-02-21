
class NormalCamera extends AbstractCamera {
    constructor(pos = null, screenOffset = null, width = 0, height = 0){
        super(pos, screenOffset, width, height);
    }
    toCameraPos(pos = null){
        return ToLocatePos(pos, this.pos);
    }
}

function CreateNormalCamera(pos = null, screenOffset = null, width = 0, height = 0){
    pos = pos ? pos : NewPos();
    screenOffset = screenOffset ? screenOffset : NewPos();
    return new NormalCamera(pos, screenOffset, width, height);
}


class ISOmetricCamera extends AbstractCamera {
    constructor(pos = null, screenOffset = null, width = 0, height = 0){
        super(pos, screenOffset, width, height);
    }
    toCameraPos(pos = null){
        return NewPos(
            pos.x - pos.y,
            (pos.x + pos.y) * 0.5
        );
    }
}

function CreateISOmetricCamera(pos = null, screenOffset = null, width = 0, height = 0){
    pos = pos ? pos : NewPos();
    screenOffset = screenOffset ? screenOffset : NewPos();
    return new ISOmetricCamera(pos, screenOffset, width, height);
}