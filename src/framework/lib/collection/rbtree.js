/**
 * 红黑树
 * 演示工具：https://www.cs.usfca.edu/~galles/visualization/RedBlack.html
 * 相关文章：
 *      https://zhuanlan.zhihu.com/p/79980618?utm_source=cn.wiz.note
 * 
 * 特性：
 *  1.每个节点都有红色或黑色
 *  2.树的根始终是黑色的
 *  3.红色节点不能连续，黑色节点可以连续
 *  4.从节点（包括根）到其任何子节点的每条路径都具有相同数量的黑色节点
 *  5.每个叶子节点都是null，这个其实可以忽略
 * 
 * 主要操作：
 *  recolor (重新标记黑色或红色)
 *  rotation (旋转，这是树达到平衡的关键)
 */

const { AbstractCollection } = require("../../foundation/component/collection");

const NODE_COLOR_BLACK = 2;
const NODE_COLOR_RED = 1;

class Node {
	constructor(weight = 0, data = null) {
		this.data = data;
        this.weight = weight;
        this.color = NODE_COLOR_RED;
        this.left = null;
        this.right = null;
        this.parent = null;
	}
}

function isLeaf(node = null){
    return !node.left && !node.right;
}

class RBTree extends AbstractCollection{
    constructor() {
        super();
        this.root = null;
        this._map = new Map();
        this._size = 0;
        this._delList = [];
        this._curr = null;
        this._lock = false;
    }

    get(id = 0){
        let node = this._map.get(id);
        return node ? node.data : null;
    }

    size(){
        return this._size;
    }

    add(data = null, weight = 0){
        addToTree(this, data, weight);
    }

    remove(id = 0){
        let node = this._map.get(id);
        if(node){
            this._map.delete(id);
            removeWithCheck(this, node);
        }
    }

    iterator(callback = null){
        if(this._size == 0){
            return;
        }
        this._lock = true;
        iteratorDFS(this.root, callback);
        this._lock = false;
        while(this._delList.length > 0){
            removeNode(this, this._delList.pop());
        }
    }

