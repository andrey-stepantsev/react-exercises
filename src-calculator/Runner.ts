import { parse } from "./Parser";
import { validate } from "./Validator";
import { ValidatorStatus } from "./ValidatorStatus";
import { calculate } from "./Calculator";

export function run(expText: string): number | string | undefined {
  const tokens: Array<string> | null = parse(expText);
  const status: ValidatorStatus = validate(tokens);
  return status.isValid ? calculate(tokens) : status.message;
}
