export const logging = <T>(message = 'logging: ') => {
  return (value: T) => {
    console.log(message, value);

    return value;
  };
};

export const loggingAndThrow = <T>(message = 'logging: ') => {
  return (value: T) => {
    console.error(message, value);

    return value;
  };
};

export const notask = async () => {};
