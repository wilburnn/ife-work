import './style.less'
import './icon/iconfont.js'
import TaskClass from './ts/task-class'
import ElementsOfPage from './ts/dom'
import TaskList from './ts/task-list'

window.onload = function () {
  if (!localStorage.getItem('默认分类')) {
    const defaultClass = { category: '', tasks: [] } as TaskClassType
    localStorage.setItem('默认分类', JSON.stringify(defaultClass))
  }
  new TaskClass()
  new TaskList()
  const elementsOfPage = new ElementsOfPage()
  elementsOfPage.renderTaskClass()
  elementsOfPage.renderTaskList()
}
