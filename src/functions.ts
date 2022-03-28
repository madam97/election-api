export const random = (start: number, end: number): number => {
  return Math.floor( Math.random() * (end - start) ) + start;
}

const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export const randomChar = (length: number = 1): string => {
  if (length < 1) {
    length = 1;
  }

  let ret = '';
  for (let i = 0; i < length; ++i) {
    ret += chars[ random(0, chars.length) ];
  }

  return ret;
}