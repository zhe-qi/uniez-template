import dayjs from 'dayjs';

/**
 * 日期格式化工具函数
 * @param date - 要格式化的日期
 * @param format - 格式化模式，默认为 'YYYY-MM-DD HH:mm:ss'
 * @returns 格式化后的日期字符串
 */
export function formatDate(
  date: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss',
): string {
  return dayjs(date).format(format);
}

// 在这里可以继续添加其他工具函数...
