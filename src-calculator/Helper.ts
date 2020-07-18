import { opsBin, opsFunc } from "./Math";

export const isNum = (v: string): boolean => !isNaN(+v);
export const isOpBin = (v: string): boolean => opsBin.includes(v);
export const isOpFunc = (v: string): boolean => opsFunc.includes(v);
export const isLB = (v: string): boolean => v === "(";
export const isRB = (v: string): boolean => v === ")";
