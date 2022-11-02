export type ElementType<T extends unknown[]> = T extends (infer U)[] ? U : never;
