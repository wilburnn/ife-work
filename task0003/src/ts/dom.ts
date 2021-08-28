import createSvg from './svg'

export default class ElementsOfPage {
  addClass: HTMLDivElement
  taskClassUl: HTMLUListElement
  addTask: HTMLDivElement
  listOfAllTaskDate: NodeListOf<HTMLUListElement>
  taskList: HTMLDivElement
  taskStatus: HTMLDivElement

  constructor() {
    // Selectors for a list of task class
    this.addClass = document.querySelector('.task-class-add-btn')!
    this.taskClassUl = document.querySelector('.task-class ul')!
    // Selectors for the task list
    this.addTask = document.querySelector('.task-add-btn')!
    this.listOfAllTaskDate = document.querySelectorAll('.task-date')!
    this.taskList = document.querySelector('.task-list')!
    this.taskStatus = document.querySelector('.task-status')!
  }

  renderTaskClass(): void {
    const getNumberOfAllTasks = () => {
      let length = 0
      const keys = Object.keys(localStorage)
      for (const key of keys) {
        length += JSON.parse(localStorage.getItem(key)!).tasks.length
      }
      return length.toString()
    }
    const allTasks = document.querySelector('.task-class-wrap > div')!
    allTasks.textContent = allTasks.textContent!.replace(
      /\d/,
      getNumberOfAllTasks()
    )

    const taskClassUl = this.taskClassUl
    while (taskClassUl.firstChild) {
      taskClassUl.removeChild(taskClassUl.firstChild!)
    }

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i)!
      const taskClassItem = document.createElement('li')
      const span = document.createElement('span')
      const tasksCount = JSON.parse(localStorage.getItem(key)!).tasks.length
      span.textContent = key + `（${tasksCount}）`
      taskClassItem.setAttribute('data-taskClass', key)
      taskClassItem.setAttribute('class', 'class-control')

      const div = document.createElement('div')
      const iconFolder = createSvg('icon-folder')
      const iconDelete = createSvg('icon-delete')

      if (key === '默认分类') {
        div.append(iconFolder, span)
        taskClassItem.classList.add('selected-class', 'default-class')
        taskClassItem.append(div)
        taskClassUl.prepend(taskClassItem)
      } else {
        div.append(iconFolder, span, iconDelete)
        taskClassItem.append(div)
        taskClassUl.append(taskClassItem)
      }
    }
  }

  renderTaskList(): void {
    const taskList = this.taskList
    while (taskList.firstChild) {
      taskList.removeChild(taskList.firstChild!)
    }

    const selectedClass = document.querySelector('.selected-class')
    if (selectedClass !== null) {
      // @ts-ignore
      const taskClassKey = selectedClass.dataset.taskclass!
      const taskClassValue = JSON.parse(
        localStorage.getItem(taskClassKey)!
      ) as TaskClassType

      const taskDateArr = taskClassValue.tasks.map((task) => {
        return task.date
      })

      const sortTaskDateArr = Array.from(new Set(taskDateArr)).sort(
        (dateA, dateB) => {
          const dateArrA = dateA.split('-').map((x) => parseInt(x))
          // Converts the currently entered date format to UTC time
          const dateObjA = new Date(dateArrA[0], dateArrA[1] - 1, dateArrA[2])
          const dateArrB = dateB.split('-').map((x) => parseInt(x))
          const dateObjB = new Date(dateArrB[0], dateArrB[1] - 1, dateArrB[2])
          return +dateObjA - +dateObjB
        }
      )

      sortTaskDateArr.forEach((taskDate) => {
        const ul = document.createElement('ul')
        ul.classList.add('task-date')
        ul.setAttribute('data-taskdate', taskDate)
        const div = document.createElement('div')
        div.textContent = taskDate
        ul.append(div)
        this.taskList.append(ul)
      })

      const taskDateElemArr = Array.from(
        document.querySelectorAll('.task-date')
      ) as HTMLElement[]

      taskClassValue.tasks.forEach((task) => {
        const li = document.createElement('li')
        li.textContent = task.title
        li.classList.add(task.status)
        taskDateElemArr.forEach((taskDateElem) => {
          if (task.date === taskDateElem.dataset.taskdate) {
            taskDateElem.append(li)
          }
        })
      })
    }
  }
}
