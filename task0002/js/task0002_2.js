;(function () {
  // Selectors
  let beginBtn = document.querySelector('.begin-countdown')
  let endBtn = document.querySelector('.stop-countdown')

  // Methods
  // 验证年月日输入格式是否为YYYY-MM-DD
  let re = /\d{4}-\d{2}-\d{2}/
  function isDate(userInput) {
    let ok = re.exec(userInput)
    if (!ok) {
      return false
    } else {
      return true
    }
  }

  // 将毫秒转换为XX天XX小时XX分XX秒
  // 返回一个数组[days, hours, minutes, seconds]
  function dhm(ms) {
    let days = Math.floor(ms / (24 * 60 * 60 * 1000)),
      daysms = ms % (24 * 60 * 60 * 1000),
      hours = Math.floor(daysms / (60 * 60 * 1000)),
      hoursms = ms % (60 * 60 * 1000),
      minutes = Math.floor(hoursms / (60 * 1000)),
      minutesms = ms % (60 * 1000),
      seconds = Math.floor(minutesms / 1000)
    return [days, hours, minutes, seconds]
  }

  // 倒计时开始
  let nIntervId
  function countDown() {
    let dateInput = document.querySelector('#time').value
    if (isDate(dateInput) === true) {
      nIntervId = setInterval(function () {
        flashTime(dateInput)
      }, 1000)
    } else {
      alert('请按要求格式输入')
    }
  }
  function flashTime(userInput) {
    // 将当前输入的日期格式转换为UTC时间
    let timeArr = userInput.split('-').map((x) => parseInt(x))
    let setTime = new Date(timeArr[0], timeArr[1] - 1, timeArr[2])
    // 计算时间差
    let currentTime = new Date()
    let ms = setTime - currentTime
    console.log(ms)
    if (ms === 0) {
      stopCountDown()
    } else {
      // 在页面中显示，距离YYYY年MM月DD日还有XX天XX小时XX分XX秒
      let para = document.querySelector('.display-time')
      para.innerHTML = `距离 ${setTime.getFullYear()} 年 ${
        setTime.getMonth() + 1
      } 月 ${setTime.getDate()} 日
                              还有 ${dhm(ms)[0]} 天 ${dhm(ms)[1]} 小时 ${
        dhm(ms)[2]
      } 分 ${dhm(ms)[3]} 秒`
    }
  }
  // 倒计时停止
  function stopCountDown() {
    clearInterval(nIntervId)
  }

  // Events/APIs/init
  beginBtn.addEventListener('click', countDown, false)
  endBtn.addEventListener('click', stopCountDown, false)
})()
