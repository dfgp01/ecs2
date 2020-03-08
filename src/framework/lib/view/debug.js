import { DrawRect } from "../../director/render";
import { GetRect } from "../../foundation/offset/rect";
import { GetDisplayCenterPos, GetDisplayIsoPos } from "./component/render";

function drawIsoDebug(displayTuple = null){
    DrawRect(
        GetDisplayIsoPos(displayTuple),
        GetRect(displayTuple.rectPosRel)
    );
}

function drawDebug(displayTuple = null){
    DrawRect(
        GetDisplayCenterPos(displayTuple),
        GetRect(displayTuple.rectPosRel)
    );
}

export {drawIsoDebug, drawDebug}