export const printError = (e: Error) => `${e.name}: ${e.message}\n${e.stack}`;

export const prettyJson = (data: unknown) => JSON.stringify(data, null, 2);

export const getUrlQueryParams = <ExpectedKeys extends string = string>(search = window.location.search) => {
  return Object.fromEntries(new URLSearchParams(search).entries()) as Record<ExpectedKeys, string | undefined>;
};
