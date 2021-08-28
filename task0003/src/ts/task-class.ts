import ElementsOfPage from './dom'
import AddTaskClassModal from '../components/TaskClassModal'

export default class TaskClass {
  addClass: HTMLDivElement
  taskClassUl: HTMLUListElement
  taskClassObj: TaskClassType
  taskList: HTMLDivElement
  renderTaskClass: VoidFunction
  renderTaskList: VoidFunction

  constructor() {
    const { addClass, taskClassUl, taskList, renderTaskClass, renderTaskList } =
      new ElementsOfPage()
    this.addClass = addClass
    this.taskClassUl = taskClassUl
    this.taskClassObj = { category: '', tasks: [] }
    this.taskList = taskList
    this.eventBind()

    this.renderTaskClass = renderTaskClass
    this.renderTaskList = renderTaskList
  }

  add(): void {
    AddTaskClassModal()
    const confirmBtn = document.querySelector('.addplan-btn-confirm')!
    confirmBtn.addEventListener('click', () => {
      const taskClassElem = document.querySelector(
        '.task-class-input'
      )! as HTMLInputElement
      const newTaskClass = taskClassElem.value
      if (!newTaskClass) {
        alert('输入不能为空')
        return
      }
      taskClassElem.value = ''
      // Clone a new object for modify
      const newTaskClassObj = JSON.parse(
        JSON.stringify(this.taskClassObj)
      ) as TaskClassType

      newTaskClassObj.category = newTaskClass
      localStorage.setItem(newTaskClass, JSON.stringify(newTaskClassObj))

      this.renderTaskClass()
    })
  }

  delete(evt: MouseEvent): void {
    const target = evt.target as HTMLElement
    if (target.tagName === 'DIV' || target.tagName === 'SPAN') {
      return
    }
    const svg = target.closest('svg')!
    if (svg.matches('svg.icon-delete')) {
      if (window.confirm('确定删除吗？')) {
        const taskClassItem = svg.closest('li')!
        const taskClassKey = taskClassItem.getAttribute('data-taskClass')!
        localStorage.removeItem(taskClassKey)
      }
    }

    this.renderTaskClass()
  }

  activate(evt: MouseEvent): void {
    const target = evt.target as HTMLElement
    const targetTaskClass = target.closest('li')!
    const selectedClass = document.querySelector('.selected-class')
    if (selectedClass !== null) {
      selectedClass.classList.remove('selected-class')
    }
    targetTaskClass.classList.add('selected-class')

    this.renderTaskList()
  }

  eventBind(): void {
    this.addClass.addEventListener('click', this.add.bind(this))
    this.taskClassUl.addEventListener('click', this.delete.bind(this))
    this.taskClassUl.addEventListener('click', this.activate.bind(this))
  }
}
