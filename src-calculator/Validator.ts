import { LexemType } from "./LexemType";
import { ValidatorStatus } from "./ValidatorStatus";
import { isNum, isOpBin, isOpFunc, isLB, isRB } from "./Helper";

const numPrevTypes: Array<LexemType> = [LexemType.EMPTY, LexemType.BIN, LexemType.LB];
const opBinPrevTypes: Array<LexemType> = [LexemType.NUM, LexemType.RB];
const opFuncPrevTypes: Array<LexemType> = [LexemType.EMPTY, LexemType.BIN, LexemType.LB];
const lastPrevTypes: Array<LexemType> = [LexemType.NUM, LexemType.RB];

export function validate(tokens: Array<string> | null): ValidatorStatus {
  let prevType = LexemType.EMPTY;
  let openBrackets = 0;

  if (!tokens) {
    return new ValidatorStatus(false, "This is an empty expression");
  }

  for (let i = 0; i < tokens.length; i++) {
    if (isNum(tokens[i]) && numPrevTypes.includes(prevType)) {
      prevType = LexemType.NUM;
      continue;
    }

    if (isOpBin(tokens[i]) && opBinPrevTypes.includes(prevType)) {
      prevType = LexemType.BIN;
      continue;
    }

    if (isOpFunc(tokens[i]) && opFuncPrevTypes.includes(prevType)) {
      prevType = LexemType.FUNC;
      continue;
    }

    if (isLB(tokens[i]) && prevType !== LexemType.NUM) {
      prevType = LexemType.LB;
      openBrackets++;
      continue;
    }

    if (isRB(tokens[i]) && prevType !== LexemType.LB && openBrackets) {
      prevType = LexemType.RB;
      openBrackets--;
      continue;
    }

    return new ValidatorStatus(false, `Unexpected token: "${tokens[i]}"`);
  }

  if (openBrackets) {
    return new ValidatorStatus(false, "There are open brackets");
  }

  if (!lastPrevTypes.includes(prevType)) {
    return new ValidatorStatus(false, "Invalid end of expression");
  }

  return new ValidatorStatus(true);
}
