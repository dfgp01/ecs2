import { GetColliderTag } from "../../../framework/lib/collide/base";
import { GetGridCenterPos } from "../../../framework/lib/gridmap/base";
import { IsSideTileGrid } from "../../../framework/lib/gridmap/tilemap/base";
import { BoxCollide, COLLIDE_DU, COLLIDE_LR, COLLIDE_RL, COLLIDE_UD } from "../../../framework/lib/collide/utils/box";
import { CreateTileMapWithData, TilemapRandomAccess } from "../../../framework/lib/gridmap/utils";
import { AddCollider, NewCollideHandler } from "../../../framework/lib/collide/utils/boot";
import { CollectionIterator } from "../../../framework/foundation/component/collection";
import { Component } from "../../../framework/foundation/component/ecs";
import { GetGameUnitByClz, NewGameUnit } from "../../../framework/lib/unit/utils";
import { SetUnitVec } from "../../../framework/lib/unit/base";
import { NewRandomBeteen } from "../../../framework/foundation/structure/math";
import { AddRectDebugDisplayer } from "../../../framework/lib/view/utils";
import { NewRect } from "../../../framework/foundation/structure/geometric";
import data from './data';
import { NewLinkList } from "../../../framework/lib/collection/linklist";


//谨记数据驱动，分清业务配置和框架逻辑配置
var options = data;

function StartCollideMoveShowDemo(){
    console.log(options);
    StartTest(options, new MoveCollideShowScene());
}

class MoveCollideShowScene {
    onStart(){
        Starter();
    }
    onUpdate(dt = 0){
        MainLoop();
    }
}

function Starter(options = null){
    //只是用来定位用的tilemap
    let tilemap = CreateTileMapWithData(options['tilemap']);
    let scn = options['scene'];
    initObjects(
        scn['blocks'], scn['block-width'], scn['bodies'], scn['body-width'], scn['body-speed-seed'],
        tilemap, scn['width'], scn['height']
    );
    NewCollideHandler(clldHndl);
}

function initObjects(blocks = 0, blockWidth = 0, bodies = 0, bodyWidth = 0, bodySpeedSeed = 0, tileMap = null, width = 0, height = 0){
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
    CollectionIterator(spList, spCom => {
        //根据spCom移动
        SetUnitVec(GetGameUnitByClz(spCom), spCom.dx, spCom.dy);
    });
}


const BODY_TAG = 1;
const BLOCK_TAG = 2;
const COLLIDE_BODY_BLOCK = 3;

function clldHndl(collider1 = null, collider2 = null, tag = 0){
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


/**
 * 运动组件，移动速度值
 */
class SpeedComponent extends Component {
    constructor(entityId = 0, dx = 0, dy = 0) {
        super(entityId);
        this.dx = dx;
        this.dy = dy;
	}
}

var spList = NewLinkList();
function newSpeedComponent(unit = null, dx = 0, dy = 0){
    let c = new SpeedComponent(unit.id, dx, dy);
    PushToList(spList, c);
}

function TurnLeft(unit = null){
    let spCom = GetListData(spList, GetUnitId(unit));
    if(spCom.dx > 0){
        spCom.dx = spCom.dx * -1;
    }
}

function TurnRight(unit = null){
    let spCom = GetListData(spList, GetUnitId(unit));
    if(spCom.dx < 0){
        spCom.dx = spCom.dx * -1;
    }
}

function TurnUp(unit = null){
    let spCom = GetListData(spList, GetUnitId(unit));
    if(spCom.dy > 0){
        spCom.dy = spCom.dy * -1;
    }
}

function TurnDown(unit = null){
    let spCom = GetListData(spList, GetUnitId(unit));
    if(spCom.dy < 0){
        spCom.dy = spCom.dy * -1;
    }
}


/**
 * ##############   游戏对象管理
 */

function NewBlock(width = 0, height = 0, pos = null){
    let unit = NewGameUnit(pos);
    let rect = NewRect(width, height);
    AddCollider(unit.id, rect, BLOCK_TAG);
    AddRectDebugDisplayer(unit.id, DEBUG_BORDER_BLACK, rect);
}

function NewBody(width = 0, height = 0, pos = null, speedSeed = 0){
    let vx = NewRandomBeteen(0, speedSeed);
    let vy = NewRandomBeteen(0, speedSeed);
    let unit = NewGameUnit(pos);
    newSpeedComponent(unit, vx, vy);
    let rect = NewRect(width, height);
    AddCollider(unit.id, rect, BODY_TAG);
    AddRectDebugDisplayer(unit.id, DEBUG_BORDER_BLUE, rect);
}

export{
    StartCollideMoveShowDemo
}