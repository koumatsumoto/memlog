// TODO(refactor): replace deprecated escape, unescape functions
export const toBase64 = (text: string) => btoa(unescape(encodeURIComponent(text)));
export const fromBase64 = (text: string) => decodeURIComponent(escape(atob(text)));
