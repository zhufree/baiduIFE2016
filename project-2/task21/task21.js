var tagInp = document.getElementById('tag-inp');
var tagBox = document.getElementById('tag-box');
var intrsInp = document.getElementById('intrs-inp');
var intrsBox = document.getElementById('intrs-box');
var sureBtn = document.getElementById('sure-btn');
var tagArr = [];
var intrsArr = [];

function renderTags() {
    var boxLen = tagBox.childNodes.length;
    for (var i = 0; i < boxLen; i++) {
        var delBox = tagBox.firstChild;
        tagBox.removeChild(delBox);
    };
    for (var i = 0; i < tagArr.length; i++) {
        tagBox.appendChild(createBox('tag', tagArr[i]));
    };
}

function renderIntrs() {
    var boxLen = intrsBox.childNodes.length;
    for (var i = 0; i < boxLen; i++) {
        var delBox = intrsBox.firstChild;
        intrsBox.removeChild(delBox);
    };
    for (var i = 0; i < intrsArr.length; i++) {
        intrsBox.appendChild(createBox('intrs', intrsArr[i]));
    };
}

function createBox(class_, text) {
    var newBox = document.createElement('span');
    newBox.setAttribute('class', class_);
    newBox.innerText = text;
    newBox.onclick = removeBox;
    return newBox;
}

function removeBox(e) {
    for (var i = 0; i < tagBox.childNodes.length; i++) {
        if (tagBox.childNodes[i] === e.target) {
            tagArr.splice(i, 1);
        }
    };
    tagBox.removeChild(e.target);
}

function checkTag() {
    var content = tagInp.value;
    if (content.charAt(content.length-1).match(/[\s+\n\t,，]/)){
        curTag = content.slice(0, content.length-1).trim();
        flag = false;
        for (var i = 0; i < tagArr.length; i++) {
            if (curTag === tagArr[i]) {
                flag = true;
            }
        };
        if (!flag && curTag) {
            tagArr.push(curTag);
        }
        if (tagArr.length > 10) {
            tagArr.shift();
        }
        renderTags();
        tagInp.value = '';
    }
}

function checkintrs(){
    var content = intrsInp.value;
    var rawArr = content.split(/[\s+\n\t,，、]/).filter(function(x){
        return !!x;
    }).map(function(x){
        return x.trim();
    });
    for (var i = 0; i < rawArr.length; i++) {
        if (intrsArr.indexOf(rawArr[i]) === -1){
            intrsArr.push(rawArr[i]);
        }
    };
    while (intrsArr.length > 10) {
        intrsArr.shift();
    }
    renderIntrs();
    intrsArr = [];
}

tagInp.onkeyup = checkTag;
sureBtn.onclick = checkintrs;
