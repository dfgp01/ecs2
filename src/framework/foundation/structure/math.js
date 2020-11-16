const MAX_INT = 2147483647   //  2^31 - 1 = 2147483647
function GetMaxInt(){
    return MAX_INT;
}

function Abs(val = 0){
    return val >= 0 ? val : -val;
}

function Max(val1 = 0, val2 = 0){
    return val1 > val2 ? val1 : val2;
}

function Min(val1 = 0, val2 = 0){
    return val1 < val2 ? val1 : val2;
}

/**
 * 之前：x < 0 ? Math.ceil(x) : Math.floor(x)
 * 现在：Math.trunc(x)
 * @param {*} num 
 */
function GetInt(num = 0){
    return Math.trunc(num);
}

/**
 * 随机混排，打乱数组 
 */
function ArrayRandomSort(arr = null){
    let results = [];
    while(arr.length > 0){
        let index = Math.floor(Math.random() * arr.length);
        let v = arr.splice(index, 1);
        results.push(v[0]);
    }
    return results;
}

/**
 * 随机取一个 [min, max] 的数
 * @param {*} min 
 * @param {*} max 
 */
function NewRandomBeteen(min = 0, max = 0){
    //Math.random()可返回介于 0（包含） ~ 1（不包含） 之间的一个随机数。
    return min + Math.floor(Math.random() * (max - min + 1));
}

export{
    GetMaxInt, Abs, Max, Min, GetInt,
    ArrayRandomSort, NewRandomBeteen
}