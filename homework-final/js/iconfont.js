!(function (t) {
  var e,
    n,
    o,
    i,
    c,
    l,
    d =
      '<svg><symbol id="icon-love" viewBox="0 0 1024 1024"><path d="M675.242667 138.88c-55.296 2.645333-106.368 27.306667-144.554667 67.413333l-8.021333 8.832-0.597334-0.64c-40.96-47.402667-99.029333-75.818667-161.877333-75.818666-122.88 0-221.525333 107.562667-221.525333 238.848 0 200.021333 162.048 370.048 343.893333 451.114666l27.52 11.52a32 32 0 0 0 20.224 1.706667l4.949333-1.706667c0.128 0 20.224-8.277333 27.477334-11.52 181.930667-81.066667 343.936-251.093333 343.936-451.114666 0-131.413333-98.432-238.848-221.525334-238.848l-9.898666 0.213333z " fill="" ></path></symbol><symbol id="icon-phone" viewBox="0 0 1024 1024"><path d="M914.285714 708.571429q0 15.428571-5.714286 40.285714t-12 39.142857q-12 28.571429-69.714286 60.571429-53.714286 29.142857-106.285714 29.142857-15.428571 0-30-2t-32.857143-7.142857-27.142857-8.285714-31.714286-11.714286-28-10.285714q-56-20-100-47.428571-73.142857-45.142857-151.142857-123.142857t-123.142857-151.142857q-27.428571-44-47.428571-100-1.714286-5.142857-10.285714-28t-11.714286-31.714286-8.285714-27.142857-7.142857-32.857143-2-30q0-52.571429 29.142857-106.285714 32-57.714286 60.571429-69.714286 14.285714-6.285714 39.142857-12t40.285714-5.714286q8 0 12 1.714286 10.285714 3.428571 30.285714 43.428571 6.285714 10.857143 17.142857 30.857143t20 36.285714 17.714286 30.571429q1.714286 2.285714 10 14.285714t12.285714 20.285714 4 16.285714q0 11.428571-16.285714 28.571429t-35.428571 31.428571-35.428571 30.285714-16.285714 26.285714q0 5.142857 2.857143 12.857143t4.857143 11.714286 8 13.714286 6.571429 10.857143q43.428571 78.285714 99.428571 134.285714t134.285714 99.428571q1.142857 0.571429 10.857143 6.571429t13.714286 8 11.714286 4.857143 12.857143 2.857143q10.285714 0 26.285714-16.285714t30.285714-35.428571 31.428571-35.428571 28.571429-16.285714q8 0 16.285714 4t20.285714 12.285714 14.285714 10q14.285714 8.571429 30.571429 17.714286t36.285714 20 30.857143 17.142857q40 20 43.428571 30.285714 1.714286 4 1.714286 12z"  ></path></symbol><symbol id="icon-email" viewBox="0 0 1024 1024"><path d="M513 583.8l448.5-448.5c-11.6-4.7-24.3-7.3-37.5-7.3H100c-12.7 0-24.9 2.4-36.1 6.7L513 583.8z" fill="" ></path><path d="M513 674.3L14.6 175.9C5.3 191.1 0 208.9 0 228v568c0 55.2 44.8 100 100 100h824c55.2 0 100-44.8 100-100V228c0-18.5-5.1-35.9-13.9-50.8L513 674.3z" fill="" ></path></symbol></svg>',
    a = (a = document.getElementsByTagName('script'))[
      a.length - 1
    ].getAttribute('data-injectcss')
  if (a && !t.__iconfont__svg__cssinject__) {
    t.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>',
      )
    } catch (t) {
      console && console.log(t)
    }
  }
  function s() {
    c || ((c = !0), o())
  }
  ;(e = function () {
    var t, e, n
    ;((n = document.createElement('div')).innerHTML = d),
      (d = null),
      (e = n.getElementsByTagName('svg')[0]) &&
        (e.setAttribute('aria-hidden', 'true'),
        (e.style.position = 'absolute'),
        (e.style.width = 0),
        (e.style.height = 0),
        (e.style.overflow = 'hidden'),
        (t = e),
        (n = document.body).firstChild
          ? (e = n.firstChild).parentNode.insertBefore(t, e)
          : n.appendChild(t))
  }),
    document.addEventListener
      ? ~['complete', 'loaded', 'interactive'].indexOf(document.readyState)
        ? setTimeout(e, 0)
        : ((n = function () {
            document.removeEventListener('DOMContentLoaded', n, !1), e()
          }),
          document.addEventListener('DOMContentLoaded', n, !1))
      : document.attachEvent &&
        ((o = e),
        (i = t.document),
        (c = !1),
        (l = function () {
          try {
            i.documentElement.doScroll('left')
          } catch (t) {
            return void setTimeout(l, 50)
          }
          s()
        })(),
        (i.onreadystatechange = function () {
          'complete' == i.readyState && ((i.onreadystatechange = null), s())
        }))
})(window)
