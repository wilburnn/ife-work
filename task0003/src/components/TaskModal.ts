/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import './TaskModal.less'
import './ModalAnimate.less'
import './DatePicker'

const AddTaskModal = () => {
  const AddTaskModal = document.createElement('div')
  AddTaskModal.innerHTML = `
    <div class="addtodo-modal-wrap">
      <div class="addtodo-modal-content">
        <button
          class="addtodo-modal-close"
          type="button"
          aria-label="close"
        >
          <span class="addtodo-modal-close-icon">&#xe71f;</span>
        </button>
        <div class="addtodo-modal-header">
          <div class="addtodo-modal-title">新增任务</div>
        </div>
        <form>
          <div class="addtodo-modal-body">
            <div class="form-group">
              <label>
                <span>标题</span>
                <input
                  type="text"
                  class="form-input"
                  name="todo-title"
                  value=""
                  placeholder="请输入待办标题"
                  required
                />
              </label>
            </div>
            <div class="form-group">
              <span>日期</span>
              <date-picker format="YYYY-MM-DD"></date-picker>
            </div>
            <div class="form-group form-textarea-wrap">
              <label>
                <span>内容</span>
                <textarea
                  class="form-input form-textarea"
                  name="todo-description"
                  placeholder="请输入待办内容"
                  row="5"
                  cols="10"
                  required
                ></textarea>
              </label>
            </div>
          </div>
          <div class="addtodo-modal-footer">
            <button
              class="addtodo-btn addtodo-btn-cancel"
              type="button"
            >
              <span>取 消</span>
            </button>
            <button class="addtodo-btn addtodo-btn-confirm" type="button">
              <span>确 定</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
  document.body.append(AddTaskModal)

  const modalBackground = document.querySelector(
    '.addtodo-modal-wrap'
  )! as HTMLDivElement
  modalBackground.style.display = 'block'

  const closeBtn = document.querySelector('.addtodo-modal-close')!
  closeBtn.addEventListener('click', function () {
    modalBackground.parentElement!.remove()
  })

  const cancelBtn = document.querySelector('.addtodo-btn-cancel')!
  cancelBtn.addEventListener('click', function () {
    modalBackground.parentElement!.remove()
  })

  modalBackground.addEventListener('click', function (event) {
    // check if the event happened on the modal-background
    if (event.target === modalBackground) {
      modalBackground.parentElement!.remove()
    }
  })
}

export default AddTaskModal
