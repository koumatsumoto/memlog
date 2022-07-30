export const printError = (e: Error) => `${e.name}: ${e.message}\n${e.stack}`;

export const prettyJson = (data: unknown) => JSON.stringify(data, null, 2);
