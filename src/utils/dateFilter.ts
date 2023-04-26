import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import * as timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);
export const dateFilter = (
  val: string | number | Date,
  format = 'YYYY-MM-DD',
) => {
  return dayjs.utc(val).tz('Asia/Shanghai').format(format);
};
