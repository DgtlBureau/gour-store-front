declare module '*.svg' {
  export const ReactComponent: React.FunctionComponent<React.SVGAttributes<SVGElement>>;

  const content: string;
  export default content;
}

declare module '*.png' {
  const value: string;
  export default value;
}

declare module '*.jpeg' {
  const value: string;
  export default value;
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
