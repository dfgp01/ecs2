const { GetSpriteFrameByName } = require("../service/resource");

function GetSpriteFrame(name = ""){
    return GetSpriteFrameByName(name);
}

export{
    GetSpriteFrame
}