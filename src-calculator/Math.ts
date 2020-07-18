export type OpBinType = (a: number, b: number) => number;
export type OpFuncType = (v: number) => number;

export const add: OpBinType = (a, b) => a + b;
export const sub: OpBinType = (a, b) => a - b;
export const mul: OpBinType = (a, b) => a * b;
export const div: OpBinType = (a, b) => a / b;
export const pow: OpBinType = (a, b) => a ** b;

export const cos: OpFuncType = (v) => parseFloat(Math.cos(v * (Math.PI / 180)).toFixed(2));
export const sin: OpFuncType = (v) => parseFloat(Math.sin(v * (Math.PI / 180)).toFixed(2));
export const tg: OpFuncType = (v) => parseFloat(Math.tan(v * (Math.PI / 180)).toFixed(2));

export const opsBin: Array<string> = ["+", "-", "*", "/", "^"];
export const opsFunc: Array<string> = ["cos", "sin", "tg"];

const [PLUS, MINUS, MUL, DIV, POW] = opsBin;
const [COS, SIN, TG] = opsFunc;

export const opPriorities: { [key: string]: number } = {
  [PLUS]: 1,
  [MINUS]: 1,
  [MUL]: 2,
  [DIV]: 2,
  [POW]: 2,
  [COS]: 3,
  [SIN]: 3,
  [TG]: 3,
};

export const opBinActions: { [key: string]: OpBinType } = {
  [PLUS]: add,
  [MINUS]: sub,
  [MUL]: mul,
  [DIV]: div,
  [POW]: pow,
};

export const opFuncActions: { [key: string]: OpFuncType } = {
  [COS]: cos,
  [SIN]: sin,
  [TG]: tg,
};
