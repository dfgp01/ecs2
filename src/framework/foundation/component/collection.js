
/**
 * 抽象集合容器
 */
class AbstractCollection {
    get(id = 0){}          //根据id获得
    size(){}                //返回长度
    add(data = null, weight = 0){}    //插入到指定顺序，weight越大越靠前，相同weight间的先后顺序看具体实现逻辑，data必须有id
    remove(id = 0){}      //根据id移除
    iterator(callback = null){}
    iteratorReverse(callback = null){}
    iteratorCompare(callback = null){}
}

function GetCollectionData(collection = null, id = 0, required = false){
    let data = collection.get(id);
    if(!data && required){
        console.error("can't find keyId: ", id);
    }
    return data;
}

function GetCollectionSize(collection = null){
    return collection.size();
}

function checkAdd(list = null, data = null){
    if(!list || !data || !data.id){
        console.error("error param.");
        return false;
    }
    //不能重复添加
    let d = GetCollectionData(list, data.id);
    if(d){
        console.error("error id:%d is exist", data.id);
        return false;
    }
    return true;
}

/**
 * 随机插入
 */
function AddToCollection(collection = null, data = null, weight = 0){
    if(!checkAdd(collection, data)){
        return
    }
    collection.add(data, weight);
}

/**
 * 根据id移除
 */
function RemoveFromCollection(collection = null, id = 0){
    collection.remove(id);
}

/**
 * 正向遍历
 * @param {*} collection 
 * @param {*} callback func(data){ return bool} 若bool=true，则终止遍历
 */
function CollectionIterator(collection = null, callback = null){
    if(!collection || !callback) {
        //log here
        return
    }
    collection.iterator(callback);
}

/**
 * 反向遍历
 * @param {*} collection 
 * @param {*} callback 
 */
function CollectionIteratorReverse(collection = null, callback = null){
    if(!collection || !callback) {
        //log here
        return
    }
    collection.iteratorReverse(callback);
}

/**
 * 内部依次对比
 * @param {*} collection 
 * @param {*} callback func(data1, data2) return bool 若bool=true，则终止遍历
 */
function CollectionIteratorCompare(collection = null, callback = null){
    if(!collection || !callback) {
        //log here
        return
    }
    collection.iteratorCompare(callback);
}

export {
    AbstractCollection,
    GetCollectionData, GetCollectionSize, 
    AddToCollection, RemoveFromCollection,
    CollectionIterator, CollectionIteratorReverse, CollectionIteratorCompare
}