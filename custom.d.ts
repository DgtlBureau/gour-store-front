/* eslint-disable @typescript-eslint/no-explicit-any */
declare module '*.svg' {
  const content: any;
  export default content;
}

declare module '*.png' {
  const value: any;
  export default value;
}

declare module '*.jpeg' {
  const value: any;
  export default value;
}

declare namespace cp {
  class Checkout {
    constructor(config: { publicId: string });

    async createPaymentCryptogram(cardFields: {
      cvv: string;
      cardNumber: string;
      expDateMonth: string;
      expDateYear: string;
    }): string;
  }
}

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<unknown> | string
  ? string[]
  : never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}
