export const filters = {
  ALL: 'all',
  CURRENT: 'current',
  DONE: 'done'
};

export const focusLevels = {
  NONE: 0,
  LOW: 1,
  MID: 2,
  HIGH: 3,

  bubbleDown(level) {
    return level === 0
      ? level
      : (level + 4 - 1) % 4;
  },

  bubbleUp(level, until) {
    return (level === 0 || level >= until)
      ? level
      : (level + 1) % 4;
  }
};

export function pad(num, size, lead = '0') {
  let str = num.toString();

  while(str.length < size) {
    str = lead.toString() + str;
  }

  return str;
}

export function formatDateString(year, month, date) {
  return `${pad(year, 4)}-${pad(month, 2)}-${pad(date, 2)}`;
}

export function formatTimeString(hour, minute) {
  return `${pad(hour, 2)}:${pad(minute, 2)}`;
}

export function msToHumanString(ms) {
  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / 1000 / 60) % 60);
  const hours = Math.floor((ms / 1000 / 60 / 60) % 24);
  const days = Math.floor(ms / 1000 / 60 / 60 / 24);

  const numbers = [days, hours, minutes, seconds];
  const units = ['day', 'hour', 'minute', 'second'];
  const phrases = [];

  numbers.forEach( (num, idx) => {
    if(num > 0) {
      let phrase = `${num} ${units[idx]}`;
      if(num !== 1) phrase += 's';

      phrases.push(phrase);
    }
  });

  return phrases.join(', ');
}
