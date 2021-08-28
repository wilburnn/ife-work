import ElementsOfPage from './dom'
import AddTaskModal from '../components/TaskModal'

export default class TaskList {
  taskClassUl: HTMLUListElement
  addTask: HTMLDivElement
  listOfAllTaskDate: NodeListOf<HTMLUListElement>
  taskList: HTMLDivElement
  taskStatus: HTMLDivElement
  task: TaskType
  renderTaskClass: VoidFunction
  renderTaskList: VoidFunction

  constructor() {
    const {
      taskClassUl,
      addTask,
      listOfAllTaskDate,
      taskList,
      taskStatus,
      renderTaskClass,
      renderTaskList
    } = new ElementsOfPage()
    this.taskClassUl = taskClassUl
    this.addTask = addTask
    this.listOfAllTaskDate = listOfAllTaskDate
    this.taskList = taskList
    this.taskStatus = taskStatus
    this.task = { title: '', date: '', content: '', status: 'uncompleted' }
    this.eventBind()

    this.renderTaskClass = renderTaskClass
    this.renderTaskList = renderTaskList
  }

  add(): void {
    AddTaskModal()
    const confirmBtn = document.querySelector('.addtodo-btn-confirm')!
    confirmBtn.addEventListener('click', () => {
      const taskTitle = document.querySelector(
        'input[name="todo-title"]'
      )! as HTMLInputElement
      const taskContent = document.querySelector(
        '.form-textarea'
      )! as HTMLTextAreaElement
      const taskDate = document.querySelector('date-picker')!

      const newTask = JSON.parse(JSON.stringify(this.task)) as TaskType
      newTask.title = taskTitle.value
      newTask.content = taskContent.value
      //@ts-ignore
      newTask.date = taskDate.datePickerInput.value

      const selectedClass = document.querySelector(
        '.selected-class'
      )! as HTMLElement

      const taskClassKey = selectedClass.dataset.taskclass!
      const taskClassValue = JSON.parse(
        localStorage.getItem(taskClassKey)!
      ) as TaskClassType
      taskClassValue.tasks.push(newTask)

      localStorage.setItem(taskClassKey, JSON.stringify(taskClassValue))

      this.renderTaskClass()
      this.renderTaskList()
    })
  }

  filterByComplete(evt: MouseEvent): void {
    const selected = evt.target as HTMLSpanElement
    if (selected.tagName !== 'SPAN') {
      return
    }
    if (selected.classList.contains('selected-status')) {
      return
    }
    const prev = selected.parentElement!.querySelector('.selected-status')!
    prev.classList.remove('selected-status')
    selected.classList.add('selected-status')

    const completedTasks = <HTMLLIElement[]>(
      Array.from(this.taskList.querySelectorAll('.completed'))
    )
    const uncompletedTasks = <HTMLLIElement[]>(
      Array.from(this.taskList.querySelectorAll('.uncompleted'))
    )
    const allTasks = Array.from(this.taskList.querySelectorAll('li'))
    switch (selected.innerText) {
      case '所有':
        allTasks.forEach((elem) => {
          elem.style.display = 'block'
        })
        break
      case '未完成':
        completedTasks.forEach((elem) => {
          elem.style.display = 'none'
        })
        uncompletedTasks.forEach((elem) => {
          elem.style.display = 'block'
        })
        break
      case '已完成':
        completedTasks.forEach((elem) => {
          elem.style.display = 'block'
        })
        uncompletedTasks.forEach((elem) => {
          elem.style.display = 'none'
        })
        break
    }
  }

  sortByDate(): void {
    console.log(this.listOfAllTaskDate)
    const taskDateArray = Array.from(this.listOfAllTaskDate)
    taskDateArray.sort(function (dateA, dateB) {
      const dateArrA = dateA
        .querySelector('div')!
        .innerHTML.split('-')
        .map((x) => parseInt(x))
      // Converts the currently entered date format to UTC time
      const dateObjA = new Date(dateArrA[0], dateArrA[1] - 1, dateArrA[2])
      const dateArrB = dateB
        .querySelector('div')!
        .innerHTML.split('-')
        .map((x) => parseInt(x))
      const dateObjB = new Date(dateArrB[0], dateArrB[1] - 1, dateArrB[2])
      return +dateObjA - +dateObjB
    })
    this.taskList.append(...taskDateArray)
  }

  eventBind(): void {
    this.addTask.addEventListener('click', this.add.bind(this))
    this.taskStatus.addEventListener('click', this.filterByComplete.bind(this))
  }
}