    iteratorReverse(callback = null){
        if(this._size == 0){
            return;
        }
        this._lock = true;
        iteratorDFSReverse(this.root, callback);
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

/**
 * 将新插入的节点标记为红色
    如果 X 是根结点(root)，则标记为黑色
    如果 X 的 parent 不是黑色，同时 X 也不是 root:
    3.1 如果 X 的 uncle (叔叔) 是红色
    3.1.1 将 parent 和 uncle 标记为黑色
    3.1.2 将 grand parent (祖父) 标记为红色
    3.1.3 让 X 节点的颜色与 X 祖父的颜色相同，然后重复步骤 2、3
 */

function addToTree(tree = null, data = null, weight = 0){
    let node = new Node(weight, data);
    if(!tree.root){
        tree.root = node;
        node.color = NODE_COLOR_BLACK;
    }else{
        addChild(tree, node);
    }
    tree._map.set(data.id, node);
    tree._size++;
}

/**
 * 添加子节点的操作，寻找合适的位置，然后递归旋转
 * @param {*} parent 
 * @param {*} node 
 */
function addChild(tree = null, node = null){
    m = new Map();
    addChildRecur(tree.root, node);
    let grand = getLastNodeRecur(node);
    if(grand){
        //rotation(tree, node);     麻痹原来是这里啊啊啊啊啊啊啊啊啊啊啊啊~~~~~~~~~~~~~~~~~~~~~~~~~~~
        rotation(tree, grand);
    }
}

var m = new Map();
function recurCheck(node = null){
    let n = m.get(node);
    if(n){
        console.log(node.data.weight, node.left ? node.left.weight : 0, node.right ? node.right.weight : 0, node.parent ? node.parent.weight : 0);
        return
    }
    m.set(node, 1);
}

/**
 * 如果要严格的每个节点放一个数据，则不能按照weight来进行查找和删除，因为相同的weight可能不止一个
 * 相同weight情况下默认添加到右子节点
 * @param {*} currNode 
 * @param {*} targetWeight 
 */
function addChildRecur(currNode = null, targetNode = null){
    recurCheck(currNode);
    if(currNode.weight > targetNode.weight){
        if(currNode.left){
            addChildRecur(currNode.left, targetNode);
        }else{
            currNode.left = targetNode;
            targetNode.parent = currNode;
        }
    }else{
        if(currNode.right){
            addChildRecur(currNode.right, targetNode);
        }else{
            currNode.right = targetNode;
            targetNode.parent = currNode;
        }
    }
}

function getLastNodeRecur(targetNode = null){
    let parent = targetNode.parent;
    if(!parent){
        //is root
        targetNode.color = NODE_COLOR_BLACK;
        return null;
    }
    if(parent.color == NODE_COLOR_BLACK){
        return null;
    }
    let grandParent = parent.parent;
    let uncle = grandParent.left == parent ? grandParent.right : grandParent.left;
    if(uncle && uncle.color == NODE_COLOR_RED){
        parent.color = NODE_COLOR_BLACK;
        uncle.color = NODE_COLOR_BLACK;
        grandParent.color = NODE_COLOR_RED;
        return getLastNodeRecur(grandParent);
    }
    return targetNode;
}

function rotation(tree = null, targetNode = null){
    //提前准备好相关节点的引用，方便后面的swapXXX函数使用，不要被函数的参数名称迷惑
    let parent = targetNode.parent;     //肯定存在parent，不用作非空检查
    let grandParent = parent.parent;       //肯定存在grandParent，不用作非空检查
    let superGrandParent = grandParent.parent;  //superGrandParent未必有
    
    //旋转
    /**
     * if(targetNode.weight < parent.weight && parent.weight < grandParent.weight)
     * else if(targetNode.weight > parent.weight && parent.weight < grandParent.weight)
     * else if(targetNode.weight > parent.weight && parent.weight > grandParent.weight)
     * 若要兼容重复值，则不能用weight值来判断节点的关系
     */
    if(targetNode == parent.left && parent == grandParent.left){
        //左左，这里只需要以父节点开始处理
        swapFromLeftChild(tree, parent, grandParent, superGrandParent, 1);
    }else if(targetNode == parent.right && parent == grandParent.left){
        //左右
        swapFromRightChild(tree, targetNode, parent, grandParent);
        swapFromLeftChild(tree, targetNode, grandParent, superGrandParent, 1);
        
    }else if(targetNode == parent.right && parent == grandParent.right){
        //右右，这里只需要以父节点开始处理
        swapFromRightChild(tree, parent, grandParent, superGrandParent, 1);
    }else{
        //右左
        swapFromLeftChild(tree, targetNode, parent, grandParent);
        swapFromRightChild(tree, targetNode, grandParent, superGrandParent, 1);
    }
}

/**
 * 左节点和它的父亲交换
 */
function swapFromLeftChild(tree = null, childNode = null, parent = null, grandParent = null, checkFlag = 0){
    //parent.parent = childNode;
    parent.left = childNode.right;
    childNode.right = parent;
    //childNode.parent = grandParent;
    swapPointer(tree, childNode, parent, grandParent, checkFlag);
}

/**
 * 右节点和它的父亲交换，又称右旋
 */
function swapFromRightChild(tree = null, childNode = null, parent = null, grandParent = null, checkFlag = 0){
    //parent.parent = childNode;
    parent.right = childNode.left;
    childNode.left = parent;
    //childNode.parent = grandParent;
    swapPointer(tree, childNode, parent, grandParent, checkFlag);
}

/**
 * 交换收尾工作
 */
function swapPointer(tree = null, childNode = null, parent = null, grandParent = null, checkFlag = 0){
    parent.parent = childNode;
    childNode.parent = grandParent;
    if(checkFlag){
        parent.color = NODE_COLOR_RED;
        childNode.color = NODE_COLOR_BLACK;
        if(!grandParent){
            tree.root = childNode;
            return
        }
    }
    //若checkFlag==0，说明是叶子节点在旋转，那么grandParent是肯定存在，且不用修改颜色
    //if(grandParent.weight > childNode.weight){
    if(grandParent.left == parent){
        grandParent.left = childNode;
    }else{
        grandParent.right = childNode;
    }
}

/**
 * 顺序遍历
 */
function iteratorDFS(node = null, callback = null){
    if(node.left){
        iteratorDFS(node.left, callback);
    }
    callback(node.data);
    if(node.right){
        iteratorDFS(node.right, callback);
    }
}

function iteratorDFSReverse(node = null, callback = null){
    if(node.right){
        iteratorDFS(node.right, callback);
    }
    if(node.left){
        iteratorDFS(node.left, callback);
    }
    callback(node.data);
}

function NewRedBlackTree(){
    return new RBTree();
}

/**
 * 临时的，仅为演示用，不用在意
 * @param {*} tree 
 * @param {*} callback 
 */
function IteratorForShow(tree = null, callback = null){
    iterShow(tree.root, callback, 1);
}

function iterShow(node = null, callback = null, deep = 0, index = 0, dirFlag = 0){
    if(node.left){
        iterShow(node.left, callback, deep + 1, index*2, 1);
    }
    if(node.right){
        iterShow(node.right, callback, deep + 1, index*2+1, 2);
    }
    callback(node.data, node.color, deep, index, dirFlag);
}

export {
    NewRedBlackTree, IteratorForShow
}