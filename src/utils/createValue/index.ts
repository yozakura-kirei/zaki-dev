import dayjs from 'dayjs';

// unix時間を年月日にフォーマット
export function unixYMD(value: number) {
  return dayjs(value).format('YYYY-MM-DD');
}
