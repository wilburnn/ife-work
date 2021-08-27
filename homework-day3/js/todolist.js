// Selectors
const submitBtn = document.querySelector('.input-submit')
let inputTodo = document.querySelector('.input-text')
let todoList = document.querySelector('ul')

window.onload = function () {

  display()

  /**
   * Generate a unique identifier
   * @return {string} unique identifier for todoItem
   */
  const uuid = () => {
    return Date.now().toString(36) + Math.random().toString(36).substr(2)
  }

  /**
   * Add todo item to the localStorage and display data from localStorage
   * @event click#change 
   */
  function addTodo(event) {
    event.preventDefault()
    if (inputTodo.value.trim()) {
      const id = uuid()
      let todoObj = {id: id, content: inputTodo.value, completed: false}
      localStorage.setItem(id, JSON.stringify(todoObj))
      display()
      inputTodo.value=''
    } else {
      alert('输入不能为空')
    }
  }

  /**
   * Delete todo item from the localStorage and display data from localStorage
   * @event click#change
   */
  function deleteTodo(event) {
    if (event.target.getAttribute('class') === 'delete') {
      const todoItem = event.target.closest('.item')
      const id = todoItem.dataset.id
      localStorage.removeItem(id)
      display()
    }
  }

  /**
   * Tick complete or not for todo item
   * @event click#change
   */
  function checkTodo(event) {
    if (event.target.tagName === 'INPUT') {
      const todoItem = event.target.closest('.item')

      const id = todoItem.dataset.id
      const todoObj = JSON.parse(localStorage.getItem(id))
      todoObj.completed = !todoObj.completed
      localStorage.setItem(todoObj.id, JSON.stringify(todoObj))

      display()
    }
  }

  /**
   * Retrieve data from local storage and render again
   */
  function display() {
    // Empty the contents of the list element each time the display is updated
    while (todoList.firstChild) {
      todoList.removeChild(todoList.firstChild)
    }

    for (let i = 0; i < localStorage.length; i++) {
      const id = localStorage.key(i)
      
      const todoObj = JSON.parse(localStorage.getItem(id))

      let liElem = document.createElement('li')
      liElem.setAttribute('class', 'item')
      liElem.setAttribute('data-id', id)
      liElem.setAttribute('completed', todoObj.completed)
    
      let inputElem = document.createElement('input')
      inputElem.setAttribute('type', 'checkbox')
      inputElem.setAttribute('class', 'checkbox')
      inputElem.checked = todoObj.completed

      let buttonElem = document.createElement('button')
      buttonElem.setAttribute('class', 'delete')
      buttonElem.append('Delete')

      liElem.append(inputElem, buttonElem, todoObj.content)
      todoList.append(liElem)
    }
  }

  // Event binding
  submitBtn.addEventListener('click', addTodo, false)
  todoList.addEventListener('click', deleteTodo, false)
  todoList.addEventListener('change', checkTodo, false)
}
