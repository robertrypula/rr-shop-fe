export const getAsArray = <T>(asKeyValue: { [key: number]: T }): T[] => {
  return Object.keys(asKeyValue).map((key: string): T => asKeyValue[+key]);
};

export const getAsArrayUuid = <T>(asKeyValue: { [uuid: string]: T }): T[] => {
  return Object.keys(asKeyValue).map((key: string): T => asKeyValue[key]);
};
