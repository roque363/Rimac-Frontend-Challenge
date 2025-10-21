export type ClassDictionary = Record<string, any>;
export type ClassValue =
  | string
  | number
  | ClassDictionary
  | ClassValue[]
  | null
  | undefined
  | boolean;

function toVal(mix: ClassValue): string {
  let k: string;
  let y: string;
  let str = '';

  if (typeof mix === 'string' || typeof mix === 'number') {
    str += mix;
  } else if (mix) {
    if (Array.isArray(mix)) {
      const len = mix.length;
      for (let i = 0; i < len; i++) {
        const v = mix[i];
        if (!v) continue;
        y = toVal(v);
        if (y) {
          if (str) str += ' ';
          str += y;
        }
      }
    } else if (typeof mix === 'object') {
      for (k in mix as ClassDictionary) {
        if ((mix as ClassDictionary)[k]) {
          if (str) str += ' ';
          str += k;
        }
      }
    }
  }

  return str;
}

export function clsx(...args: ClassValue[]): string {
  let str = '';
  for (let i = 0; i < args.length; i++) {
    const tmp = args[i];
    if (!tmp) continue;
    const x = toVal(tmp);
    if (x) {
      if (str) str += ' ';
      str += x;
    }
  }
  return str;
}

export default clsx;
