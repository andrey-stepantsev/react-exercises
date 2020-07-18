export class ValidatorStatus {
  readonly isValid: boolean;
  readonly message: string | undefined;

  constructor(isValid: boolean, message?: string) {
    this.isValid = isValid;
    this.message = message;
  }
}
