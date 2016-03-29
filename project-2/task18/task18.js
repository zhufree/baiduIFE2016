var arr = [];
var showBox = document.getElementById('showBox');
var inLeft = document.getElementById('inLeft');
var inRight = document.getElementById('inRight');
var outLeft = document.getElementById('outLeft');
var outRight = document.getElementById('outRight');
var inp = document.getElementsByTagName('input')[0];

function removeBox(e) {
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

function checkNum() {
	var num = inp.value;
	if (isNaN(num.trim() - 0)) {
		alert('Please Enter A Number!');
		inp.value = '';
		return false;
	} else {
		return num;
	}
};

inLeft.onclick = enterFromLeft;
inRight.onclick = enterFromRight;
outLeft.onclick = removeFromLeft;
outRight.onclick = removeFromRight;

