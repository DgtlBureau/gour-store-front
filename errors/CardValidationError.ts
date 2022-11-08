export class CardValidationError extends Error {
  constructor(message: string) {
    super(message); // 'Error' breaks prototype chain here
    this.name = 'CardValidationError';
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}
