// 格式化日期：yyyy-MM-dd
export function formatDate(date) {
  const myyear = date.getFullYear();
  let mymonth = date.getMonth() + 1;
  let myweekday = date.getDate();

  if (mymonth < 10) {
    mymonth = `0${mymonth}`;
  }
  if (myweekday < 10) {
    myweekday = `0${myweekday}`;
  }
  return (`${myyear}-${mymonth}-${myweekday}`);
}
export function parseDate(datestr) {
  // 转换日期格式
  const date1 = datestr.replace(/-/g, '/'); // "2010/08/01";
  // 创建日期对象
  return new Date(date1);
}
export function getMonthDays(myMonth) {
  const now = new Date();
  let nowYear = now.getYear();
  nowYear += (nowYear < 2000) ? 1900 : 0;
  const monthStartDate = new Date(nowYear, myMonth, 1);
  const monthEndDate = new Date(nowYear, myMonth + 1, 1);
  return (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
}

export function getMonthStartDate() {
  const now = new Date();
  const nowMonth = now.getMonth();
  let nowYear = now.getYear();
  nowYear += (nowYear < 2000) ? 1900 : 0;
  const monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}
export function getMonthStartDateReturnDate() {
  const now = new Date();
  const nowMonth = now.getMonth();
  let nowYear = now.getYear();
  nowYear += (nowYear < 2000) ? 1900 : 0;
  return new Date(nowYear, nowMonth, 1);
}
export function getMonthEndDate() {
  const now = new Date();
  const nowMonth = now.getMonth();
  let nowYear = now.getYear();
  nowYear += (nowYear < 2000) ? 1900 : 0;
  const monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return formatDate(monthEndDate);
}

export function getpreMonthStartDate() {
  const now = new Date();
  let nowMonth = now.getMonth() - 1;
  let nowYear = now.getYear();
  if (nowMonth < 0) {
    nowMonth = 11;
    nowYear -= 1;
  }
  nowYear += (nowYear < 2000) ? 1900 : 0;
  const monthStartDate = new Date(nowYear, nowMonth, 1);
  return formatDate(monthStartDate);
}

export function getpreMonthEndDate() {
  const now = new Date();
  let nowMonth = now.getMonth() - 1;
  let nowYear = now.getYear();
  if (nowMonth < 0) {
    nowMonth = 11;
    nowYear -= 1;
  }
  nowYear += (nowYear < 2000) ? 1900 : 0;
  const monthEndDate = new Date(nowYear, nowMonth, getMonthDays(nowMonth));
  return formatDate(monthEndDate);
}
export function jiajianMonth(date, num) {
  let y = date.getFullYear();
  let m = date.getMonth() + 1;
  let d = date.getDate();

  if (m + num > 12) {
    y += 1;
    m = m + num - 12;
  }
  if (m + num < 1) {
    y -= 1;
    m = 12 + m + num;
  }
  if (m + num <= 12 && num + m >= 1) {
    m += num;
  }
  if (m <= 9) m = `0${m}`;
  if (d <= 9) d = `0${d}`;
  // eslint-disable-next-line no-useless-concat
  return `${y}-${m}-` + '01';
}

export function parseTime(time, cFormat) {
  if (arguments.length === 0) {
    return null;
  }
  const format = cFormat || '{y}-{m}-{d} {h}:{i}:{s}';
  let date;
  if (typeof time === 'object') {
    date = time;
  } else {
    let resultTime = time;
    if ((`${time}`).length === 10) resultTime = parseInt(time, 10) * 1000;
    date = new Date(resultTime);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  return format.replace(/{([ymdhisa])+}/g, (result, key) => {
    let value = formatObj[key];
    if (key === 'a') return ['一', '二', '三', '四', '五', '六', '日'][value - 1];
    if (result.length > 0 && value < 10) {
      value = `0${value}`;
    }
    return value || 0;
  });
}


export function formatTime(tempTime, option) {
  let time = tempTime;
  time = +time * 1000;
  const d = new Date(time);
  const now = Date.now();

  const diff = (now - d) / 1000;

  if (diff < 30) {
    return '刚刚';
  } if (diff < 3600) { // less 1 hour
    return `${Math.ceil(diff / 60)}分钟前`;
  } if (diff < 3600 * 24) {
    return `${Math.ceil(diff / 3600)}小时前`;
  } if (diff < 3600 * 24 * 2) {
    return '1天前';
  }
  if (option) {
    return parseTime(time, option);
  }
  return `${d.getMonth() + 1}月${d.getDate()}日${d.getHours()}时${d.getMinutes()}分`;
}
