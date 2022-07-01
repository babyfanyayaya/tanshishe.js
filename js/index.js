// 工具封装
// 根据id来获取元素
function $(id ) {
  return document.getElementById(id)
}
// 创建div, className是其类名
function creatediv (className) {
  var div = document.createElement('div');
  div.className = className
  return div
}
var state = 0;
var speed = 6;
var flag = false;
var clock = null
 //点击开始游戏按钮 开始游戏
 function start () {
   if (!flag) {
     init()
   } else {
     alert("游戏已经开始了")
   }
 }

 /*
   *    初始化 init
   */
function init() {
  flag = true;
  for (var i = 0; i < 4; i ++ ) {
    createrow()
  }
  $('main').onclick = function (ev) {
    ev = ev || event;
    judge(ev)
  }
  clock = window.setInterval("move()", 30)
}
   // 添加onclick事件

   // 定时器 每30毫秒调用一次move()

// 创造一个<div class="row">并且有四个子节点<div class="cell">
function createrow() {
  var row = creatediv('row')
  var con = $('con')
  var arr = createcell()
  con.appendChild(row)
  for (var i = 0; i < 4; i ++) {
    row.appendChild(creatediv(arr[i]))
  }
  console.log(con.firstChild)
  // if (con.firstChild == null) {
  //   con.appendChild(row)
  //   console.log(888)
  // }else {
  //   con.insertBefore(row, con.firstChild)
  // }
  con.insertBefore(row, con.firstChild)
}
// 创建一个类名的数组，其中一个为cell black, 其余为cell
function createcell () {
  var temp = ['cell','cell','cell','cell']
  var i = Math.floor(Math.random()*4)
  temp[i] = 'cell black'
  return temp
}
// 创建一个类名的数组，其中一个为cell black, 其余为cell

 // 游戏结束
function fail () {
  var con = $('con')
  clearInterval(clock);
  flag = false;
  
  $('score').innerHTML = 0;
  con.innerHTML = '';
  con.style.top = '-408px';
  // confirm('你的游戏结束了你的的得分是' + parseInt($('score').innerHTML))
  confirm('你的最终得分为 ' + parseInt($('score').innerHTML));
  console.log('fenhsu')
}
// 判断是否点击黑块、白块
function judge(ev) {
  if (
    ev.target.className.indexOf('black') == -1 && 
    ev.target.className.indexOf('cell') !== -1
  ) {
     ev.target.parentNode.pass1 = 1
  }
  if (
    ev.target.className.indexOf('black') !== -1
  ) {
    ev.target.className = 'cell'
    ev.target.parentNode.pass = 1
    score()
  }
}
 // 判断游戏是否结束 
function over() {
  var rows = con.childNodes
  if (
    rows.length == 5 && rows[rows.length - 1].pass !== 1
  ) {
    fail()
  }
 for (let i = 0; i < rows.length; i ++ ){
    if (rows[i].pass1 == 1) {
       fail()
    } 
 }
}
 //删除某行
function delrow() {
  var con = $('con')
  if ( con.childNodes.length == 6) {
    con.removeChild(con.lastChild)
  }
}
  //让黑块动起来
function move() {
  var con = $('con');
  var top =  parseInt(window.getComputedStyle(con, null)['top'])
  if (  top + speed > 0) {
    top = 0
  } else{
    top += speed
  }
  con.style.top = top + 'px'
  over();
  if (top == 0 ) {
    createrow()
    con.style.top = '-102px';
    delrow()
  }
}
  // 加速函数
function speedup () {
  speed += 2
  if (speed = 20) {
    alert ('你超神了')
  }
}
function score() {
  var newscore = parseInt($('score').innerHTML) + 1
  $('score').innerHTML = newscore;
  if (newscore % 10 == 0) {
    speedup()
  }
}
  // 记分