/**
 * Gets the number of weeks that have passed from the new year
 * @param date Date
 * @returns Total week number
 */
function getWeekNumber(date: Date): number {
  const firstDayOfTheYear = new Date(date.getFullYear(), 0, 1)
  const pastDaysOfYear =
    (date.getTime() - firstDayOfTheYear.getTime()) / 86400000

  return Math.ceil((pastDaysOfYear + firstDayOfTheYear.getDay() + 1) / 7)
}

/**
 * Determine if it is a leap year
 * @param year
 * @returns
 */
function isLeapYear(year: number): boolean {
  return year % 100 === 0 ? year % 400 === 0 : year % 4 === 0
}

/**
 * Extract data from the date, today and so on
 */
class Day {
  Date: Date
  date: number
  day: string
  dayNumber: number
  dayShort: string
  year: number
  yearShort: string
  month: string
  monthShort: string
  monthNumber: number
  timestamp: number
  week: number

  constructor(date: null | Date, lang = 'default') {
    date = date ?? new Date()

    this.Date = date
    this.date = date.getDate()
    this.day = date.toLocaleString(lang, { weekday: 'long' })
    this.dayNumber = date.getDay() + 1
    this.dayShort = date.toLocaleString(lang, { weekday: 'short' })
    this.year = date.getFullYear()
    this.yearShort = date.toLocaleString(lang, { year: '2-digit' })
    this.month = date.toLocaleString(lang, { month: 'long' })
    this.monthShort = date.toLocaleString(lang, { month: 'short' })
    this.monthNumber = date.getMonth() + 1
    this.timestamp = date.getTime()
    this.week = getWeekNumber(date)
  }

  get isToday() {
    return this.isEqualTo(new Date())
  }

  isEqualTo(date: Date) {
    date = date instanceof Day ? date.Date : date

    return (
      date.getDate() === this.date &&
      date.getMonth() === this.monthNumber - 1 &&
      date.getFullYear() === this.year
    )
  }

  format(formatStr: string) {
    return formatStr
      .replace(/\bYYYY\b/, this.year.toString())
      .replace(/\bYYY\b/, this.yearShort)
      .replace(/\bWW\b/, this.week.toString().padStart(2, '0'))
      .replace(/\bW\b/, this.week.toString())
      .replace(/\bDDDD\b/, this.day)
      .replace(/\bDDD\b/, this.dayShort)
      .replace(/\bDD\b/, this.date.toString().padStart(2, '0'))
      .replace(/\bD\b/, this.date.toString())
      .replace(/\bMMMM\b/, this.month)
      .replace(/\bMMM\b/, this.monthShort)
      .replace(/\bMM\b/, this.monthNumber.toString().padStart(2, '0'))
      .replace(/\bM\b/, this.monthNumber.toString())
  }
}

/**
 * Get some data like month from calss Day
 */
class Month {
  lang: string
  name: string
  number: number
  numberOfDays: number
  year: number

  constructor(date: null | Date, lang = 'default') {
    const day = new Day(date, lang)
    const monthsSize = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    this.lang = lang

    this.name = day.month
    this.number = day.monthNumber
    this.year = day.year
    this.numberOfDays = monthsSize[this.number - 1]

    if (this.number === 2) {
      this.numberOfDays += isLeapYear(day.year) ? 1 : 0
    }

    // @ts-ignore
    this[Symbol.iterator] = function* () {
      let number = 1
      yield this.getDay(number)
      while (number < this.numberOfDays) {
        ++number
        yield this.getDay(number)
      }
    }
  }

  getDay(date: number) {
    return new Day(new Date(this.year, this.number - 1, date), this.lang)
  }
}

/**
 * Get some data like month, today, weekdays ang year from class Day and class Month
 */
class Calendar {
  lang: string
  today: Day
  year: number
  month: Month
  weekDays = Array.from<string>({ length: 7 })

  constructor(
    year: null | number,
    monthNumber: null | number,
    lang = 'default'
  ) {
    this.today = new Day(null, lang)
    this.year = year ?? this.today.year
    this.month = new Month(
      new Date(this.year, (monthNumber || this.today.monthNumber) - 1),
      lang
    )
    this.lang = lang

    // @ts-ignore
    this[Symbol.iterator] = function* () {
      let number = 1
      yield this.getMonth(number)
      while (number < 12) {
        ++number
        yield this.getMonth(number)
      }
    }

    this.weekDays.forEach((_, i) => {
      const day = this.month.getDay(i + 1)
      if (!this.weekDays.includes(day.day)) {
        this.weekDays[day.dayNumber - 1] = day.day
      }
    })
  }

