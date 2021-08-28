!(function (t) {
  var e,
    n,
    o,
    c,
    l,
    i =
      '<svg><symbol id="icon-finish" viewBox="0 0 1024 1024"><path d="M828.256874 193.254445c-84.71645-84.71952-197.355857-131.374096-317.163523-131.374096S278.646278 108.535949 193.929828 193.254445C109.212354 277.971919 62.556755 390.609279 62.556755 510.417969c0 87.284949 25.098631 171.905208 72.581062 244.714468 9.41237 14.433734 28.744671 18.502399 43.179428 9.092076 14.432711-9.41237 18.504446-28.744671 9.091052-43.178405-40.854477-62.645782-62.448284-135.479601-62.448284-210.628138 0-212.914204 173.220157-386.135384 386.135384-386.135384S897.230782 297.502741 897.230782 510.417969 724.009601 896.55233 511.093351 896.55233c-70.50375 0-139.479705-19.171642-199.470007-55.43966-14.745842-8.91709-33.92874-4.190439-42.844807 10.556427-8.915044 14.747889-4.189416 33.929764 10.558473 42.843784 69.730131 42.158169 149.870356 64.442708 231.756341 64.442708 119.80869 0 232.447073-46.6556 317.163523-131.374096 84.717474-84.71645 131.373073-197.355857 131.373073-317.1625C959.628924 390.610302 912.974347 277.971919 828.256874 193.254445L828.256874 193.254445z"  ></path><path d="M438.159248 712.514803c10.113335 0 20.228717-3.859911 27.945469-11.57564l297.673633-297.673633c15.432481-15.432481 15.432481-40.456411 0-55.889915-15.434527-15.434527-40.458457-15.434527-55.892985 0L438.159248 617.102756 317.2679 496.212432c-15.432481-15.437597-40.458457-15.437597-55.891961 0-15.434527 15.434527-15.434527 40.457434 0 55.889915l148.835793 148.836817C417.929508 708.655915 428.04489 712.514803 438.159248 712.514803L438.159248 712.514803z"  ></path></symbol><symbol id="icon-edit" viewBox="0 0 1024 1024"><path d="M312.96 565.824l408.192-408.192 135.232 135.232-408.128 408.128L312.96 565.824zM268.48 610.304l137.216 137.216-207.488 67.84 70.272-205.056zM944.32 212.672c45.312-45.312 24.832-75.712-20.48-121.024s-74.432-64.512-119.744-19.2l-37.184 39.68 137.344 137.92 40.064-37.376z"  ></path><path d="M640 64V0H0v1022.016h1024v-640h-64v576H64V64h576z"  ></path></symbol><symbol id="icon-folder" viewBox="0 0 1024 1024"><path d="M864.79872 381.81376h-4.77696V307.61472c0-31.29856-25.4976-56.82688-56.82688-56.82688H493.824v-39.4752c0-31.29856-25.4976-56.80128-56.80128-56.80128H154.10688C122.7776 154.51136 97.28 180.01408 97.28 211.31264v601.40032c0 31.32416 25.4976 56.77568 56.82688 56.77568h649.09312c31.32416 0 56.82688-25.45152 56.72448-55.72608L921.6 438.61504c0-31.30368-25.4976-56.80128-56.80128-56.80128zM152.87296 241.70496c0-24.5248 7.07584-31.62624 31.60064-31.62624h222.1824c24.448 0 31.54944 7.10144 31.54944 31.62624V300.0832l1.57696 6.2976h333.10208c24.4736 0 31.54944 7.10144 31.54944 31.54944v43.8784h-583.68c-31.29856 0-56.80128 25.4976-56.75008 55.82336l-11.12576 72.35072-0.00512-268.27776z m651.55584 540.59008c0 24.5248-7.07584 31.60064-31.60064 31.60064H189.5936c-24.5248 0-31.60064-7.07584-31.69792-30.42304l61.67552-314.48576c0-24.4992 7.10144-31.60064 31.54944-31.60064H834.4064c24.4736 0 31.57504 7.10144 31.67744 30.42304l-61.65504 314.48576z"  ></path></symbol><symbol id="icon-document" viewBox="0 0 1024 1024"><path d="M798.6 337.8c-1.4-5.8-4-10-7-13.6l-167.4-183.4c-3.8-4.2-8.2-6.2-13.2-8.8-5.8-3-12.2-3.2-18.8-3.2L272.4 128.8c-24.8 0-47.4 19.2-47.4 45.8l0 670.4c0 26.8 22.6 51.8 47.4 51.8l486.2 0c24.8 0 42.4-25 42.4-51.8L801 356.8C801 349.6 800.2 344.4 798.6 337.8zM611 222l116 127-116 0L611 222zM289 833l0-640 258 0 0 163.4c0 29.6 26.8 56.6 56.2 56.6l133.8 0 0 420L289 833z"  ></path></symbol><symbol id="icon-delete" viewBox="0 0 1024 1024"><path d="M784 288.96l-56.56-56.576L512.464 447.36 297.504 232.384l-56.56 56.576 214.96 214.96L240.96 718.896l56.56 56.56L512.464 560.48l214.976 214.976L784 718.88 569.04 503.92z" fill="#565D64" ></path></symbol><symbol id="icon-plus" viewBox="0 0 1024 1024"><path d="M576 64H448v384H64v128h384v384h128V576h384V448H576z" fill="#595959" ></path></symbol></svg>',
    d = (d = document.getElementsByTagName('script'))[
      d.length - 1
    ].getAttribute('data-injectcss'),
    a = function (t, e) {
      e.parentNode.insertBefore(t, e)
    }
  if (d && !t.__iconfont__svg__cssinject__) {
    t.__iconfont__svg__cssinject__ = !0
    try {
      document.write(
        '<style>.svgfont {display: inline-block;width: 1em;height: 1em;fill: currentColor;vertical-align: -0.1em;font-size:16px;}</style>'
      )
    } catch (t) {
      console && console.log(t)
    }
  }
  function s() {
    l || ((l = !0), o())
  }
  function h() {
    try {
      c.documentElement.doScroll('left')
    } catch (t) {
      return void setTimeout(h, 50)
    }
    s()
  }
  ;(e = function () {
    var t, e
    ;((e = document.createElement('div')).innerHTML = i),
      (i = null),
      (t = e.getElementsByTagName('svg')[0]) &&
        (t.setAttribute('aria-hidden', 'true'),
        (t.style.position = 'absolute'),
        (t.style.width = 0),
        (t.style.height = 0),
        (t.style.overflow = 'hidden'),
        (e = t),
        (t = document.body).firstChild ? a(e, t.firstChild) : t.appendChild(e))
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
        (c = t.document),
        (l = !1),
        h(),
        (c.onreadystatechange = function () {
          'complete' == c.readyState && ((c.onreadystatechange = null), s())
        }))
})(window)
