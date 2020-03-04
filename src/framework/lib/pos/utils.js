
var moveList = NewLink();
function GetMoverList(){
    return moveList;
}

function AddMover(entityId = 0) {
    let m = GetLinkData(moveList, entityId);
    if(m){
        return;
    }
    PushToLink(moveList, GetPosComponent(entityId));
}

function RemoveMover(entityId = 0) {
    RemoveByKeyId(moveList, entityId);
}