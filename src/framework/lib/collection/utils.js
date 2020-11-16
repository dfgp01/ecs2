/**
 * TODO 临时放着
 */

function GetListFirst(list = null){
    return list.first();
}

function GetListLast(list = null){
    return list.last();
}

/**
 * 头部追加
 * @param {*} list 
 * @param {*} data 
 */
function PressInList(list = null, data = null){
    if(checkAdd(list, data)){
        list.add(data);
    }
}

/**
 * 尾部追加
 * @param {*} list 
 * @param {*} data 
 */
function PushInList(list = null, data = null){
    if(checkAdd(list, data)){
        list.push(data);
    }
}

/**
 * 头部移除
 * @param {*} list 
 */
function RemoveFromListStart(list = null){
    list.pop();
}

/**
 * 尾部移除
 * @param {*} list 
 */
function RemoveFromListEnd(list = null){
    list.pull();
}

/**
 * 队列形式遍历，会删除节点
 * @param {*} list 
 * @param {*} callback 
 */
function ListIteratorQuene(list = null, callback = null){
    if(!list || !callback) {
        //log here
        return
    }
    list.iteratorQuene(callback);
}

/**
 * 堆栈形式遍历，会删除节点
 * @param {*} list 
 * @param {*} callback 
 */
function ListIteratorStack(list = null, callback = null){
    if(!list || !callback) {
        //log here
        return
    }
    list.iteratorStack(callback);
}

export {
    
}