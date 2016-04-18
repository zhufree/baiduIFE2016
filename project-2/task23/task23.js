function Node(data) {
    this.data = data;
    this.parent = null;
    this.children = [];
}

Node.prototype.addChild = function() {
    console.log(arguments);
    for (var i = 0; i < arguments.length; i++) {
        this.children.push(arguments[i]);
        arguments[i].parent = this;
    };
}

function Tree(node) {
    // var node = new Node(data);
    this._root = node;
}

function render(node) {
    var curDiv = document.createElement('div');
    curDiv.setAttribute('id', node.data);
    curDiv.setAttribute('class', 'node');
    curDiv.innerText = node.data;
    curDiv.textContent = node.data;
    curDiv.style.height = node.parent ? '50%' : '200px';
    var curPar = node.parent ? document.getElementById(node.parent.data) : document.body;
    curPar.appendChild(curDiv);
}

function blink(node, num, kw) {
    var curDiv = document.getElementById(node.data);
    setTimeout(function(){
        curDiv.style.backgroundColor = '#f00';
    }, 500 * num);
    if (node.data != kw){
        setTimeout(function(){
            curDiv.style.backgroundColor = '#eee';
        }, 500 * num+500);
    } else {
         setTimeout(function(){
            curDiv.style.backgroundColor = '#0f0';
        }, 500 * num+500);
    }
}

var j = 0;

Tree.prototype.preOrder = function(node, callback, kw) {
    if (node) {
        j += 1;
        callback(node, j, kw);
        for (var i = 0; i < node.children.length; i++) {
            this.preOrder(node.children[i], callback, kw);
        };
    }
}

Tree.prototype.postOrder = function(node, callback, kw) {
    if (node) {
        for (var i = 0; i < node.children.length; i++) {
            this.postOrder(node.children[i], callback, kw);
        };
        j += 1;
        callback(node, j, kw);
    }
};

var nodeList = new Array(10);
for (var i = 0; i < nodeList.length; i++) {
    nodeList[i] = new Node(i);
};

nodeList[1].addChild(nodeList[4]);
nodeList[2].addChild(nodeList[5], nodeList[6]);
nodeList[3].addChild(nodeList[7], nodeList[8], nodeList[9]);
nodeList[0].addChild(nodeList[1], nodeList[2], nodeList[3]);

for (var i = 0; i < nodeList.length; i++) {
    render(nodeList[i]);
};

var tree = new Tree(nodeList[0]);
dom = {
    preOBtn: document.getElementById('pre-order'),
    postOBtn: document.getElementById('post-order'),
    searchInp: document.getElementById('search-inp'),
    preSBtn: document.getElementById('pre-search'),
    postSBtn: document.getElementById('post-search'),
};

dom.preOBtn.onclick = function(){
    tree.preOrder(nodeList[0], blink);
    j = 0;
}

dom.postOBtn.onclick = function(){
    tree.postOrder(nodeList[0], blink);
    j = 0;
}

dom.preSBtn.onclick = function(){
    var kw = dom.searchInp.value;
    tree.preOrder(nodeList[0], blink, kw);
    j = 0;
}

dom.postSBtn.onclick = function(){
    var kw = dom.searchInp.value;
    tree.postOrder(nodeList[0], blink, kw);
    j = 0;
}
