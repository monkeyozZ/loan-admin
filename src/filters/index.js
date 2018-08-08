// set function parseTime,formatTime to filter
export { parseTime, formatTime } from '@/utils'

function pluralize (time, label) {
  if (time === 1) {
    return time + label
  }
  return time + label + 's'
}

export function timeAgo (time) {
  const between = Date.now() / 1000 - Number(time)
  if (between < 3600) {
    return pluralize(~~(between / 60), ' minute')
  } else if (between < 86400) {
    return pluralize(~~(between / 3600), ' hour')
  } else {
    return pluralize(~~(between / 86400), ' day')
  }
}

/* 数字 格式化 */
export function numberFormatter (num, digits) {
  const si = [
    { value: 1E18, symbol: 'E' },
    { value: 1E15, symbol: 'P' },
    { value: 1E12, symbol: 'T' },
    { value: 1E9, symbol: 'G' },
    { value: 1E6, symbol: 'M' },
    { value: 1E3, symbol: 'k' }
  ]
  for (let i = 0; i < si.length; i++) {
    if (num >= si[i].value) {
      return (num / si[i].value + 0.1).toFixed(digits).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, '$1') + si[i].symbol
    }
  }
  return num.toString()
}

export function toThousandslsFilter (num) {
  return (+num || 0).toString().replace(/^-?\d+/g, m => m.replace(/(?=(?!\b)(\d{3})+$)/g, ','))
}

export function transtatus (params) {
  if (params === true) {
    return '开启'
  } else {
    return '暂停'
  }
}
// 将时间戳转为日期
export function trantime (params) {
  var date = new Date(parseInt(params)) // 时间戳为10位需*1000，时间戳为13位的话不需乘1000
  let Y = date.getFullYear() + '-'
  let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-'
  let D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
  let h = '  ' + date.getHours() + ':'
  let m = date.getMinutes() + ':'
  let s = date.getSeconds()
  return Y + M + D + h + m + s
}
// 截取手机号
export function sunphone (params) {
  return params.substr(0, 3) + '****' + params.substr(7)
}

// 性别
export function transex (params) {
  if (params === 'M') {
    return '男'
  } else {
    return '女'
  }
}
// 置顶
export function transtatustotop (params) {
  if (params === true) {
    return '置顶'
  } else {
    return '常规'
  }
}
// 置顶标签类型
export function statusFilter (params) {
  if (params === true) {
    return ''
  } else {
    return 'info'
  }
}

// 广告类别
export function tranadv (params) {
  if (params === 'loan') {
    return '贷款'
  } else {
    return '信用卡'
  }
}