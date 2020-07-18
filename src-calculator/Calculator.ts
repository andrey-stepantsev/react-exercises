import { opPriorities, opBinActions, opFuncActions } from "./Math";
import { isNum, isOpBin, isOpFunc, isLB, isRB } from "./Helper";

export function calculate(tokens: Array<string> | null): number | undefined {
  const numsStack: Array<number> = [];
  const opsStack: Array<string> = [];

  if (!tokens) return 0;

  for (const token of tokens) {
    if (isNum(token)) {
      numsStack.push(+token);
      continue;
    }

    if (isLB(token)) {
      opsStack.push(token);
      continue;
    }

    if (isRB(token)) {
      while (!isLB(opsStack[opsStack.length - 1])) {
        apply(numsStack, opsStack);
      }
      opsStack.pop();
      continue;
    }

    while (opsStack.length && opPriorities[token] <= opPriorities[opsStack[opsStack.length - 1]]) {
      apply(numsStack, opsStack);
    }

    opsStack.push(token);
  }

  while (opsStack.length) {
    apply(numsStack, opsStack);
  }

  return numsStack.pop();
}

function apply(numsStack: Array<number>, opsStack: Array<string>): void {
  const op: string = opsStack.pop() as string;

  if (isOpBin(op)) {
    const opRight: number = numsStack.pop() as number;
    const opLeft: number = numsStack.pop() as number;
    numsStack.push(opBinActions[op](opLeft, opRight));
    return;
  }

  if (isOpFunc(op)) {
    numsStack.push(opFuncActions[op](numsStack.pop() as number));
    return;
  }

  throw new Error(`Unknown operation: ${op}`);
}