  get isLeapYear() {
    return isLeapYear(this.year)
  }

  getMonth(monthNumber: number) {
    return new Month(new Date(this.year, monthNumber - 1), this.lang)
  }

  getPreviousMonth() {
    if (this.month.number === 1) {
      return new Month(new Date(this.year - 1, 11), this.lang)
    }

    return new Month(new Date(this.year, this.month.number - 2), this.lang)
  }

  getNextMonth() {
    if (this.month.number === 12) {
      return new Month(new Date(this.year + 1, 0), this.lang)
    }

    return new Month(new Date(this.year, this.month.number + 2), this.lang)
  }

  goToDate(monthNumber: number, year: number) {
    this.month = new Month(new Date(year, monthNumber - 1), this.lang)
    this.year = year
  }

  goToNextYear() {
    this.year += 1
    this.month = new Month(new Date(this.year, 0), this.lang)
  }

  goToPreviousYear() {
    this.year -= 1
    this.month = new Month(new Date(this.year, 11), this.lang)
  }

  goToNextMonth() {
    if (this.month.number === 12) {
      return this.goToNextYear()
    }

    this.month = new Month(
      new Date(this.year, this.month.number + 1 - 1),
      this.lang
    )
  }

  goToPreviousMonth() {
    if (this.month.number === 1) {
      return this.goToPreviousYear()
    }

    this.month = new Month(
      new Date(this.year, this.month.number - 1 - 1),
      this.lang
    )
  }
}

/**
 * Create a custom DatePicker element
 */
class DatePicker extends HTMLElement {
  format = 'MMM DD, YYYY'
  position = 'bottom'
  date: Day | undefined
  mounted = false
  // elements
  toggleButton: HTMLDivElement | undefined
  datePickerInput: HTMLInputElement | undefined
  calendarDropDown: HTMLDivElement | undefined
  calendarDateElement: HTMLHeadingElement | undefined
  calendarDaysContainer: HTMLDivElement | undefined
  selectedDayElement: HTMLButtonElement | undefined

  calendar: Calendar
  shadow: ShadowRoot

  constructor() {
    super()

    const lang = window.navigator.language
    const date = new Date(this.getAttribute('date') || Date.now())

    this.shadow = this.attachShadow({ mode: 'open' })
    this.date = new Day(date, lang)
    this.calendar = new Calendar(this.date.year, this.date.monthNumber, lang)

    this.format = this.getAttribute('format') || this.format
    this.position = DatePicker.position.includes(this.getAttribute('position')!)
      ? this.getAttribute('position')!
      : this.position

    this.render()
  }

  connectedCallback() {
    this.mounted = true

    this.toggleButton = this.shadow.querySelector(
      '.date-toggle'
    ) as HTMLDivElement

    this.datePickerInput = this.shadow.querySelector(
      '.date-toggle > input'
    ) as HTMLInputElement

    this.calendarDropDown = this.shadow.querySelector(
      '.calendar-dropdown'
    ) as HTMLDivElement

    // @ts-ignore
    const [prevBtn, calendarDateElement, nextButton] =
      this.calendarDropDown.querySelector('.date-picker-header')!.children

    this.calendarDateElement = calendarDateElement

    this.calendarDaysContainer = this.calendarDropDown.querySelector(
      '.month-days'
    ) as HTMLDivElement

    this.toggleButton.addEventListener('click', () => this.toggleCalendar())
    prevBtn.addEventListener('click', () => this.prevMonth())
    nextButton.addEventListener('click', () => this.nextMonth())
    document.addEventListener('click', (e) => this.handleClickOut(e))

    this.renderCalendarDays()
  }

  attributeChangedCallback(name: string, newValue: string) {
    if (!this.mounted) return

    switch (name) {
      case 'date':
        this.date = new Day(new Date(newValue))
        this.calendar.goToDate(this.date.monthNumber, this.date.year)
        this.renderCalendarDays()
        this.updateToggleText()
        break
      case 'format':
        this.format = newValue
        this.updateToggleText()
        break
      case 'position':
        this.position = DatePicker.position.includes(newValue)
          ? newValue
          : this.position
        this.calendarDropDown!.className = `calendar-dropdown ${this.position}`
        break
    }
  }

  toggleCalendar() {
    this.calendarDropDown!.style.display = 'block'
  }

