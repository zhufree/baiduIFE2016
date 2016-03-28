/* 数据格式演示
var aqiSourceData = {
  "北京": {
    "2016-01-01": 10,
    "2016-01-02": 10,
    "2016-01-03": 10,
    "2016-01-04": 10
  }
};
*/

// 以下两个函数用于随机模拟生成测试数据
function getDateStr(dat) {
  var y = dat.getFullYear();
  var m = dat.getMonth() + 1;
  m = m < 10 ? '0' + m : m;
  var d = dat.getDate();
  d = d < 10 ? '0' + d : d;
  return y + '-' + m + '-' + d;
}
function randomBuildData(seed) {
  var returnData = {};
  var dat = new Date("2016-01-01");
  var datStr = ''
  for (var i = 1; i < 92; i++) {
    datStr = getDateStr(dat);
    returnData[datStr] = Math.ceil(Math.random() * seed);
    dat.setDate(dat.getDate() + 1);
  }
  return returnData;
}

var aqiSourceData = {
  "北京": randomBuildData(500),
  "上海": randomBuildData(300),
  "广州": randomBuildData(200),
  "深圳": randomBuildData(100),
  "成都": randomBuildData(300),
  "西安": randomBuildData(500),
  "福州": randomBuildData(100),
  "厦门": randomBuildData(100),
  "沈阳": randomBuildData(500)
};

// 用于渲染图表的数据
var chartData = {};

// 记录当前页面的表单选项
var pageState = {
  nowSelectCity: -1,
  nowGraTime: "day"
}

/**
 * 渲染图表
 */
function renderChart() {
  var podeBox = document.getElementsByClassName('aqi-chart-wrap')[0];
  var childPode = podeBox.childNodes;
  var podeLen = childPode.length;
  console.log(childPode);
  for (var i = 0; i < podeLen; i++) {
    curChild = podeBox.firstChild;
    podeBox.removeChild(curChild);
  };
  var days = Object.keys(aqiSourceData);
  var data = chartData[days[pageState.nowSelectCity]][pageState.nowGraTime];
  var time = Object.keys(data);
  switch (pageState.nowGraTime) {
    case 'day':
      for (var i = 0; i < time.length; i++) {
        var newPode = document.createElement('div');
        newPode.setAttribute('class', 'pode');
        newPode.setAttribute('title', time[i] + ' pm:' + data[time[i]]);
        newPode.style.height = data[time[i]];
        newPode.style.width = '10';
        if (data[time[i]] > 400) {
          newPode.style.backgroundColor = '#000';
        } else if (data[time[i]] > 300) {
          newPode.style.backgroundColor = '#810081';
        } else if (data[time[i]] > 200) {
          newPode.style.backgroundColor = '#0100FE';
        } else if (data[time[i]] > 100) {
          newPode.style.backgroundColor = '#FE0002';
        } else {
          newPode.style.backgroundColor = '#008100';
        }
        podeBox.appendChild(newPode);
      };
      break;
    case 'week':
      for (var i = 0; i < time.length; i++) {
        var newPode = document.createElement('div');
        newPode.setAttribute('class', 'pode');
        newPode.setAttribute('title', 'Week from ' + time[i] + ' pm:' + data[time[i]]);
        newPode.style.height = data[time[i]];
        newPode.style.width = '25';
        if (data[time[i]] > 300) {
          newPode.style.backgroundColor = '#000';
        } else if (data[time[i]] > 250) {
          newPode.style.backgroundColor = '#810081';
        } else if (data[time[i]] > 200) {
          newPode.style.backgroundColor = '#0100FE';
        } else if (data[time[i]] > 150) {
          newPode.style.backgroundColor = '#FE0002';
        } else {
          newPode.style.backgroundColor = '#008100';
        }
        podeBox.appendChild(newPode);
      };
      break;
    case 'month':
      for (var i = 0; i < time.length; i++) {
        var newPode = document.createElement('div');
        newPode.setAttribute('class', 'pode');
        newPode.setAttribute('title', 'Month' + time[i] + ' pm:' + data[time[i]]);
        newPode.style.height = data[time[i]];
        newPode.style.width = '40';
        if (data[time[i]] > 200) {
          newPode.style.backgroundColor = '#000';
        } else if (data[time[i]] > 150) {
          newPode.style.backgroundColor = '#810081';
        } else if (data[time[i]] > 100) {
          newPode.style.backgroundColor = '#0100FE';
        } else if (data[time[i]] > 50) {
          newPode.style.backgroundColor = '#FE0002';
        } else {
          newPode.style.backgroundColor = '#008100';
        }
        podeBox.appendChild(newPode);
      };
      break;
  }
  

}

