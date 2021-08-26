// Check whether it's a array
// Array.isArray([1, 2, 3])

/**
 * Check whether it's a function
 * @param {Function} fn
 * @returns {boolean}
 */
function isFunction(fn) {
  return typeof fn === 'function'
}

/**
 * Implement a deep clone using recursion to copy a target object
 * @param {Object} src Object types are limited to number, string, boolean, date, array, and object,
 *   not include function, RegExp object, etc
 * @returns {Object}
 */
function cloneObject(src) {
  // Check primitive
  if (
    Object.prototype.toString.call(src) !== '[object Array]' &&
    Object.prototype.toString.call(src) !== '[object Object]'
  ) {
    return src
  } else {
    for (let x in src) {
      if (
        Object.prototype.toString.call(src) !== '[object Array]' &&
        Object.prototype.toString.call(src) !== '[object Object]'
      ) {
        let result = {}
        result.x = src.x
      } else {
        // Recursion
        return Object.assign(result, cloneObject(x))
      }
    }
  }
}

/**
 * To derepeat an array, consider only the elements of the array as number or string
 * @param {Array} arr
 * @returns {Array}
 */
function uniqArray(arr) {
  return Array.from(new Set(arr))
}

// /**
//  * To derepeat an array, consider only the elements of the array as number or string
//  * @param {Array} arr
//  * @returns {Array}
//  */
// function uniqArray(arr) {
//   for (i = 0; i < arr.length; i++) {
//     for (var j = i + 1; j < arr.length; j++) {
//       if (arr[i] === arr[j]) {
//         arr.splice(j, 1)
//         j--
//       }
//     }
//   }
//   return arr
// }

/**
 * Remove leading and trailing whitespace with regular expressions
 * @param {string} str
 * @returns {string}
 */
function trim(str) {
  return str.replace(/^s+|s+$/g, '')
}

/**
 *
 * @param {HTMLElement} element
 * @returns
 */
function getPosition(element) {
  const { x, y } = element.getBoundingClientRect()
  return { x: x, y: y }
}

/**
 * Check whether it is an email address
 * @param {string} emailStr
 */
function isEmail(emailStr) {
  const emailPattern =
    /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/
  return emailPattern.test(emailStr)
}

/**
 * Check whether it is a mobile phone number
 * @param {string} phone
 */
function isMobilePhone(phone) {
  return /1\d{10}/.test(phone)
}

/**
 * Gets the number of elements at the first level in an object
 * @param {Object} obj
 * @returns {number} An integer
 */
function getObjectLength(obj) {
  return Object.keys(obj).length
}

/**
 * Check whether siblingNode and element are elements of the same level
 *   under the same parent element
 * @param {HTMLElement} element
 * @param {HTMLElement} siblingNode
 * @returns {boolean}
 */
function isSiblingNode(element, siblingNode) {
  if (element.parentElement === siblingNode.parentElement) {
    return true
  } else {
    return false
  }
}

/**
 * The dependent function of the $function
 * @param {string} selector Smilar to CSS format
 * @param {Object} root Optional, the parent of selector.
 *     If it doesn't exist, it's document
 * @returns {Array} the array of nodes retrieved.
 *     Note that the id selector returns an array as well
 */
function vQuery(selector, root) {
  // store the result node
  let elements = []
  // store an array of retrieved temporary nodes
  let allChildren = null
  // If root is not present, assign document
  root = root || document
  switch (selector.charAt(0)) {
    case '#':
      // get DOM by id
      elements.push(root.getElementById(selector.substring(1)))
      break
    case '.':
      // get DOM by class
      elements = root.getElementsByClassName(selector.substring(1))
      break
    case '[':
      // get DOM by attribute
      if (selector.indexOf('=') === -1) {
        // attribute has no value
        allChildren = root.getElementsByTagName('*')
        for (let i = 0, len = allChildren.length; i < len; i++) {
          if (allChildren[i].getAttribute(selector.slice(1, -1)) !== null) {
            elements.push(allChildren[i])
          }
        }
      } else {
        // attribute has value
        let index = selector.indexOf('=')
        allChildren = root.getElementsByTagName('*')
        for (let i = 0, len = allChildren.length; i < len; i++) {
          if (
            allChildren[i].getAttribute(selector.slice(1, index)) ===
            selector.slice(index + 1, -1)
          ) {
            elements.push(allChildren[i])
          }
        }
      }
      break
    default:
      // get DOM by tagname
      elements = root.getElementsByTagName(selector)
  }
  return elements
}

