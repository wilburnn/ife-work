/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import './TaskClassModal.less'
import './ModalAnimate.less'

const AddTaskClassModal = () => {
  const AddTaskClassModal = document.createElement('div')
  AddTaskClassModal.innerHTML = `
    <div class="addplan-modal-wrap">
      <div class="addplan-modal-content">
        <button
          class="addplan-modal-close"
          type="button"
          aria-label="close">
          <span class="addplan-modal-close-icon">&#xe71f;</span>
        </button>
        <div class="addplan-modal-header">
          <div class="addplan-modal-title">新增分类</div>
        </div>
        <form>
          <div class="addplan-modal-body">
            <div class="form-group">
              <label>
                <span class="form-group-title">标题</span>
                <input
                  type="text"
                  class="task-class-input"
                  name="plan-title"
                  placeholder="请输入分类名称"
                  required />
              </label>
            </div>
          </div>
          <div class="addplan-modal-footer">
            <button
              class="addplan-btn addplan-btn-cancel"
              type="button">
              <span>取 消</span>
            </button>
            <button class="addplan-btn addplan-btn-confirm" type="button">
              <span>确 定</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  `
  document.body.append(AddTaskClassModal)

  const modalBackground = document.querySelector(
    '.addplan-modal-wrap'
  )! as HTMLDivElement
  modalBackground.style.display = 'block'

  const closeBtn = document.querySelector('.addplan-modal-close')!
  closeBtn.addEventListener('click', function () {
    modalBackground.parentElement!.remove()
  })

  const cancelBtn = document.querySelector('.addplan-btn-cancel')!
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

export default AddTaskClassModal
