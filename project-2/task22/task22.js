function Node(data) {
    this.data = data;
    this.parent = null;
    this.lchild = null;
    this.rchild = null;
    this.addChild = function(lchild, rchild) {
        this.lchild = lchild;
        this.rchild = rchild;
        lchild.parent = this;
        rchild.parent = this;
    }
}

function Tree(node) {
    // var node = new Node(data);
    this._root = node;
}

function render(node) {
    var curDiv = document.createElement('div');
    curDiv.setAttribute('id', node.data);
    curDiv.setAttribute('class', 'node');
    curDiv.style.height = node.parent ? '50%' : '200px';
    var curPar = node.parent ? document.getElementById(node.parent.data) : document.body;
    curPar.appendChild(curDiv);
}

function blink(node, num) {
    var curDiv = document.getElementById(node.data);
    setTimeout(function(){
        curDiv.style.backgroundColor = '#f00';
        console.log('1');
    }, 500 * num);
    setTimeout(function(){
        curDiv.style.backgroundColor = '#eee';
        console.log('2');
    }, 500 * num+500);
}

var j = 0;

Tree.prototype.preOrder = function(node) {
    if (node) {
        j += 1;
        blink(node, j);
        this.preOrder(node.lchild);
        this.preOrder(node.rchild);
    }
}

Tree.prototype.inOrder = function(node) {
    if (node) {
        this.inOrder(node.lchild);
        j += 1;
        blink(node, j);
        this.inOrder(node.rchild);
    }
}

Tree.prototype.postOrder = function(node) {
    if (node) {
        this.postOrder(node.lchild);
        this.postOrder(node.rchild);
        j += 1;
        blink(node, j);
    }
}

var nodeList = new Array(7);
for (var i = 0; i < nodeList.length; i++) {
    nodeList[i] = new Node(i);
};

nodeList[1].addChild(nodeList[3], nodeList[4]);
nodeList[2].addChild(nodeList[5], nodeList[6]);
nodeList[0].addChild(nodeList[1], nodeList[2]);

for (var i = 0; i < nodeList.length; i++) {
    render(nodeList[i]);
};

var tree = new Tree(nodeList[0]);
dom = {
    preBtn: document.getElementById('pre-order'),
    inBtn: document.getElementById('in-order'),
    postBtn: document.getElementById('post-order')
};

dom.preBtn.onclick = function(){
    tree.preOrder(nodeList[0]);
    j = 0;
}
dom.inBtn.onclick = function(){
    tree.inOrder(nodeList[0]);
    j = 0;
}
dom.postBtn.onclick = function(){
    tree.postOrder(nodeList[0]);
    j = 0;
}
