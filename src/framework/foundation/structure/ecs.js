
/**
 * 每一种新类对应一个ID，便于回收
 */
var clzId = 1;
function NextClassId(){
	return clzId++;
}

/**
 * 每个实体拥有一个独立ID
 */
var entityId = 1;
function NewEntityId(){
	return entityId++;
}

/**
 * 暂定这个名
 */
class DFClass {
	constructor(clzId = 0) {
		this.clzId = clzId;
	}
}

/**
 * 拥有id属性的都继承此类，即ECS中的Entity
 */
class GameObject {
	constructor() {
		this.id = NewEntityId();
	}
}

/**
*	The base Component
*	每个entity对每种组件只能持有一个
*/
class Component {
	constructor(entityId = 0) {
		this.entityId = entityId;
		this.id = entityId;			//给link使用
	}
}

/**
 * 基础元件
 * TODO 暂时没什么用
 */
class Tuple {
	constructor(entityId = 0, priority = 0){
		this.id = NewEntityId();
		this.entityId = entityId;
		this.priority = priority;	//给link使用
	}
}

/**
*	The base System
*/
class System {
	constructor(){
		this.id = NewEntityId();
	}
    onStart(){}
    onUpdate(dt = 0){}
    onEnd(){}
}

export {Entity, Component, Tuple, System}