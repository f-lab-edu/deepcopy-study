export const deepCopy = (value: Object) => {
  const deepCopyValue = JSON.parse(JSON.stringify(value));

  return deepCopyValue;
};
