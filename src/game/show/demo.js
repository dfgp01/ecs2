import { CreateGameUnit } from "../../framework/director/utils/boot";
import { CreateDurationAction } from "../../framework/lib/actions/utils";

const { RunAction } = require("../../framework/director/utils/action");
const { Action } = require("../../framework/foundation/component/action");
const { DEBUG_FILL_GREEN, DEBUG_FILL_BLUE, DEBUG_FILL_BLACK, DEBUG_BORDER_BLACK, DEBUG_FILL_YELLOW, DEBUG_FILL_GREENBLUE } = require("../../framework/foundation/const");
const { GetGridMapGridCount, GetGridWidth, GetGridHeight, GetGridCenterPos, GridMapIterator, GetGridData, GridMapAdjacentCompare } = require("../../framework/foundation/container/gridmap");
const { ListIteratorCompare, GetListSize, ListIterator } = require("../../framework/foundation/container/list");
const { NewRect } = require("../../framework/foundation/structure/geometric");
const { NewRectOffsetRelation } = require("../../framework/foundation/unit/rect");
const { NewListAction, AddToListAction } = require("../../framework/lib/actions/multi/list");
const { GetColliderRectOR, GetColliderCenterPos } = require("../../framework/lib/collide/base");
const { GetGridMapColliderSystem } = require("../../framework/lib/collide/gridmap/base");
const { GetGroupColliderSystem } = require("../../framework/lib/collide/list/group");
const { GetNormalColliderSystem } = require("../../framework/lib/collide/list/normal");
const { GetColliderSystem } = require("../../framework/lib/collide/utils/boot");
const { AddDebugDisplayer, RemoveDebugDisplayer } = require("../../framework/lib/view/utils");

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
    let size = GetListSize(sys.container.list);
    let i = 0;
    ListIteratorCompare(sys.container.list, (collider1, collider2) => {
        i++;
        addColliderShow(collider1, collider2);
    });
    console.log("normal list size: %d, compare-count: %d", size, i);
}

function group(sys = null){
    let size = GetListSize(sys.container.pairs);
    console.log("group pairs: %d", size);
    ListIterator(sys.container.pairs, pair => {
        let i = 0;
        if(!pair.team2){
            //one team
            ListIteratorCompare(pair.team1, (collider1, collider2) => {
                i++;
                addColliderShow(collider1, collider2);
            });
            console.log("one team size: %d, compare-count: %d", GetListSize(pair.team1), i);
        }else{
            //two team
            ListIterator(pair.team1, collider1 => {
                ListIterator(pair.team2, collider2 => {
                    i++;
                    addColliderShow(collider1, collider2);
                });
            });
            console.log("team1 size: %d, team2 size: %d, compare-count: %d", GetListSize(pair.team1), GetListSize(pair.team2), i);
        }
    });
}

function gridmap(sys = null){
    console.log("grids: %d", GetGridMapGridCount(sys.container.gridmap));
    let sum1 = 0;
    GridMapIterator(sys.container.gridmap, grid => {
        //把gridmao画出来
        let pos = GetGridCenterPos(sys.container.gridmap, grid);
        let deep = grid.deep;
        deep = deep ? deep : 0;
        let rectOR = NewRectOffsetRelation(
            NewRect(
                GetGridWidth(grid), GetGridHeight(grid)
            )
        );
        AddDebugDisplayer(CreateGameUnit(pos).id, rectOR, deep + DEBUG_BORDER_BLACK);

        //加到action里
        addGridShow(sys.container.gridmap, grid, 100);
        let list = GetGridData(grid);
        let i = 0;
        ListIteratorCompare(list, (collider1, collider2) => {
            i++;
            addColliderShow(collider1, collider2);
        });
        console.log("grid list size: %d, compare count: %d", GetListSize(list), i);
        sum1 += i;
    });
    console.log("GridMapIterator count: %d", sum1);

    let sum2 = 0;
    GridMapAdjacentCompare(sys.container.gridmap, (currGrid = null, sideGrid = null) => {
        addGridShow2(sys.container.gridmap, currGrid, sideGrid, 500);

        let list1 = GetGridData(currGrid);
        let list2 = GetGridData(sideGrid);
        let i = 0;
        ListIterator(list1, collider1 => {
            ListIterator(list2, collider2 => {
                i++;
                addColliderShow(collider1, collider2);
            });
        });
        console.log("grid list1 size: %d, list2 size: %d, compare count: %d", GetListSize(list1), GetListSize(list2), i);
        sum2 += i;
    });
    console.log("GridMapAdjacentCompare count: %d", sum2);

    console.log("gridmap all count: %d", sum1 + sum2);
}

