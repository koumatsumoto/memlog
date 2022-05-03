export const getUrlQueryParams = (): Record<string, string | undefined> => Object.fromEntries(new URLSearchParams(window.location.search).entries());
