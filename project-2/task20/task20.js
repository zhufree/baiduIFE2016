var arr = [];
var result = [];
var showBox = document.getElementById('showBox');
var inLeft = document.getElementById('inLeft');
var inRight = document.getElementById('inRight');
var outLeft = document.getElementById('outLeft');
var outRight = document.getElementById('outRight');
var inp = document.getElementById('inp');
var sortBtn = document.getElementById('sort');
var searchBtn = document.getElementById('search');

function render() {
    var boxLen = showBox.childNodes.length;
    for (var i = 0; i < boxLen; i++) {
        var delBox = showBox.firstChild;
        showBox.removeChild(delBox);
    };
    for (var i = 0; i < arr.length; i++) {
        var curBox = createBox(arr[i]);
        for (var j = 0; j < result.length; j++) {
            if (result[j] === i) {
                curBox.style.color = 'red';
            }
        };
        showBox.appendChild(curBox);
    };
    result.length = 0;
};

function removeBox(e) {
    for (var i = 0; i < showBox.childNodes.length; i++) {
        if (showBox.childNodes[i] === e.target) {
            arr.splice(i, 1);
        }
    };
    showBox.removeChild(e.target);
};

function createBox(num) {
    var newBox = document.createElement('div');
    newBox.setAttribute('class', 'box');
    newBox.innerText = num;
    newBox.onclick = removeBox;
    return newBox;
};

function enterFromLeft() {
    if (!checkNum()) {
        return false;
    } else {
        arr = checkNum().concat(arr);
        render();
    }
};

function enterFromRight() {
    if (!checkNum()) {
        return false;
    } else {
        arr = arr.concat(checkNum());
        render();
    }
};

function removeFromLeft() {
    alert(arr.shift() || 'Empty Array!');
    firstBox = showBox.firstChild;
    showBox.removeChild(firstBox);
};

function removeFromRight() {
    alert(arr.pop() || 'Empty Array!');
    lastBox = showBox.lastChild;
    showBox.removeChild(lastBox);
}

function sort() {
    for (var i = 0; i < arr.length; i++) {
        for (var j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }
        };
    };
    render();
}

function searchKw(){
    var kw = document.getElementById('keyword').value;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].indexOf(kw) !== -1) {
            result.push(i);
        }
    };
    render();
}

function checkNum() {
    var content = inp.value;
    var nums = content.split(/[\s+\n\t,，、]/);
    if (arr.length > 60) {
        alert('Array is Full!');
    } else {
        return nums;
    }
};

inLeft.onclick = enterFromLeft;
inRight.onclick = enterFromRight;
outLeft.onclick = removeFromLeft;
outRight.onclick = removeFromRight;
sortBtn.onclick = sort;
searchBtn.onclick = searchKw;