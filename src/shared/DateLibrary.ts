import * as dayjs from 'dayjs';

export enum EDateFormats {
  DDMMYYYY = 'DD/MM/YYYY',
  YYYYMMDD = 'YYYY/MM/DD',

  DDMMYYYYHHMMSS = 'DD/MM/YYYY HH:mm:ss',
  YYYYMMDDHHMMSS = 'YYYY/MM/DD HH:mm:ss',

  HHMMSS = 'HH:mm:ss',
  HHMM = 'HH:mm',
  HHMMA = 'HH:mm A',

  DDMMYYYYHHMM = 'DD/MM/YYYY HH:mm',
  YYYYMMDDHHMM = 'YYYY/MM/DD HH:mm',

  MMMMDDYYYY = 'MMMM DD, YYYY',
  MMMMDDYYYYHHMM = 'MMMM DD, YYYY HH:mm',
}

export const formatDate = (date: Date | string, format: EDateFormats) => {
  return dayjs(date).format(format);
};