function addGridShow(gridmap = null, grid = null, time = 0){
    let rectOR = NewRectOffsetRelation(
        NewRect(
            GetGridWidth(grid), GetGridHeight(grid)
        )
    );
    let pos = GetGridCenterPos(gridmap, grid);
    let u = CreateGameUnit(pos);

    //展示一个两秒动画
    let action = CreateDurationAction(u.id, time, new TmpAction(u.id, rectOR, DEBUG_FILL_GREEN));
    AddToListAction(listAction, action);
}

function addGridShow2(gridmap = null, grid1 = null, grid2 = null, time = 0){
    let rectOR = NewRectOffsetRelation(
        NewRect(
            GetGridWidth(grid1), GetGridHeight(grid1)
        )
    );
    let pos = GetGridCenterPos(gridmap, grid1);
    let u = CreateGameUnit(pos);

    let rectOR2 = NewRectOffsetRelation(
        NewRect(
            GetGridWidth(grid2), GetGridHeight(grid2)
        )
    );
    let pos2 = GetGridCenterPos(gridmap, grid2);
    let u2 = CreateGameUnit(pos2);

    //展示一个两秒动画
    let action = CreateDurationAction(u.id, time, new TmpAction2(u.id, rectOR, DEBUG_FILL_GREEN, u2.id, rectOR2, DEBUG_FILL_GREENBLUE));
    AddToListAction(listAction, action);
}

function addColliderShow(collider1 = null, collider2 = null){
    let rectOR = GetColliderRectOR(collider1);
    let pos = GetColliderCenterPos(collider1);
    let u = CreateGameUnit(pos);

    let rectOR2 = GetColliderRectOR(collider2);
    let pos2 = GetColliderCenterPos(collider2);
    let u2 = CreateGameUnit(pos2);

    //展示一个两秒动画
    let action = CreateDurationAction(u.id, 200, new TmpAction2(u.id, rectOR, DEBUG_FILL_BLUE, u2.id, rectOR2, DEBUG_FILL_YELLOW));
    AddToListAction(listAction, action);
}


class TmpAction extends Action {
    constructor(entityId = 0,  rectOR = null, style = 0){
        super(entityId);
        this.rectOR = rectOR;
        this.style = style;
        this._ds = null;
    }
    onStart(){
        this._ds = AddDebugDisplayer(this.entityId, this.rectOR, this.style);
    }
    onCancel(){
        RemoveDebugDisplayer(this._ds.id);
    }
}

class TmpAction2 extends Action {
    constructor(entityId = 0,  rectOR1 = null, style1 = 0, entityId2 = 0,  rectOR2 = null, style2 = 0){
        super(entityId);
        this.rectOR1 = rectOR1;
        this.style1 = style1;
        this.entityId2 = entityId2;
        this.rectOR2 = rectOR2;
        this.style2 = style2;
        this._ds = null;
        this._ds2 = null;
    }
    onStart(){
        this._ds = AddDebugDisplayer(this.entityId, this.rectOR1, this.style1);
        this._ds2 = AddDebugDisplayer(this.entityId2, this.rectOR2, this.style2);
    }
    onCancel(){
        RemoveDebugDisplayer(this._ds.id);
        RemoveDebugDisplayer(this._ds2.id);
    }
}

export{
    ShowAnimate
}