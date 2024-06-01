const MS_IN_SECOND = 1000;
const MS_IN_MINUTE = 60 * MS_IN_SECOND;
const MS_IN_HOUR = 60 * MS_IN_MINUTE;
const MS_IN_DAY = 24 * MS_IN_HOUR;
const MS_IN_MONTH = 30 * MS_IN_DAY;
const MS_IN_YEAR = 365 * MS_IN_DAY;

function formatPlural(num, single, few, several) {
  const dozens = num % 100;
  const lastDig = num % 10;

  if (dozens < 10 || dozens > 20) {
    if (lastDig === 1) {
      return single;
    }
    if (lastDig >= 2 && lastDig <= 4) {
      return few;
    }
  }

  return several;
}

function getDateTime(date) {
  if (typeof date === 'string') {
    const time = Date.parse(date);
    if (Number.isNaN(time)) {
      throw new TypeError('Invalid date string');
    }
    return time;
  }
  if (typeof date === 'number') {
    return date;
  }
  if (date instanceof Date) {
    return date.getTime();
  }

  throw new TypeError('Invalid type of parameter');
}

export function formatTimePretty(date) {
  const time = getDateTime(date);
  const now = Date.now();
  const diff = now - time;

  if (diff < MS_IN_SECOND) {
    return 'Только что';
  }

  if (diff < MS_IN_MINUTE) {
    const seconds = Math.floor(diff / MS_IN_SECOND);
    const secPlural = formatPlural(seconds, 'секунду', 'секунды', 'секунд');

    return `${seconds} ${secPlural} назад`;
  }

  if (diff < MS_IN_HOUR) {
    const minutes = Math.floor(diff / MS_IN_MINUTE);
    const minPlural = formatPlural(minutes, 'минуту', 'минуты', 'минут');

    return `${minutes} ${minPlural} назад`;
  }

  if (diff < MS_IN_DAY) {
    const hours = Math.floor(diff / MS_IN_HOUR);
    const hoursPlural = formatPlural(hours, 'час', 'часа', 'часов');

    return `${hours} ${hoursPlural} назад`;
  }

  if (diff < MS_IN_MONTH) {
    const days = Math.floor(diff / MS_IN_DAY);
    const daysPlural = formatPlural(days, 'день', 'дня', 'дней');

    return `${days} ${daysPlural} назад`;
  }

  if (diff < MS_IN_YEAR) {
    const months = Math.floor(diff / MS_IN_MONTH);
    const monthsPlural = formatPlural(months, 'месяц', 'месяца', 'месяцев');

    return `${months} ${monthsPlural} назад`;
  }

  const years = Math.floor(diff / MS_IN_YEAR);
  const yearsPlural = formatPlural(years, 'год', 'года', 'лет');

  return `${years} ${yearsPlural} назад`;
}

export function formatTime(date) {
  const time = getDateTime(date);
  const fixedDate = new Date(time);

  const dateStr = fixedDate.toLocaleString([], { month: 'short', day: 'numeric' });
  const timeStr = fixedDate.toLocaleString([], { hour: '2-digit', minute: '2-digit' });
  return `${dateStr} в ${timeStr}`;
}
