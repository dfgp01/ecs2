import { StartTest } from "../../../framework/director/utils/boot";
import { GetGridCenterPos, GetGridData, GetGridMapGridCount, GridMapAdjacentCompare, GridMapIterator } from "../../../framework/lib/gridmap/base";
import { NewPos, NewRect } from "../../../framework/foundation/structure/geometric";
import { GetGameUnitByClz, NewGameUnit } from "../../../framework/lib/unit/utils";
import { AddDebugDisplayer, AddRectDebugDisplayer, RemoveDebugDisplayer } from "../../../framework/lib/view/utils";
import { DEBUG_BORDER_BLACK, DEBUG_BORDER_BLUE, DEBUG_FILL_BLUE, DEBUG_FILL_GREEN, DEBUG_FILL_YELLOW } from "../../../framework/foundation/const";
import { AddToListAction, NewListAction } from "../../../framework/lib/actions/wrap";
import { AddCollider, GetColliderSystem } from "../../../framework/lib/collide/utils/boot";
import { GetNormalColliderSystem } from "../../../framework/lib/collide/list/normal";
import { GetGroupColliderSystem } from "../../../framework/lib/collide/list/group";
import { GetGridMapColliderSystem } from "../../../framework/lib/collide/gridmap/base";
import { Action, RunAction } from "../../../framework/lib/actions/base";
import { CollectionIterator, CollectionIteratorCompare, GetCollectionSize } from "../../../framework/foundation/component/collection";
import { CreateDurationAction } from "../../../framework/lib/actions/utils";
import { NewRectDisplayer } from "../../../framework/lib/view/debug";
import data from './data4';
import { NewRandomBeteen } from "../../../framework/foundation/structure/math";

//谨记数据驱动，分清业务配置和框架逻辑配置
var options = data;

function StartGridShowDemo(){
    console.log(options);
    StartTest(options, new GridShowScene());
}

class GridShowScene {
    onStart(){
        Starter();
    }
    onUpdate(dt = 0){}
}

