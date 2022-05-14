export const isNotNull = <T>(value: T): value is Exclude<T, null> => value !== null;
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isError = (value: unknown): value is Error => value instanceof Error;