/**
 * Mimics jQuery's mini $selector
 * @param {string} selector Smilar to CSS format,
 *     Support for simple descendant selectors (Level 1 only)
 * @returns {Object} Returns the first node retrieved, for descendant selector,
 *     returns the first eligible object in the first object
 */
function $(selector) {
  if (selector === document) {
    return document
  }
  selector = selector.trim()
  // If the string is separated by spaces, use the descendant selector
  if (selector.indexOf(' ') !== -1) {
    // Split into an array, with the first item being parent and the second item being chlid
    let selectorArr = selector.split(/\s+/)
    return vQuery(selectorArr[1], vQuery(selectorArr[0])[0])[0]
  } else {
    return vQuery(selector, document)[0]
  }
}

/**
 * Bind the element to an event handler
 * @param {Object} element The object to which the event is bound
 * @param {string} event Event type
 * @param {Function} listener The function executed when the event occurs
 */
function addEvent(element, event, listener) {
  if (element.addEventListener) {
    element.addEventListener(event, listener, false)
  } else if (element.attachEvent) {
    // Compatible with lower version of IE
    element.attachEvent('on' + event, listener)
  } else {
    element['on' + event] = listener
  }
}

/**
 * Removes the event handler for the element
 * @param {Object} element
 * @param {string} event
 * @param {Function} listener
 */
function removeEvent(element, event, listener) {
  if (element.removeEventListener) {
    element.removeEventListener(event, listener, false)
  } else if (element.detachEvent) {
    // Compatible with lower version of IE
    element.detachEvent('on' + event, listener)
  } else {
    element['on' + event] = null
  }
}

/**
 * Bind the click event
 * @param {Object} element
 * @param {Function} listener
 */
function addClickEvent(element, listener) {
  addEvent(element, 'click', listener)
}

/**
 * Bind the enter event
 * @param {Object} element
 * @param {Function} listener
 */
function addEnterEvent(element, listener) {
  addEvent(element, 'keydown', listener)
}

/**
 * Event delegation
 * @param {Object} element The parent element that needs to be delegated to the event
 * @param {string} tag The tag that needs to trigger the event
 * @param {string} eventName Event type
 * @param {Function} listener
 */
function delegateEvent(element, tag, eventName, listener) {
  return addEvent(element, eventName, function (evt) {
    // Support IE6-8
    let target = evt.target || evt.srcElement
    if (target.tagName.toLocaleLowerCase() === tag) {
      listener.call(target, evt)
    }
  })
}

/**
 * Function encapsulation
 * @param {string} selector
 * @param {string} event
 * @param {Function} listener
 */
$.on = function (selector, event, listener) {
  let node = document.querySelector(selector)
  return addEvent(node, event, listener)
}
$.un = function (selector, event, listener) {
  let node = document.querySelector(selector)
  return removeEvent(node, event, listener)
}
$.click = function (selector, listener) {
  let node = document.querySelector(selector)
  return addClickEvent(node, listener)
}
$.enter = function (selector, listener) {
  let node = document.querySelector(selector)
  return addEnterEvent(node, listener)
}
$.delegate = function (selector, tag, event, listener) {
  let node = document.querySelector(selector)
  return delegateEvent(node, tag, event, listener)
}

/**
 * Set cookie
 * @param {string} cookieName
 * @param {string} cookieValue
 * @param {number} expiredays
 */
function setCookie(cookieName, cookieValue, expiredays) {
  let date = new Date(Date.now() + expiredays * 86400e3)
  date = date.toUTCString()
  document.cookie =
    encodeURIComponent(cookieName) +
    '=' +
    encodeURIComponent(cookieValue) +
    'expires=' +
    date
}

/**
 * returns the cookie with the given name,
 *   or undefined if not found
 * @param {string} cookieName
 */
function getCookie(cookieName) {
  let matches = document.cookie.match(
    new RegExp(
      '(?:^|; )' +
        cookieName.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') +
        '=([^;]*)',
    ),
  )
  return matches ? decodeURIComponent(matches[1]) : undefined
}