function Starter(){
    let scn = options['scene'];
    initObjects(
        scn['blocks'], scn['block-width'], scn['bodies'], scn['body-width'], scn['width'], scn['height']
    );
    ShowAnimate();
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

const BODY_TAG = 1;
const BLOCK_TAG = 2;
const COLLIDE_BODY_BLOCK = 3;

function NewBlock(width = 0, height = 0, pos = null){
    let unit = NewGameUnit(pos);
    let rect = NewRect(width, height);
    AddCollider(unit.id, rect, BLOCK_TAG);
    AddRectDebugDisplayer(unit.id, DEBUG_BORDER_BLACK, rect);
}

function NewBody(width = 0, height = 0, pos = null){
    let unit = NewGameUnit(pos);
    let rect = NewRect(width, height);
    AddCollider(unit.id, rect, BODY_TAG);
    AddRectDebugDisplayer(unit.id, DEBUG_BORDER_BLUE, rect);
}



/**
 * ##########       动画展示逻辑
 */
var listAction = null;

function ShowAnimate(){
    listAction = NewListAction(9999);
    let sys = GetColliderSystem();
    switch(sys){
        case GetNormalColliderSystem():
            normal(sys);
            break;
        case GetGroupColliderSystem():
            group(sys);
            break;
        case GetGridMapColliderSystem():
            gridmap(sys);
            break;
    }
    RunAction(listAction);
}

function normal(sys = null){
    let size = GetCollectionSize(sys.container.list);
    let i = 0;
    CollectionIteratorCompare(sys.container.list, (collider1, collider2) => {
        i++;
        addColliderShow(collider1, collider2);
    });
    console.log("normal list size: %d, compare-count: %d", size, i);
}

function group(sys = null){
    let size = GetCollectionSize(sys.container.pairs);
    console.log("group pairs: %d", size);
    CollectionIterator(sys.container.pairs, pair => {
        let i = 0;
        if(!pair.team2){
            //one team
            CollectionIteratorCompare(pair.team1, (collider1, collider2) => {
                i++;
                addColliderShow(collider1, collider2);
            });
            console.log("one team size: %d, compare-count: %d", GetCollectionSize(pair.team1), i);
        }else{
            //two team
            CollectionIterator(pair.team1, collider1 => {
                CollectionIterator(pair.team2, collider2 => {
                    i++;
                    addColliderShow(collider1, collider2);
                });
            });
            console.log("team1 size: %d, team2 size: %d, compare-count: %d", GetCollectionSize(pair.team1), GetCollectionSize(pair.team2), i);
        }
    });
}

function gridmap(sys = null){
    console.log("grids: %d", GetGridMapGridCount(sys.container.gridmap));
    let sum1 = 0;
    GridMapIterator(sys.container.gridmap, grid => {
        //把gridmao画出来
        let gridUnit = NewGameUnit(
            GetGridCenterPos(sys.container.gridmap, grid));
        let deep = grid.deep;
        deep = deep ? deep : 0;
        //描边
        AddRectDebugDisplayer(
            gridUnit.id,
            deep + DEBUG_BORDER_BLACK,
            grid.rect);

        //展示一个两秒闪烁动画
        let action = CreateDurationAction(gridUnit.id, 100, 
            new TmpAction(gridUnit.id, NewRectDisplayer(gridUnit.id, DEBUG_FILL_GREEN, grid.rect)));
        AddToListAction(listAction, action);

        let list = GetGridData(grid);
        let i = 0;
        CollectionIteratorCompare(list, (collider1, collider2) => {
            i++;
            addColliderShow(collider1, collider2);
        });
        console.log("grid list size: %d, compare count: %d", GetCollectionSize(list), i);
        sum1 += i;
    });
    console.log("GridMapIterator count: %d", sum1);

    let sum2 = 0;
    GridMapAdjacentCompare(sys.container.gridmap, (currGrid = null, sideGrid = null) => {
        let deep = currGrid.deep ? currGrid.deep : 0;
        //把gridmao画出来
        let currGridUnit = NewGameUnit(
            GetGridCenterPos(sys.container.gridmap, currGrid));
        //描边
        AddRectDebugDisplayer(
            currGridUnit.id,
            deep + DEBUG_BORDER_BLACK,
            currGrid.rect);

        deep = sideGrid.deep ? sideGrid.deep : 0;
        //把gridmao画出来
        let sideGridUnit = NewGameUnit(
            GetGridCenterPos(sys.container.gridmap, sideGrid));
        //描边
        AddRectDebugDisplayer(
            sideGridUnit.id,
            deep + DEBUG_BORDER_BLACK,
            sideGrid.rect);

        //展示一个两秒闪烁动画
        let action = CreateDurationAction(currGridUnit.id, 500, 
            new TmpAction2(currGridUnit.id, 
                NewRectDisplayer(currGridUnit.id, DEBUG_FILL_GREEN, currGrid.rect),
                NewRectDisplayer(sideGridUnit.id, DEBUG_FILL_GREEN, sideGrid.rect)));
        AddToListAction(listAction, action);


        let list1 = GetGridData(currGrid);
        let list2 = GetGridData(sideGrid);
        let i = 0;
        CollectionIterator(list1, collider1 => {
            CollectionIterator(list2, collider2 => {
                i++;
                addColliderShow(collider1, collider2);
            });
        });
        console.log("grid list1 size: %d, list2 size: %d, compare count: %d", GetCollectionSize(list1), GetCollectionSize(list2), i);
        sum2 += i;
    });
    console.log("GridMapAdjacentCompare count: %d", sum2);

    console.log("gridmap all count: %d", sum1 + sum2);
}

function addColliderShow(collider1 = null, collider2 = null){
    let unit1 = GetGameUnitByClz(collider1);
    let unit2 = GetGameUnitByClz(collider2);

    //展示一个两秒闪烁动画
    let action = CreateDurationAction(unit1.id, 200, 
        new TmpAction2(unit1.id, 
            NewRectDisplayer(unit1.id, DEBUG_FILL_BLUE, collider1.rect, collider1.offset),
            NewRectDisplayer(unit2.id, DEBUG_FILL_YELLOW, collider2.rect, collider2.offset)));
    AddToListAction(listAction, action);
}


class TmpAction extends Action {
    constructor(entityId = 0, ds = null){
        super(entityId);
        this.ds = ds;
    }
    onStart(){
        AddDebugDisplayer(this.ds);
    }
    onCancel(){
        RemoveDebugDisplayer(this.ds.id);
    }
}

class TmpAction2 extends Action {
    constructor(entityId = 0,  ds1 = null, ds2 = null){
        super(entityId);
        this.ds1 = ds1;
        this.ds2 = ds2;
    }
    onStart(){
        AddDebugDisplayer(this.ds1);
        AddDebugDisplayer(this.ds2);
    }
    onCancel(){
        RemoveDebugDisplayer(this.ds1.id);
        RemoveDebugDisplayer(this.ds2.id);
    }
}

export{
    StartGridShowDemo
}