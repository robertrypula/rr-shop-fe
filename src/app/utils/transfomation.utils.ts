export const getAsArray = <T>(asKeyValue: { [key: number]: T }): T[] => {
  return Object.keys(asKeyValue).map((key: string): T => asKeyValue[+key]);
};

export const getAsArrayUuid = <T>(asKeyValue: { [uuid: string]: T }): T[] => {
  return Object.keys(asKeyValue).map((key: string): T => asKeyValue[key]);
};

export const getFormattedDate = (
  date: Date,
  dateSeparator = '.',
  dateTimeSeparator = ' ',
  timeSeparator = ':'
): string => {
  const year: string = date.getFullYear() + '';
  const month: string = ('00' + (date.getMonth() + 1)).slice(-2);
  const day: string = ('00' + date.getDate()).slice(-2);
  const hour: string = ('00' + date.getHours()).slice(-2);
  const minute: string = ('00' + date.getMinutes()).slice(-2);
  const second: string = ('00' + date.getSeconds()).slice(-2);

  return [
    `${year}${dateSeparator}${month}${dateSeparator}${day}`,
    `${dateTimeSeparator}`,
    `${hour}${timeSeparator}${minute}${timeSeparator}${second}`
  ].join('');
};

export const getFormattedTimeLeft = (seconds: number): string => {
  const minutes: number = Math.floor(seconds / 60);
  const formattedMinutes: string = ('00' + minutes).slice(-2);
  const formattedSeconds: string = ('00' + (seconds - minutes * 60)).slice(-2);

  return `${formattedMinutes} min ${formattedSeconds} s`;
};
