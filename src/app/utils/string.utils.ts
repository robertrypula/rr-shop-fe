export const removeWhitespaceCharacters = (value: string): string => {
  return `${value}`.replace(/\s/g, '');
};
