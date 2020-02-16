
class Stack {
	constructor() {
        this.arr = [];
	}
}

function NewStack(){
    return new Stack();
}

function IsEmpty(stack = null){
    return stack.length == 0;
}

/**
 * 插入到第一个元素
 */
function PushInto(obj = null, stack = null){
    stack.arr.unshift(obj);
}

/**
 * 弹出第一个元素
 */
function PopUp(stack = null){
    if(IsEmpty(stack)){
        return;
    }
    return stack.arr.shift();
}

function GetSize(stack = null){
    return stack.length;
}

export {NewStack, IsEmpty, PushInto, PopUp, GetSize}