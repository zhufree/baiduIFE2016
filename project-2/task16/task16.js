/**
 * aqiData，存储用户输入的空气指数数据
 * 示例格式：
 * aqiData = {
 *    "北京": 90,
 *    "上海": 40
 * };
 */
var aqiData = {};
var cityFormat = /^[a-zA-Z\u4e00-\u9fa5]+$/;
var airFormat = /^[0-9]+$/;
var infoTable = document.getElementById('aqi-table');
var addBtn = document.getElementById('add-btn');
var inpCity = document.getElementById('aqi-city-input')
var inpAir = document.getElementById('aqi-value-input')
/**
 * 从用户输入中获取数据，向aqiData中增加一条数据
 * 然后渲染aqi-list列表，增加新增的数据
 */
function addAqiData() {
    var cityName = inpCity.value.trim();
    var airIndex = inpAir.value.trim();
    if (cityFormat.test(cityName) && airFormat.test(airIndex-0)) {
        aqiData[cityName] = airIndex;
    } else if (!cityFormat.test(cityName)) {
        inpCity.value = '';
        alert('Please input correct city name');
    } else {
        inpAir.value = '';
        alert('Please input correct air condition(number).');
    }
}

/**
 * 渲染aqi-table表格
 */
function renderAqiList() {
    // console.log(frag.childNodes.length);
    var nodeLen = infoTable.childNodes.length;
    for (var i = 0; i < nodeLen; i++) {
        curChild = infoTable.firstChild;
        infoTable.removeChild(curChild);
    };
    var newTr = document.createElement('tr');
    var tdCity = document.createElement('td');
    var tdAir = document.createElement('td');
    var tdDel = document.createElement('td');
    tdCity.innerText = '城市';
    tdAir.innerText = '空气质量';
    tdDel.innerText = '操作';
    newTr.appendChild(tdCity);
    newTr.appendChild(tdAir);
    newTr.appendChild(tdDel);
    infoTable.appendChild(newTr);
    var frag = document.createDocumentFragment();
    for (aqi in aqiData) {
        var newTr = document.createElement('tr');
        var tdCity = document.createElement('td');
        var tdAir = document.createElement('td');
        var tdDel = document.createElement('td');
        tdCity.innerText = aqi;
        tdAir.innerText = aqiData[aqi];
        tdDel.innerHTML = '<button class="del-btn">删除</button>';
        newTr.appendChild(tdCity);
        newTr.appendChild(tdAir);
        newTr.appendChild(tdDel);
        frag.appendChild(newTr);
    };
    infoTable.appendChild(frag);
}   

/**
 * 点击add-btn时的处理逻辑
 * 获取用户输入，更新数据，并进行页面呈现的更新
 */
function addBtnHandle() {
  addAqiData();
  renderAqiList();
}

/**
 * 点击各个删除按钮的时候的处理逻辑
 * 获取哪个城市数据被删，删除数据，更新表格显示
 */
function delBtnHandle(e) {
  // do sth.
  target = e.target;
  if (target.className === 'del-btn'){
      var curCity = target.parentNode.previousSibling.previousSibling.innerText;
      delete aqiData[curCity];
      renderAqiList();
  }
  
}

function init() {

  // 在这下面给add-btn绑定一个点击事件，点击时触发addBtnHandle函数
  addBtn.onclick = addBtnHandle;
  // 想办法给aqi-table中的所有删除按钮绑定事件，触发delBtnHandle函数

  infoTable.addEventListener('click', delBtnHandle, false);
}

init();