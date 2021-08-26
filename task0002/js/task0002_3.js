// 获取 HTML 中的对象
let parent = document.querySelector('.parent')
let imgUl = document.querySelector('#img-ul')
let litCirUl = document.querySelector('#litCir-ul')
let buttons = document.querySelector('.buttons')
let cLis = litCirUl.children

//图片张数
let len = imgUl.children.length
//每张图片的宽度
let width = parent.offsetWidth
//一张图片的切换速度， 单位为px
let rate = 15
//切换速度的倍率
let times = 1
//自动切换间隙，单位为毫秒
let gap = 2000
//初始化一个定时器
let timer = null
//当前显示的图片下标
let picN = 0
//当前显示图片的小圆点下标
let cirN = 0

/**
 * 添加小圆点
 */
function addDot() {
  for (let i = 0; i < len; i++) {
    let a_li = document.createElement('li')
    a_li.className = 'quiet'
    litCirUl.appendChild(a_li)
  }
  litCirUl.children[0].className = 'active'
}

/**
 * 控制 imgUl 的 left 值来控制显示某张图片
 * @param {distance} 滚动的目标点（必为图片宽度的倍数）
 */
function roll(distance) {
  // 每次运行该函数必须清除之前的定时器
  clearInterval(imgUl.timer)
  // 判断图片移动的方向
  var speed = imgUl.offsetLeft < distance ? rate : 0 - rate

  // 设置定时器，每隔 10 毫秒，调用一次该匿名函数
  imgUl.timer = setInterval(function () {
    // 每一次调用滚动到的地方
    imgUl.style.left = imgUl.offsetLeft + speed + 'px'
    // 距离目标点剩余的 px 值
    var leave = distance - imgUl.offsetLeft
    // 接近目标点时的处理，滚动接近目标时直接到达，避免 rate 值设置不当时不能完整显示图片
    if (Math.abs(leave) <= Math.abs(speed)) {
      clearInterval(imgUl.timer)
      imgUl.style.left = distance + 'px'
    }
  }, 10)
}

// 克隆第一张图片至列表尾部，当滚动完最后一张图片时，继续滚动到克隆的第一张
imgUl.appendChild(imgUl.children[0].cloneNode(true))

/**
 * 自动滚动
 */
function autoRun() {
  picN++
  cirN++
  //滚动完克隆项后
  if (picN > len) {
    //改变 left 至真正的第一项处
    imgUl.style.left = 0
    //从第二张开始显示
    picN = 1
  }
  roll(-picN * width)
  //判断是否到了最后一个圆点
  if (cirN > len - 1) {
    cirN = 0
  }
  for (let i = 0; i < len; i++) {
    cLis[i].className = 'quiet'
  }
  cLis[cirN].className = 'active'
}

/**
 * 触及小圆点时切换至对应图片
 */
function touchDotRoll() {
  for (var i = 0; i < len; i++) {
    cLis[i].index = i
    cLis[i].onmouseover = function () {
      for (var j = 0; j < len; j++) {
        cLis[j].className = 'quiet'
      }
      this.className = 'active'
      temp = cirN
      picN = cirN = this.index
      //距离上个小圆点的距离
      times = Math.abs(this.index - temp)
      //根据距离改变切换速率
      rate = rate * times
      roll(-this.index * width)
      rate = 15
    }
  }
}

/**
 * 点击按钮时更换图片
 */
function clickRoll() {
  buttons.children[0].onclick = function () {
    picN--
    cirN--
    //滚动完第一项后
    if (picN < 0) {
      //改变left至克隆的第一项处
      img_ul.style.left = -len * width + 'px'
      picN = cirN = len - 1
    }
    roll(-picN * width)
    //bug处理
    if (cirN < 0) {
      cirN = len - 1
    }
    for (var i = 0; i < len; i++) {
      cLis[i].className = 'quiet'
    }
    cLis[cirN].className = 'active'
  }
  // 下一张
  buttons.children[1].onclick = autoRun
}

// 触及区域，清除定时器，显示按钮
parent.onmouseover = function () {
  clearInterval(timer)
  buttons.style.display = 'block'
}
// 离开区域，清除定时器，隐藏按钮
parent.onmouseout = function () {
  timer = setInterval(autoRun, gap)
  buttons.style.display = 'none'
}

// 添加小圆点
addDot()
// 触及小圆点时更换图片
touchDotRoll()
// 点击按钮时更换图片
clickRoll()
// 开始滚动
timer = setInterval(autoRun, gap)
