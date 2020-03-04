class LinkNode {
	constructor(data = null, prep = null, next = null, order = 0) {
		this.data = data;
		this.prep = prep;
        this.next = next;
        this.order = order;
	}
}

class LinkList extends AbstractList {
	constructor() {
		this.head = new LinkNode();		//empty data node
		this.tail = new LinkNode();
		this.head.next = this.tail;
		this.tail.prep = this.head;
		this._map = new Map();
		this._size = 0;
        this._delList = [];
        this._curr = this.head;
        this._lock = false;
    }
    
    get(id = 0){
        let node = this._map.get(id);
        return node ? node.data : null;
    }

    first(){
        let node = this.head.next;
        return node == this.tail ? null : node.data;
    }

    last(){
        let node = this.tail.prep;
        return node == this.head ? null : node.data;
    }

    size(){
        return this._size;
    }

    add(data = null){
        addToLink(this, data, this.tail);
    }

    push(data = null){
        addToLink(this, data, this.head.next);
    }

    insert(data = null, order = 0){
        let node = this.head.next;
        while(node != this.tail){
            if(order < node.order){
                break;
            }
            node = node.next;
        }
        addToLink(this, data, node, order);
    }

    pop(){
        removeWithCheck(this, this.head.next);
    }

    pull(){
        removeWithCheck(this, this.tail.prep);
    }

    remove(id = 0){
        removeWithCheck(this, this._map.get(id));
    }

    iterator(callback = null){
        this._lock = true;
        let node = this.head.next;
        while(node != this.tail){
            if(callback(node.data)){
                break;
            }
            node = node.next;
        }
        this._lock = false;
        while(this._delList.length > 0){
            removeNode(this, this._delList.pop());
        }
    }

    iteratorReverse(callback = null){
        this._lock = true;
        let node = this.tail.prep;
        while(node != this.head){
            if(callback(node.data)){
                break;
            }
            node = node.prep;
        }
        this._lock = false;
        while(this._delList.length > 0){
            removeNode(this, this._delList.pop());
        }
    }

    iteratorCompare(callback = null){
        this._lock = true;
        let outNode = this.head.next;
        while(outNode != this.tail){
            let inNode = outNode.next;
            while(inNode != this.tail){
                if(callback(outNode.data, inNode.data)){
                    break;
                }
                inNode = inNode.next;
            }
            outNode = outNode.next;
        }
        this._lock = false;
        while(this._delList.length > 0){
            removeNode(this, this._delList.pop());
        }
    }
}

function addToLink(link = null, data = null, next = null, order = 0){
    //新节点连接
    let prep = next.prep;
    let node = new LinkNode(data, prep, next, order);
    prep.next = node;
    next.prep = node;

    link._map.set(data.id, node);
    link._size++;
}

function removeWithCheck(link = null, targetNode = null){
    if(!link || !targetNode || link._size <= 0){
        return;
    }
    if(link._lock){
        link._delList.push(targetNode);
        return;
    }
    removeNode(link, targetNode);
}

function removeNode(link = null, node = null){
    link._map.delete(keyId);
    let p = node.prep;
    let n = node.next;
    p.next = n;
    n.prep = p;
    link._size--;
}

export {
    LinkList
}