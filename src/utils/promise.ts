export const logging = (message = 'logging: ') => {
  return (value: unknown) => {
    console.log(message, value);

    return value;
  };
};

export const loggingAndThrow = (message = 'logging: ') => {
  return (value: unknown) => {
    console.error(message, value);

    return value;
  };
};
