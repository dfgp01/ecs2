
import data from './data';
import { NewPos, NewRect } from "../../framework/foundation/structure/geometric";
import { CreateAnimateWithData } from "../../framework/lib/actions/utils";
import { DEBUG_BORDER_BLACK, DEBUG_BORDER_BLUE } from "../../framework/foundation/const";
import { ANIMATE_TYPE_REPEAT } from "../../framework/lib/actions/animate";
import { RunAction } from "../../framework/lib/actions/base";
import { NewRandomBeteen } from '../../framework/foundation/structure/math';
import { NewGameUnit } from '../../framework/lib/unit/utils';
import { AddRectDebugDisplayer } from '../../framework/lib/view/utils';
import { Start } from '../../framework/director/utils/boot';


//谨记数据驱动，分清业务配置和框架逻辑配置
var options = data;

function StartAnimateShowDemo(){
    console.log(options);
    Start(options, new AnimateShowScene());
}

class AnimateShowScene {
    onStart(){
        Starter();
    }
    onUpdate(dt = 0){
    }
}

function Starter(){
    let scn = options['scene'];
    initObjects(
        scn['blocks'], scn['block-width'], scn['bodies'], scn['body-width'],
        scn['width'], scn['height']
    );
}

function initObjects(blocks = 0, blockWidth = 0, bodies = 0, bodyWidth = 0, width = 0, height = 0){
    for(let i=0; i<blocks; i++){
        NewBlock(blockWidth, blockWidth, RandomPos(width, height));
    }
    for(let i=0; i<bodies; i++){
        NewBody(bodyWidth, bodyWidth, RandomPos(width, height));
    }
}

function RandomPos(width = 0, height = 0){
    return NewPos(
        NewRandomBeteen(-width * 0.5, width * 0.5),
        NewRandomBeteen(-height * 0.5, height * 0.5));
}


/**
 * ##############   游戏对象管理
 */

function NewBlock(width = 0, height = 0, pos = null){
    let unit = NewGameUnit(pos);
    let rect = NewRect(width, height);
    AddRectDebugDisplayer(unit.id, DEBUG_BORDER_BLACK, rect);

    let act = CreateAnimateWithData(unit.id, {
        "type" : ANIMATE_TYPE_REPEAT, 
        "frames" : [
            {"name" : "plane4", duration : 250},
            {"name" : "plane5", duration : 250}
        ]
    })
    RunAction(act);
}

function NewBody(width = 0, height = 0, pos = null){
    let unit = NewGameUnit(pos);
    let rect = NewRect(width, height);
    AddRectDebugDisplayer(unit.id, DEBUG_BORDER_BLUE, rect);

    let act = CreateAnimateWithData(unit.id, {
        "type" : ANIMATE_TYPE_REPEAT, 
        "frames" : [
            {"name" : "plane1", duration : 250},
            {"name" : "plane2", duration : 250},
            {"name" : "plane3", duration : 250}
        ]
    })
    RunAction(act);
}

export{
    StartAnimateShowDemo
}