  handleClickOut(e: MouseEvent) {
    if (this !== e.target) {
      this.calendarDropDown!.style.display = 'none'
    }
  }

  prevMonth() {
    this.calendar.goToPreviousMonth()
    this.renderCalendarDays()
  }

  nextMonth() {
    this.calendar.goToNextMonth()
    this.renderCalendarDays()
  }

  updateHeaderText() {
    this.calendarDateElement!.textContent = `${this.calendar.year}年 ${this.calendar.month.number}月`
    const monthYear = `${this.calendar.year}年 ${this.calendar.month.number}月`
    this.calendarDateElement!.setAttribute(
      'aria-label',
      `current month ${monthYear}`
    )
  }

  isSelectedDate(date: Day) {
    return (
      date.date === this.date!.date &&
      date.monthNumber === this.date!.monthNumber &&
      date.year === this.date!.year
    )
  }

  isCurrentCalendarMonth() {
    return (
      this.calendar.month.number === this.date!.monthNumber &&
      this.calendar.year === this.date!.year
    )
  }

  selectDay(el: HTMLButtonElement, day: Day) {
    this.date = day

    if (day.monthNumber !== this.calendar.month.number) {
      this.prevMonth()
    } else {
      el.classList.add('selected')
      this.selectedDayElement!.classList.remove('selected')
      this.selectedDayElement = el
    }

    this.toggleCalendar()
    this.updateToggleText()

    this.calendarDropDown!.style.display = 'none'
  }

  getWeekDaysElementStrings() {
    return this.calendar.weekDays
      .map((weekDay) => `<span>${weekDay.substring(2, 3)}</span>`)
      .join('')
  }

  getMonthDaysGrid() {
    const firstDayOfTheMonth = this.calendar.month.getDay(1)
    const prevMonth = this.calendar.getPreviousMonth()
    const totalLastMonthFinalDays = firstDayOfTheMonth.dayNumber - 1
    const totalDays = this.calendar.month.numberOfDays + totalLastMonthFinalDays
    const monthList = Array.from({ length: totalDays })

    for (let i = totalLastMonthFinalDays; i < totalDays; i++) {
      monthList[i] = this.calendar.month.getDay(i + 1 - totalLastMonthFinalDays)
    }

    for (let i = 0; i < totalLastMonthFinalDays; i++) {
      const inverted = totalLastMonthFinalDays - (i + 1)
      monthList[i] = prevMonth.getDay(prevMonth.numberOfDays - inverted)
    }

    return monthList as Day[]
  }

  updateToggleText() {
    const date = this.date!.format(this.format)
    this.datePickerInput!.title = date
    this.datePickerInput!.value = date
  }

  updateMonthDays() {
    this.calendarDaysContainer!.innerHTML = ''

    this.getMonthDaysGrid().forEach((day) => {
      const el = document.createElement('button')
      el.className = 'month-day'
      el.textContent = day.date.toString()
      el.addEventListener('click', () => this.selectDay(el, day))
      el.setAttribute('aria-label', day.format(this.format))

      if (day.monthNumber === this.calendar.month.number) {
        el.classList.add('current')
      } else {
        el.classList.add('not-current')
      }

      if (this.isSelectedDate(day)) {
        el.classList.add('selected')
        this.selectedDayElement = el
      }

      this.calendarDaysContainer!.appendChild(el)
    })
  }

  renderCalendarDays() {
    this.updateHeaderText()
    this.updateMonthDays()
    this.calendarDateElement!.focus()
  }

  static get observedAttributes() {
    return ['date', 'format', 'position']
  }

  static get position() {
    return ['top', 'left', 'bottom', 'right']
  }

