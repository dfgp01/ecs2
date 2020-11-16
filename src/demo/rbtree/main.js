import { GetScreenHeight, GetScreenWidth } from "../../framework/director/service/resource";
import { StartTest } from "../../framework/director/utils/boot";
import { GameObject } from "../../framework/foundation/component/ecs";
import { DEBUG_BORDER_GREEN, DEBUG_BORDER_WHITE, DEBUG_FILL_BLACK, DEBUG_FILL_RED, DEBUG_FILL_YELLOW } from "../../framework/foundation/const";
import { NewRect, NewVec } from "../../framework/foundation/structure/geometric";
import { GetInt, NewRandomBeteen, ArrayRandomSort } from "../../framework/foundation/structure/math";
import { Action, GetRunnigActionList, RunAction } from "../../framework/lib/actions/base";
import { NewLinkList } from "../../framework/lib/collection/linklist";
import { NewGameUnit } from "../../framework/lib/unit/utils";
import { AddLineDebugDisplayer, AddRectDebugDisplayer, AddTextDebugDisplayer, RemoveDebugDisplayer } from "../../framework/lib/view/utils";
import data from './data';

const { AddToCollection, CollectionIterator, GetCollectionSize } = require("../../framework/foundation/component/collection");
const { NewTimeoutAction } = require("../../framework/lib/actions/time");
const { NewRepeatAction, NewListAction } = require("../../framework/lib/actions/wrap");
const { NewRedBlackTree, IteratorForShow } = require("../../framework/lib/collection/rbtree");

//谨记数据驱动，分清业务配置和框架逻辑配置
var options = data;

function StartRBTreeDemo(){
    console.log(options);
    StartTest(options, new RBTreeShowScene());
}

class RBTreeShowScene {
    onStart(){
        Starter();
    }
    onUpdate(dt = 0){
    }
}

var tree = NewRedBlackTree()

var index = 0;
var aaa = [];

function Starter(){
    let count = 50;
    for(let i=1; i<=count; i++){
        aaa.push(i);
    }
    aaa = ArrayRandomSort(aaa);
    console.log(aaa);

    let actions = [
        NewRepeatAction(9999, count - 2, NewTimeoutAction(999, 100, new AddNodeAction())),
        NewTimeoutAction(999, 5000, new AddNodeAction())
    ];
    RunAction(
        NewListAction(9999, actions));

    //NewRandomBeteen(1, 100)
    //aaa[i]

    // for(let i = 0; i < count; i++){
    //     let d = new ShowNode(NewRandomBeteen(1, 100));
    //     AddToCollection(tree, d, d.weight);
    // }
    // let arr = [];
    // CollectionIterator(tree, d => {
    //     arr.push(d.weight)
    // });
    // console.log(arr);
}

class ShowNode extends GameObject {
    constructor(weight = 0){
        super();
        this.weight =weight;
    }
}

var i = 1;
class AddNodeAction extends Action{
    constructor(){
        super(99);
    }
    onStart(){
        // aaa[index++];
        // NewRandomBeteen(1, 100)
        let sn = new ShowNode(aaa[index++]);
        AddToCollection(tree, sn, sn.weight);
        refreshTree();

        let arr = [];
        CollectionIterator(tree, d => {
            arr.push(d.weight)
        });
        console.log(arr);
    }
    endCondition(){
        return true;    //注意这里，机制可能要改
    }
}

var debugList = NewLinkList();
function refreshTree(){
    CollectionIterator(debugList, d => {
        RemoveDebugDisplayer(d.id);
    });
    let u = NewGameUnit();
    IteratorForShow(tree, (sn, color, deep, index, dirFlag) => {
        let nodeCount = Math.pow(2, deep-1);
        let gridWidth = GetScreenWidth() / nodeCount;
        let offsetX = -GetScreenWidth() * 0.5 + (index + 0.5) * gridWidth;
        let offsetY = -GetScreenHeight() * 0.5 + deep * 80;
        let style = color == 1 ? DEBUG_FILL_RED : DEBUG_FILL_BLACK;
        
        if(dirFlag > 0){
            let offsetEndX = -GetScreenWidth() * 0.5 + (GetScreenWidth() / (nodeCount / 2)) * (GetInt(index/2) + 0.5);
            let offsetEndY = -GetScreenHeight() * 0.5 + (deep-1) * 80;
            AddToCollection(debugList, 
                AddLineDebugDisplayer(u.id, DEBUG_BORDER_GREEN, NewVec(offsetEndX, offsetEndY), NewVec(offsetX, offsetY)));
        }
        AddToCollection(debugList, 
            AddRectDebugDisplayer(u.id, style, NewRect(20, 20), NewVec(offsetX, offsetY)));
        AddToCollection(debugList, 
            AddTextDebugDisplayer(u.id, DEBUG_FILL_YELLOW, sn.weight, NewVec(offsetX, offsetY)));
    });
}

export{
    StartRBTreeDemo 
}