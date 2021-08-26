// Code refactoring
;(function () {
  // Selectors
  let btn = document.querySelector('.submit')

  // Methods
  function outputCheckbox() {
    let userInput = document.querySelector('.hobby')
    const re = /\n|\、|\;|\,|\；|\，|\s/
    let hobbyArr = uniqArray(userInput.value.split(re))
    let hobbyNum = hobbyArr.length
    if (hobbyNum === 1 && hobbyArr[0].length === 0) {
      let hint = document.createElement('p')
      hint.innerHTML = '请输入爱好'
      hint.style.color = 'red'
      userInput.insertAdjacentElement('afterend', hint)
      console.log(document.body)
    } else if (hobbyNum > 10) {
      let hint = document.createElement('p')
      hint.innerHTML = '输入的爱好数量不能超过10个'
      hint.style.color = 'red'
      userInput.insertAdjacentElement('afterend', hint)
    } else {
      try {
        let hint = document.querySelector('p')
        hint.remove()
      } catch {
      } finally {
        let trimedHobbyArr = hobbyArr.map((str) => str.trim())
        trimedHobbyArr.forEach(function (hobby) {
          // 创建<checkbox>元素
          let checkbox = document.createElement('input')
          checkbox.setAttribute('type', 'checkbox')
          document.body.appendChild(checkbox)
          // 创建<label>元素并设置内容
          let label = document.createElement('label')
          label.innerHTML = hobby
          document.body.appendChild(label)
          // 每一个checkbox之后换行
          let newLine = document.createElement('br')
          document.body.appendChild(newLine)
        })
      }
    }
  }

  // Events/APIs/init
  btn.addEventListener('click', outputCheckbox, false)
})()
