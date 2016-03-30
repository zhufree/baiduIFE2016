var arr = [];
var showBox = document.getElementById('showBox');
var inLeft = document.getElementById('inLeft');
var inRight = document.getElementById('inRight');
var outLeft = document.getElementById('outLeft');
var outRight = document.getElementById('outRight');
var inp = document.getElementsByTagName('input')[0];
var sortBtn = document.getElementById('sort');

function render() {
    var boxLen = showBox.childNodes.length;
    for (var i = 0; i < boxLen; i++) {
        curBox = showBox.firstChild;
        showBox.removeChild(curBox);
    };
    for (var i = 0; i < arr.length; i++) {
        showBox.appendChild(createBox(arr[i]));
    };
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
    newBox.style.height = num * 2 + 'px';
    newBox.onclick = removeBox;
    return newBox;
};

function enterFromLeft() {
    if (!checkNum()) {
        return false;
    } else {
        num = checkNum();
    }
    arr.unshift(num);
    firstBox = showBox.firstChild;
    showBox.insertBefore(createBox(num), firstBox);
};

function enterFromRight() {
    if (!checkNum()) {
        return false;
    } else {
        num = checkNum();
    }
    arr.push(num);
    showBox.appendChild(createBox(num));
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

function checkNum() {
    var num = inp.value;
    if (isNaN(num.trim() - 0) || num < 10 || num > 100) {
        alert('Please Enter A Number in 10-100!');
        inp.value = '';
        return false;
    } else if (arr.length > 60) {
        alert('Array is Full!');
    } else {
        return num;
    }
};

inLeft.onclick = enterFromLeft;
inRight.onclick = enterFromRight;
outLeft.onclick = removeFromLeft;
outRight.onclick = removeFromRight;
sortBtn.onclick = sort;
