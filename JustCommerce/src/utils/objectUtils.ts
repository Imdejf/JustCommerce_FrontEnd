export const getNotEmptyFields = <T>(object: Record<string, any>): Partial<T> =>
  Object.keys(object).reduce(
    (acc, key) => (object[key] || typeof object[key] === 'number' ? { ...acc, [key]: object[key] } : acc),
    {}
  );
