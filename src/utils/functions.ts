export const identity = <T>(x: T) => x;
export const throws = (value: unknown): never => {
  throw value;
};
