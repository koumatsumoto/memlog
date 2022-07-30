import { isString } from 'remeda';

export const printError = (e: Error) => `${e.name}: ${e.message}\n${e.stack}`;

export const prettyJson = (data: unknown) => JSON.stringify(data, null, 2);

// TODO(refactor): replace deprecated escape, unescape functions
export const toBase64 = (text: string) => btoa(unescape(encodeURIComponent(text)));
export const fromBase64 = (text: string) => decodeURIComponent(escape(atob(text)));

export const isNonEmptyString = (value: unknown): value is Exclude<string, ''> => isString(value) && value.length > 0;

export const getUrlQueryParams = (): Record<string, string | undefined> => Object.fromEntries(new URLSearchParams(window.location.search).entries());
