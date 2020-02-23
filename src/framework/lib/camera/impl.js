const TypeNormalCamera = 0;
const TypeISOmetricCamera = 0;

class NormalCamera extends AbstractCamera {
    constructor(pos = null, screenOffset = null, width = 0, height = 0){
        super(pos, screenOffset, width, height);
    }
    toCameraPos(pos = null){
        return ToLocatePos(pos, this.pos);
    }
}

function newNormalCamera(pos = null, screenOffset = null, width = 0, height = 0){
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

function newISOmetricCamera(pos = null, screenOffset = null, width = 0, height = 0){
    pos = pos ? pos : NewPos();
    screenOffset = screenOffset ? screenOffset : NewPos();
    return new ISOmetricCamera(pos, screenOffset, width, height);
}

function newCamara(type = 0, pos = null, screenOffset = null, width = 0, height = 0){
    switch(type){
        case TypeNormalCamera:
            return new NormalCamera(pos, screenOffset, width, height);
        case TypeISOmetricCamera:
            return new ISOmetricCamera(pos, screenOffset, width, height);
    }
    console.log("error param");
    return null;
}