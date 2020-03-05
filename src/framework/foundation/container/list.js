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
    remove(id = 0){}      //根据id移除
    iterator(callback = null){}
    iteratorReverse(callback = null){}
    iteratorCompare(callback = null){}
}

function GetListData(list = null, id = 0, required = false){
    let data = list.get(id);
    if(!data && required){
        console.error("can't find keyId: ", id);
    }
    return data;
}

function GetListFirst(list = null){
    return list.first();
}

function GetListLast(list = null){
    return list.last();
}

function GetListSize(list = null){
    return list.size();
}

function checkAdd(list = null, data = null){
    if(!list || !data || !data.id){
        console.error("error param.");
        return false;
    }
    //不能重复添加
    let d = GetListData(list, id);
    if(d){
        console.error("error id:%d is exist", id);
        return false;
    }
    return true;
}

/**
 * 尾部追加
 * @param {*} list 
 * @param {*} data 
 */
function AddToList(list = null, data = null){
    if(checkAdd(list, data)){
        list.add(data);
    }
}

/**
 * 头部追加
 * @param {*} list 
 * @param {*} data 
 */
function PushToList(list = null, data = null){
    if(checkAdd(list, data)){
        list.push(data);
    }
}

/**
 * 根据顺序号插入
 * @param {*} list 
 * @param {*} data 
 * @param {*} order 
 */
function InsertToList(list = null, data = null, order = 0){
    if(checkAdd(list, data)){
        list.insert(data, order);
    }
}

/**
 * 头部移除
 * @param {*} list 
 */
function PopFromList(list = null){
    list.pop();
}

/**
 * 尾部移除
 * @param {*} list 
 */
function PullFromList(list = null){
    list.pull();
}

/**
 * 根据id移除
 * @param {*} list 
 * @param {*} id 
 */
function RemoveFromList(list = null, id = 0){
    list.remove(id);
}

/**
 * 正向遍历
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

/**
 * 反向遍历
 * @param {*} list 
 * @param {*} callback 
 */
function ListIteratorReverse(list = null, callback = null){
    if(!list || !callback) {
        //log here
        return
    }
    list.iteratorReverse(callback);
}

/**
 * 内部依次对比
 * @param {*} list 
 * @param {*} callback func(data1, data2) return bool 若bool=true，则终止遍历
 */
function ListIteratorCompare(list = null, callback = null){
    if(!link || !callback) {
        //log here
        return
    }
    list.iteratorCompare(callback);
}

export {
    AbstractList,
    GetListData, GetListFirst, GetListLast, GetListSize, 
    AddToList, PushToList, InsertToList, PopFromList, PullFromList, RemoveFromList,
    ListIterator, ListIteratorReverse, ListIteratorCompare
}