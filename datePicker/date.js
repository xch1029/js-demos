;(function(){
  var date = {},monthDate,$wrapper,lastDayDate;

  date.getMonthDate = function(year,month){   //获取数据
    var dateDate = [];       //定义获取的月份数据
    if(!year||!month){       //如果日期不存在就重新获取当前系统时间
      var today = new Date;
      year = today.getFullYear();
      month = today.getMonth() + 1;
    }

    //当月第一天
    var firstDay = new Date(year,month-1,1);  //日期
    var firstDayWeek = firstDay.getDay(); //第一天是星期几

    year = firstDay.getFullYear();
    month = firstDay.getMonth()+1;

    if(month<=9){month = "0" + month;}  //小于10的月份前加0

    //上月最后一天
    var lastDayOfLastMonth = new Date(year,month-1,0);    //日期
    var lastDateOfLastMonth = lastDayOfLastMonth.getDate();

    var lastMonthShow = firstDayWeek ;       //需要显示的上月的天数

    var lastDay = new Date(year,month,0);           //获取本月最后一天的日期
    lastDayDate = lastDay.getDate();

    //获取本月数据，月份包含的星期可能为4,5,6，所以需要获取最大星期数6的星期数据
    for(var i=0;i<7*6;i++){
      var dateDay = i - lastMonthShow + 1;    //本月的第一天日期，为负值即表示上月的日期
      var showDay = dateDay;                  //dateDay显示可能为负值，用showDay来显示实际的显示日期
      var thisMonth = month;                  //month显示可能为负值，用thisMonth来显示实际的显示月份

      if(dateDay<=0){  //上月
        thisMonth = month - 1;
        showDay = lastDateOfLastMonth + dateDay ; //上月的最后一天减去已经显示的天数，得到此日为上月的多少号
      }else if(dateDay > lastDayDate){ //下一月
        thisMonth = month + 1;
        showDay = showDay - lastDayDate;//超出本月的天数减去上月的最后一天，得到为下月的多少号
      }
      if(showDay<10){showDay = "0" + showDay;}//小于10的日期前加0
      if(thisMonth === 0){thisMonth = 12;}//月份范围限制
      if(thisMonth === 13){thisMonth = 1;}
      dateDate.push({month:thisMonth,date:dateDay,show:showDay});//将每条数据转为对象传入月份数据数组

    }
    return {year : year,month : month,days :dateDate}
  };
  //渲染数据
  date.buildUi = function(year,month){
    //获取数据
    monthDate = date.getMonthDate(year,month);
    /* console.log(monthDate);*/
    var html = '<div id="header">' +
      '<a href="#" class="prev btn">&lt;</a><a href="#" class="next btn">&gt;</a>' +
      '<span>' +monthDate.year + '-' + monthDate.month + "</span>" +
      '</div>' +
      '<div id="inner">' +
      '<table>' +
      '<thead>' +
      '<tr>' +
      '<th>日</th>' +
      '<th>一</th>' +
      '<th>二</th>' +
      '<th>三</th>' +
      '<th>四</th>' +
      '<th>五</th>' +
      '<th>六</th>' +
      '</tr>' +
      '</thead>' +
      '<tbody>';
    //定义模板
    //循环定义模板中的日期
    for(var i=0;i<monthDate.days.length;i++){
      if(i%7 === 0){html += '<tr>';}
      if(monthDate.days[i].date <= 0||monthDate.days[i].date>lastDayDate){
        html += '<td class="not" data-date="'+ monthDate.days[i].date +'">' + monthDate.days[i].show + '</td>';
      }else{
        html += '<td data-date="'+ monthDate.days[i].date +'">' + monthDate.days[i].show + '</td>';
      }
      if(i%7 === 6){html += '</tr>';}
    }
    //模板结尾
    html += '</tbody>' +
      '</table>' ;
    return html;
  };
  //渲染模板
  date.render = function(monthChange){
    var year,month;//获取需要渲染的年月
    if(monthDate){//初次绑定组件时monthRender不存在，year和month将为当前日期
      year = monthDate.year;
      month = monthDate.month;
    }
    if(monthChange === 'prev'){ //当点击切换时渲染上月或下月
      month--;
      if(month === 0){
        month = 12;
        year--;
      }
    }
    if(monthChange === 'next'){
      month++;
      if(month === 13){
        month = 1;
        year++;
      }
    }
    //渲染月份的数据
    var renderHtml = date.buildUi(year,month);
    //只有当主容器不存在时才需要重新渲染主容器，即只有首次绑定组件时渲染主容器，之后渲染只需要刷新数据
    /*$wrapper = document.querySelector('.DatePicker');*/
    if(!$wrapper){
      $wrapper = document.createElement("div");
      $wrapper.className = 'outer';
      document.body.appendChild($wrapper);
    }
    $wrapper.innerHTML = renderHtml;
  };
  date.init = function(input) {
    //渲染内容
    date.render();
    var $input = document.querySelector(input);
    var isOpen = false;
    $input.addEventListener("click",function(){//绑定输入框，当点击输入框是展开日历
      if(isOpen){
        $wrapper.classList.remove("outer-show");
        isOpen = false;
      }else{
        //展开日历时根据输入框位置对日历定位
        $wrapper.classList.add("outer-show");
        $wrapper.style.left = $input.offsetLeft + "px";
        $wrapper.style.top = $input.offsetTop + $input.offsetHeight + "px";
        isOpen = true;
      }
    });
    //绑定切换月份的按钮事件，将事件绑定在容器元素上，利用冒泡原理接收事件通过target属性判断实际点击的元素
    $wrapper.addEventListener("click", function (e) {
      var $target = e.target;
      //选择日期
      if ($target.tagName.toLowerCase() === "td") {
        var inputDate = new Date(monthDate.year, monthDate.month-1, $target.dataset.date);
        /*console.log( $target.dataset.date);*/
        $input.value = date.translateDate(inputDate);
        $wrapper.classList.remove("active");
        isOpen = false;
      }
      //月份切换
      if (!$target.classList.contains("btn")) {return;}//这个返回使得日期选择绑定要在月份切换绑定之前，否则无法绑定日期切换
      if ($target.classList.contains("prev")) {date.render("prev");}
      else if ($target.classList.contains("next")) {date.render("next");}
    });
  };
  //点击后显示日期在input中
  date.translateDate = function(date){
    var htmlDate = "";
    var change = function(num){
      if(num<=9){
        return "0"+num;
      }
      return num;
    };
    htmlDate += date.getFullYear() + "-";
    htmlDate += change(date.getMonth() + 1) + "-";
    htmlDate += change(date.getDate());
    return htmlDate;
  };
  window.date = date;
})();






