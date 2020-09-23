import { GameObject } from "../../../foundation/component/ecs";

class BlockCollider extends GameObject {
    constructor(entityId = 0, rect = null){
        super();
        this.entityId = entityId;
        this.rect = rect;
    }
}

class BodyCollider extends GameObject {
    constructor(entityId = 0, rect = null){
        super();
        this.entityId = entityId;
        this.rect = rect;
    }
}

export {BlockCollider, BodyCollider}