export function calendarWeeks(year, month) {
  const now = new Date()
  const currentMonth = now.getFullYear() === year && now.getMonth() === month
  const weeks = []
  const start = (new Date(year, month, 1)).getDay()
  const days = []
  const feb = (year % 100 != 0) && (year % 4 == 0) || (year % 400 == 0) ? 29 : 28
  const dayPerMonth = [31, feb, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
  const numDays = dayPerMonth[month]
  for (let i = 0; i < start; i++) {
    days.push({ number: ''})
  }
  for (let i = 1; i <= numDays; i++) {
    const dateString = year + '-' + zpad(((month) + 1), 2) + '-' + zpad(i, 2)
    const date = new Date(dateString)
    days.push({
      dateString,
      date,
      number: i,
      today: currentMonth && now.getDate() === i
    })
  }
  for (let i = 0; i < days.length; i += 7) {
    weeks.push(days.slice(i, i + 7))
  }
  const finalWeek = weeks[weeks.length - 1]
  const toAdd = 7 - finalWeek.length
  for (let i = 0; i < toAdd; i++) {
    finalWeek.push({ number: ''})
  }
  return weeks
}

export function zpad(number, length) {
  let str = "" + number
  while (str.length < length) {
    str = '0' + str
  }
  return str
}

export function contrastColor(hex) {
  if (!hex) return '#ffffff'
  const color = (hex.charAt(0) === '#') ? hex.substring(1, 7) : hex;
  const r = parseInt(color.substring(0, 2), 16);
  const g = parseInt(color.substring(2, 4), 16);
  const b = parseInt(color.substring(4, 6), 16);
  return (((r * 0.299) + (g * 0.587) + (b * 0.114)) > 186) ? '#000000' : '#ffffff';
}

export function charLimit (str, n, empty) {
  if (!str) return empty || ' '
  if (str.length <= n) return str
  return str.substr(0, n) + '...'
}

export function offset() {
  const offset = new Date().getTimezoneOffset()
  return (
    (offset < 0 ? '+' : '-') +
    zpad(parseInt(Math.abs(offset/60)), 2) +
    zpad(Math.abs(offset%60), 2)
  )
}

export function localDate(date) {
  return `${date.getFullYear()}-${zpad(date.getMonth()+1,2)}-${zpad(date.getDate(),2)}`
}

export function localTime(date) {
  return `${zpad(date.getHours(),2)}:${zpad(date.getMinutes(), 2)}`
}