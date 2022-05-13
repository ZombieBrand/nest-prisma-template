import * as dayjs from 'dayjs';

export const dateFilter = (
  val: string | number | Date,
  format = 'YYYY-MM-DD',
) => {
  return dayjs(val).format(format);
};
