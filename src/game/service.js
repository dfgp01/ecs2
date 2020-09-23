import { AddEventListener, GetGameUnitByClz } from "../framework/director/utils/boot";
import { NewBlock, NewBody, GetMoverList, GetSpeedComponentList, TurnLeft, TurnRight, TurnUp, TurnDown } from "./objects";
import { COLLIDE_BODY_BLOCK, BODY_TAG } from "./const";
import { AbstractCollideEventListener, GetColliderTag } from "../framework/lib/collide/base";
import { GetGridCenterPos } from "../framework/foundation/container/gridmap";
import { IsSideTileGrid } from "../framework/lib/gridmap/tilemap/base";
import { BoxCollide, COLLIDE_DU, COLLIDE_LR, COLLIDE_RL, COLLIDE_UD } from "../framework/lib/collide/utils/box";



const { GetUnitId, SetUnitVec } = require("../framework/foundation/unit/base");
const { GetListData, ListIterator } = require("../framework/foundation/container/list");
const { TilemapRandomAccess, CreateTileMapWithData } = require("../framework/lib/gridmap/utils");


function Starter(options = null){
    let tilemap = CreateTileMapWithData(options['tilemap']);
    let scn = options['scene'];
    initObjects(
        scn['blocks'], scn['block-width'], scn['bodies'], scn['body-width'], scn['body-speed-seed'],
        tilemap
    );
    AddEventListener(new MyCollideEventListener());
}

function initObjects(blocks = 0, blockWidth = 0, bodies = 0, bodyWidth = 0, bodySpeedSeed = 0, tileMap = null){
    TilemapRandomAccess(tileMap, (grid) => {
        let pos = GetGridCenterPos(tileMap, grid);
        //边缘围起来
        if(IsSideTileGrid(tileMap, grid)){
            NewBlock(blockWidth, blockWidth, pos);
            return;
        }
        if(blocks > 0){
            NewBlock(blockWidth, blockWidth, pos);
            blocks--;
        }else if(bodies > 0){
            NewBody(bodyWidth, bodyWidth, pos, bodySpeedSeed);
            bodies--;
        }
    });
}

function MainLoop(){
    ListIterator(GetMoverList(), unit => {
        //根据spCom移动
        let spCom = GetListData(GetSpeedComponentList(), GetUnitId(unit));
        SetUnitVec(unit, spCom.dx, spCom.dy);
    });
}

//--------------------  listener

class MyCollideEventListener extends AbstractCollideEventListener {
    onHandle(collider1 = null, collider2 = null, tag = 0){
        console.log(tag);
        if(tag != COLLIDE_BODY_BLOCK){
            return
        }
        let flag = 0;
        let body = null;
        if(GetColliderTag(collider1) == BODY_TAG){
            body = collider1;
            flag = BoxCollide(collider1, collider2);
        }else{
            body = collider2;
            flag = BoxCollide(collider2, collider1);
        }
        if(flag == 0){
            return
        }
    
        switch(flag){
            case COLLIDE_LR:
                TurnLeft(GetGameUnitByClz(body));
                break;
            case COLLIDE_RL:
                TurnRight(GetGameUnitByClz(body));
                break;
            case COLLIDE_UD:
                TurnUp(GetGameUnitByClz(body));
                break;
            case COLLIDE_DU:
                TurnDown(GetGameUnitByClz(body));
                break;
        }
    }
}

export{
    Starter, MainLoop
}