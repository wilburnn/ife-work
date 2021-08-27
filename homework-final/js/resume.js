// Selectors
const experienceNav = document.querySelector('.experience__nav')
const extraPhotosContainer = document.querySelector('.extra-photos')
const messageAuthorElem = document.querySelector('.edit__author')
const messageContentElem = document.querySelector('.edit__content')
const messageSubmitBtn = document.querySelector('.edit__submit')
const bbsContent = document.querySelector('.bbs__content')

/**
 * Click tab to switch experience
 * @event click#change
 */
function handleExperienceSwitch(event) {
  if (event.target.tagName !== 'LI') {
    return
  }

  const navTarget = event.target
  const navEdu = document.querySelector('.experience__nav--edu')
  const navWork = document.querySelector('.experience__nav--work')
  const navTargetContent = navTarget.textContent.trim()
  const experienceEdu = document.querySelector('.experience__education')
  const experienceWork = document.querySelector('.experience__work')

  if (navTargetContent === '教育经历') {
    navTarget.style.borderBottom = 0
    experienceEdu.style.display = 'block'
    experienceWork.style.display = 'none'
    navWork.style.borderBottom = '1px solid #000'
  } else if (navTargetContent === '工作经历') {
    navTarget.style.borderBottom = 0
    experienceWork.style.display = 'block'
    experienceEdu.style.display = 'none'
    navEdu.style.borderBottom = '1px solid #000'
  }
}

/**
 * Implement thumb up effect
 * @event click#change
 */
function handleLike(event) {
  let svg = event.target.closest('svg')
  if (!svg) return
  if (svg.matches('svg.icon-love')) {
    svg.style.fill = svg.style.fill ? '' : '#e71d36'
  }
}

/**
 * Determines if the input is empty
 */
function messageCheck() {
  const messageAuthor = messageAuthorElem.value.trim()
  const messageContent = messageContentElem.value.trim()

  if (messageAuthor && messageContent) {
    messageToBoard(messageAuthor, messageContent)
  } else {
    alert('输入不为空')
  }
}

/**
 * Display the new message content to the top one in the message content area
 * @param {string} author
 * @param {string} content
 */
function messageToBoard(messageAuthor, messageContent) {
  let commentContainer = document.createElement('div')
  commentContainer.className = 'bbs__comment'

  let avatarContainer = document.createElement('div')
  avatarContainer.className = 'comment__avatar'
  let nameAbbr = document.createElement('span')
  nameAbbr.textContent = messageAuthor.slice(0, 1)
  let name = document.createElement('span')
  name.textContent = messageAuthor
  avatarContainer.append(nameAbbr, name)

  let contentContainer = document.createElement('div')
  contentContainer.className = 'comment__content'
  let content = document.createElement('p')
  content.textContent = messageContent
  contentContainer.append(content)

  commentContainer.append(avatarContainer, contentContainer)
  bbsContent.prepend(commentContainer)
}

// Event binding
experienceNav.addEventListener('click', handleExperienceSwitch, false)
extraPhotosContainer.addEventListener('click', handleLike, false)
messageSubmitBtn.addEventListener('click', messageCheck, false)
