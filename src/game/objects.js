
//---------------------------   speed-com

import { Component } from "../framework/foundation/component/ecs";
import { NewLink } from "../framework/lib/list/linklist";
import { GetUnitId } from "../framework/foundation/unit/base";
import { PushToList, GetListData } from "../framework/foundation/container/list";
import { CreateGameUnit } from "../framework/director/utils/boot";
import { NewRectOffsetRelation } from "../framework/foundation/unit/rect";
import { NewPos, NewRect } from "../framework/foundation/structure/geometric";
import { AddDebugDisplayer } from "../framework/lib/view/utils";
import { DEBUG_BORDER_BLACK, DEBUG_BORDER_BLUE } from "../framework/foundation/const";
import { BLOCK_TAG, BODY_TAG } from "./const";
import { AddCollider } from "../framework/lib/collide/utils/boot";
import { GetColliderRectOR } from "../framework/lib/collide/base";

class SpeedComponent extends Component {
    constructor(entityId = 0, dx = 0, dy = 0) {
        super(entityId);
        this.dx = dx;
        this.dy = dy;
	}
}

var spList = NewLink();
function GetSpeedComponentList(){
    return spList;
}

function newSpeedComponent(unit = null, dx = 0, dy = 0){
    let id = GetUnitId(unit);
    let c = new SpeedComponent(id, dx, dy);
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

//--------------------------    unit

var moverList = NewLink();
function GetMoverList(){
    return moverList;
}

function NewBlock(width = 0, height = 0, pos = null){
    let unit = CreateGameUnit(pos);
    let id = GetUnitId(unit);
    let c = AddCollider(id, 
        NewRectOffsetRelation(NewRect(width, height)),
        BLOCK_TAG);
    AddDebugDisplayer(id, GetColliderRectOR(c), DEBUG_BORDER_BLACK);
}

function NewBody(width = 0, height = 0, pos = null, speedSeed = 0){
    let vx = getRandom(speedSeed);
    let vy = getRandom(speedSeed);
    let unit = CreateGameUnit(pos);
    let id = GetUnitId(unit);
    newSpeedComponent(unit, vx, vy);
    PushToList(moverList, unit);
    
    let c = AddCollider(id,
        NewRectOffsetRelation(NewRect(width, height)),
        BODY_TAG);
    AddDebugDisplayer(id, GetColliderRectOR(c), DEBUG_BORDER_BLUE);
}


/**
 * 生成 [0, m)，n个不重复随机数
 */
function NewRandoms(maxNum = 0, count = 0){
    let arr = [];
    for(let i=0; i<maxNum; i++){
        arr.push(i);
    }
    let results = [];
    for(let i=0; i<count; i++){
        let index = Math.floor(Math.random() * arr.length)
        results.push(arr.splice(index, 1));
    }
    return results;
}

/**
 * 获得 [1~max)的随机数
 */
function getRandom(maxNum = 0){
    return Math.floor(Math.random() * (maxNum-1)) + 1;
}

/**
 * 获得 n~m 之间的随机数
 * @param {*} min 
 * @param {*} max 
 */
function RandomBetween(min = 0, max = 0){
    return min + Math.floor(Math.random() * (max - min));
}

function RandomPos(sceenWidth = 0, sceenHeight = 0){
    return NewPos(
        RandomBetween(sceenWidth / 2 * -1, sceenWidth / 2),
        RandomBetween(sceenHeight / 2 * -1, sceenHeight / 2)
    );
}

export{
    GetSpeedComponentList, 
    TurnLeft, TurnRight, TurnUp, TurnDown,
    GetMoverList, NewBlock, NewBody, NewRandoms, RandomBetween, RandomPos
}