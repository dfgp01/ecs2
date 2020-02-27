/**
 * 抽象列表操作
 */
class AbstractList {
    constructor(){}
    get(id = 0){}          //根据id获得
    firsr(){}
    last(){}
    size(){}                //返回长度
    add(data = null){}      //尾部追加
    push(data = null){}     //头部追加
    insert(data = null, order = 0){}    //插入到指定顺序，相同order间的先后顺序看具体实现逻辑
    pop(){}               //移除头部元素
    pull(){}              //移除尾部元素
    shift(id = 0){}      //根据id移除
    iterator(callback = null){}
    iteratorReverse(callback = null){}
    iteratorCompare(callback = null){}
}

/**
 * ########### 工厂方法
 */
function NewLink(){
    return new LinkList();
}

function GetData(list = null, id = 0, required = false){
    let data = list.get(id);
    if(!data && required){
        console.error("can't find keyId: ", id);
    }
    return data;
}

function GetFirst(list = null){
    return list.first();
}

function GetLast(list = null){
    return list.last();
}

function GetSize(list = null){
    return list.size();
}

function checkAdd(list = null, data = null){
    if(!list || !data || !data.id){
        console.error("error param.");
        return false;
    }
    //不能重复添加
    let d = GetData(list, id);
    if(d){
        console.error("error id:%d is exist", id);
        return false;
    }
    return true;
}

function AddData(list = null, data = null){
    if(checkAdd(list, data)){
        list.add(data);
    }
}

function PushData(list = null, data = null){
    if(checkAdd(list, data)){
        list.push(data);
    }
}

function InsertData(list = null, data = null, order = 0){
    if(checkAdd(list, data)){
        list.insert(data, order);
    }
}

function PopData(list = null){
    list.pop();
}

function PullData(list = null){
    list.pull();
}

function ShiftData(list = null, id = 0){
    list.shift(id);
}

/**
 * 
 * @param {*} list 
 * @param {*} callback func(data){ return bool} 若bool=true，则终止遍历
 */
function ListIterator(list = null, callback = null){
    if(!list || !callback) {
        //log here
        return
    }
    list.iterator(callback);
}

function ListIteratorReverse(list = null, callback = null){
    if(!list || !callback) {
        //log here
        return
    }
    list.iteratorReverse(callback);
}

/**
 * 
 * @param {*} list 
 * @param {*} callback func(data1, data2) 若bool=true，则终止遍历
 */
function ListIteratorCompare(list = null, callback = null){
    if(!link || !callback) {
        //log here
        return
    }
    list.iteratorCompare(callback);
}

export {
    AbstractList, NewLink,
    GetData, GetFirst, GetLast, GetSize, 
    AddData, PushData, InsertData, PopData, PullData, ShiftData, 
    ListIterator, ListIteratorReverse, ListIteratorCompare
}