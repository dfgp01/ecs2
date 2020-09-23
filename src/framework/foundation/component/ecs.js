
/**
 * 每一种新类对应一个ID，便于回收
 */
var clzId = 1;
function NextClassId(){
	return clzId++;
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
 * 每个实体拥有一个独立ID
 */
var entityId = 1;
function NewEntityId(){
	return entityId++;
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
 * 元件，命名待定
 */
class UnitComponent extends GameObject {
	constructor(entityId = 0) {
		super();
		this.entityId = entityId;
	}
}

function GetOwnerId(unitComponent = null){
	return unitComponent.entityId;
}

/**
*	The base System
*/
class System extends GameObject{
	constructor(priority = 0){
		super();
		this.priority = priority;
	}
    onStart(){}
    onUpdate(dt = 0){}
    onEnd(){}
}

function GetSystemPriority(system = null){
	return system.priority;
}

export {
	NewEntityId, GameObject, Component, UnitComponent, GetOwnerId, System, GetSystemPriority
}