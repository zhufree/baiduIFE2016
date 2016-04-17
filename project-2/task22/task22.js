function Node(data) {
    this.data = data;
    this.parent = null;
    this.lchild = null;
    this.rchild = null;
}

function render(node) {
    curDiv = document.createElement('div');
    curDiv.setAttribute('id', node.data);
    curDiv.setAttribute('class', 'node');
    curDiv.style.height = node.parent ? '50%' : '200px';
    // curDiv.innerText = node.data;
    curPar = node.parent ? document.getElementById(node.parent.data) : document.body;
    curPar.appendChild(curDiv);
}

function light(node) {
    curDiv = document.getElementById(node.data);
    curDiv.style.color = '#f00';
    console.log('1');
}

function delight(node) {
    curDiv = document.getElementById(node.data);
    // setTimeout("curDiv.style.color = '#ccc';", 1000);
    curDiv.style.color = '#ccc';
    console.log('2');
}

function Tree(node) {
    // var node = new Node(data);
    this._root = node;
}

Tree.prototype.preOrder = function(node) {
    if (node) {
        light(node);
        setTimeout(delight(node), 2000);
        this.preOrder(node.lchild);
        this.preOrder(node.rchild);
    }
}

Tree.prototype.inOrder = function(node) {
    if (node) {
        this.inOrder(node.lchild);
        light(node);
        // delight(node);
        // setTimeout(function(){delight(node);}, 2000);
        setTimeout("delight('" + node + "')", 2000);
        this.inOrder(node.rchild);
    }
}

Tree.prototype.postOrder = function(node) {
    if (node) {
        this.postOrder(node.lchild);
        this.postOrder(node.rchild);
        light(node);
        setTimeout(delight(node), 2000);
    }
}

var nodeList = new Array(7);
for (var i = 0; i < nodeList.length; i++) {
    nodeList[i] = new Node(i);
};

nodeList[1].lchild = nodeList[3];
nodeList[1].rchild = nodeList[4];
nodeList[3].parent = nodeList[1];
nodeList[4].parent = nodeList[1];

nodeList[2].lchild = nodeList[5];
nodeList[2].rchild = nodeList[6];
nodeList[5].parent = nodeList[2];
nodeList[6].parent = nodeList[2];

nodeList[0].lchild = nodeList[1];
nodeList[0].rchild = nodeList[2];
nodeList[1].parent = nodeList[0];
nodeList[2].parent = nodeList[0];

for (var i = 0; i < nodeList.length; i++) {
    render(nodeList[i]);
};

var tree = new Tree(nodeList[0]);
tree.preOrder(nodeList[0]);