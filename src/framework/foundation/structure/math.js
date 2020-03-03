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

export{
    GetMaxInt, Abs, Max, Min, GetInt
}