  get datePickerStyle() {
    return `
      *;
      ::before;
      ::after {
        box-sizing: border-box;
        margin: 0;
        padding: 0;
      }

      :host {
        position: relative;
        font-family: sans-serif;
      }
     
      .date-toggle {
        width: 176px;
        display: inline-flex;
        align-items: center;
        position: relative;
        color: #000000d9;
        padding: 4px 11px;
        line-height: 1.5;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-radius: 2px;
        transition: border 0.3s, box-shadow 0.3s;
      }
      
      .date-toggle:hover {
        border-color: #7db35e;
      }

      .date-toggle:focus-within {
        border-color: #7db35e;
        outline: 0;
        box-shadow: inset 0 1px 1px rgba(0, 0, 0, 0.075),
          0 0 4px rgb(125, 179, 94, 0.8); 
      }

      .date-toggle > input {
        width: 100%;
        position: relative;
        font-size: 14px;
        line-height: 1.5;
        background-color: #fff;
        transition: all .3s;
        background: 0 0;
        border: 0;
      }

      .date-toggle > input:focus {
        border-color: #7db35e;
        outline: 0;
      }

      .date-toggle > input::placeholder {
        color: #bfbfbf;
        opacity: 1;
      }

      .date-picker-suffix {
        align-self: center;
        margin-left: 4px;
        color: #00000040;
        line-height: 1;
      }

      .calendar-dropdown {
        z-index: 2;
        display: none;
        width: 280px;
        position: absolute;
        top: 100%;
        left: 50%;
        transform: translate(-50%, 8px);
        background: #fff;
        border-radius: 5px;
        box-shadow: 0 0 8px rgba(0,0,0,0.2);
      }
      
      .calendar-dropdown.top {
        top: auto;
        bottom: 100%;
        transform: translate(-50%, -8px);
      }
      
      .calendar-dropdown.left {
        top: 50%;
        left: 0;
        transform: translate(calc(-8px + -100%), -50%);
      }
      
      .calendar-dropdown.right {
        top: 50%;
        left: 100%;
        transform: translate(8px, -50%);
      }
      
      .date-picker-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 8px;
        border-bottom: 1px solid #f0f0f0;
      }
      
      .date-picker-header h4 {
        margin: 0;
        text-transform: capitalize;
        font-size: 16px;
        font-weight: normal;
        line-height: 40px;
      }
      
      .date-picker-header button {
        padding: 0;
        border: 8px solid transparent;
        width: 0;
        height: 0;
        border-radius: 2px;
        border-top-color: #333;
        transform: rotate(90deg);
        cursor: pointer;
        background: none;
        position: relative;
      }
      
      .date-picker-header button::after {
        content: '';
        display: block;
        width: 25px;
        height: 25px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      }
      
      .date-picker-header button:last-of-type {
        transform: rotate(-90deg);
      }
    
      .date-picker-body {
        padding: 8px 12px;
      }

      .week-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 5px;
        margin-bottom: 2px;
      }
      
      .week-days span {
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 14px;
        line-height: 28px;
        text-transform: capitalize;
      }
      
      .month-days {
        display: grid;
        grid-template-columns: repeat(7, 1fr);
        grid-gap: 4px;
      }
      
      .month-day {
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: transparent;
        padding: 8px 6px;
        color: #000;
        font-size: 14px;
        border-radius: 2px;
        cursor: pointer;
        border: none;
      }
      
      .month-day.current {
        background-color: transparent;
      }

      .month-day.not-current {
        color: #00000040;
      }
      
      .month-day.selected {
        background: #8DC26F;
        color: #ffffff;
      }
      
      .month-day:hover {
        background: #e9e9e9;
      }
    `
  }

  render() {
    const monthYear = `${this.calendar.year}年 ${this.calendar.month.number}月`
    this.shadow.innerHTML = `
      <style>${this.datePickerStyle}</style>
      <div class="date-toggle">
        <input placeholder="请选择日期" title="" autocomplete="off" />
        <span class="date-picker-suffix">
          <svg viewBox="64 64 896 896" class="icon-calendar" width="1em" height="1em" fill="currentColor" aria-hidden="true">
            <path d="M880 184H712v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H384v-64c0-4.4-3.6-8-8-8h-56c-4.4 0-8 3.6-8 8v64H144c-17.7 0-32 14.3-32 32v664c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V216c0-17.7-14.3-32-32-32zm-40 656H184V460h656v380zM184 392V256h128v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h256v48c0 4.4 3.6 8 8 8h56c4.4 0 8-3.6 8-8v-48h128v136H184z"></path>
          </svg>
        </span>
      </div>
      <div class="calendar-dropdown ${this.position}">
        <div class="date-picker-header">
          <button type="button" class="prev-month" aria-label="previous month"></button>
          <h4 tabindex="0" aria-label="current month ${monthYear}">
            ${monthYear}
          </h4>
          <button type="button" class="prev-month" aria-label="next month"></button>
        </div>
        <div class="date-picker-body">
          <div class="week-days">${this.getWeekDaysElementStrings()}</div>
          <div class="month-days"></div>
        </div>
      </div>
    `
  }
}

customElements.define('date-picker', DatePicker)