/**
 * 日、周、月的radio事件点击时的处理函数
 */
function graTimeChange() {
  // 确定是否选项发生了变化 
  if (this.value !== pageState.nowGraTime) {
  // 设置对应数据
  pageState.nowGraTime = this.value;
  // 调用图表渲染函数
  renderChart();
  }
}

/**
 * select发生变化时的处理函数
 */
function citySelectChange() {
  // 确定是否选项发生了变化 
  if (this.selectedIndex !== pageState.nowSelectCity) {
  // 设置对应数据
  pageState.nowSelectCity = this.selectedIndex;
  // 调用图表渲染函数
  renderChart();
  };
}

/**
 * 初始化日、周、月的radio事件，当点击时，调用函数graTimeChange
 */
function initGraTimeForm() {
  var chooseDate = document.getElementsByTagName('input');
  for (var i = 0; i < chooseDate.length; i++) {
    chooseDate[i].onfocus = graTimeChange;
  };
}

/**
 * 初始化城市Select下拉选择框中的选项
 */
function initCitySelector() {
  // 读取aqiSourceData中的城市，然后设置id为city-select的下拉列表中的选项
  var citySelect = document.getElementById("city-select");
  var cities = Object.keys(aqiSourceData);
  for (var i = 1; i < cities.length; i++) {
    var newCity = document.createElement('option');
    newCity.value = cities[i];
    newCity.innerText = cities[i];
    citySelect.appendChild(newCity);
  };
  // 给select设置事件，当选项发生变化时调用函数citySelectChange
  pageState.nowSelectCity = 0;
  citySelect.onchange = citySelectChange;
}

/**
 * 初始化图表需要的数据格式
 */
function initAqiChartData() {
  // 将原始的源数据处理成图表需要的数据格式
  // 处理好的数据存到 chartData 中
  function toWeek(dayData) {
    var weekData = {};
    var days = Object.keys(dayData);
    var weekSum = 0;
    for (var i = 0, j = 0, weekFrom = days[i]; i < days.length; i++) {
      weekSum += dayData[days[i]];
      j ++;
      if (j === 7) {
        weekData[weekFrom] = Math.round(weekSum/7);
        j = 0;
        weekSum = 0;
        weekFrom = days[i];
      }
    };
    return weekData;
  };

  function toMonth(dayData) {
    var monthData = {};
    var days = Object.keys(dayData);
    var monthSum = 0;
    for (var i = 0; i < 31; i++) {
      monthSum += dayData[days[i]];
      monthData['1'] = Math.round(monthSum/31);
    };
    monthSum = 0;
    for (var i = 31; i < 60; i++) {
      monthSum += dayData[days[i]];
      monthData['2'] = Math.round(monthSum/29);
    };
    monthSum = 0;
    for (var i = 60; i < 91; i++) {
      monthSum += dayData[days[i]];
      monthData['3'] = Math.round(monthSum/31);
    };
    return monthData;
  }

  var cities = Object.keys(aqiSourceData);
  for (var i = 0; i < cities.length; i++) {
    chartData[cities[i]] = {
      'day': aqiSourceData[cities[i]],
      'week': toWeek(aqiSourceData[cities[i]]),
      'month': toMonth(aqiSourceData[cities[i]])
    };
  };
  // console.log(chartData);
  return chartData;
}

/**
 * 初始化函数
 */
function init() {
  initGraTimeForm()
  initCitySelector();
  initAqiChartData();
  // renderChart();
}

init();
