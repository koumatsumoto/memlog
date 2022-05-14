export const isNotNull = <T>(value: T): value is Exclude<T, null> => value !== null;
export const isFalsy = <T>(value: T): value is T & (null | undefined | false | 0 | '') => !Boolean(value);
export const isNumber = (value: unknown): value is number => typeof value === 'number';
export const isString = (value: unknown): value is string => typeof value === 'string';
export const isNonEmptyString = (value: unknown): value is Exclude<string, ''> => isString(value) && value.length > 0;
export const isError = (value: unknown): value is Error => value instanceof Error;
