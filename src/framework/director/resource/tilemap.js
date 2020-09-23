import { GridMapIterator, GetGridDataWithPos, GetGridData } from "../../foundation/container/gridmap";
import { ListIterator } from "../../foundation/container/list";

const { System } = require("../../foundation/component/ecs");
const { SYSTEM_PRIORITY_TILEMAP_UPDATE } = require("../../foundation/const");

class TilemapUpdateSystem extends System {
    constructor(){
        super(SYSTEM_PRIORITY_TILEMAP_UPDATE)
    }
    onUpdate(dt = 0){
        GridMapIterator(tilemap, grid => {
            //todo data未必是个list
            ListIterator(GetGridData(grid), moverCom => {
                //get unit vec
                IsMoved()
            });
        });
    }
}

var sys = null;
function GetTilemapUpdateSystem(){
    if(!sys){
        sys = new TilemapUpdateSystem();
    }
    return sys;
}

export{
    GetTilemapUpdateSystem
}