import { formatDistanceToNow } from 'date-fns';

export function formatDate(date: string | Date, locale: string = 'en-US') {
  return new Intl.DateTimeFormat(locale, {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  }).format(typeof date === 'string' ? new Date(date) : date);
}

export function formatDateToNow(date: Date | string | number) {
  return formatDistanceToNow(date, { addSuffix: true, includeSeconds: true });
}

export function generatePagination(currentPage: number, totalPages: number): Array<number | '...'> {
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
  if (currentPage <= 3 || currentPage >= totalPages - 2) {
    return [1, 2, 3, '...', totalPages - 2, totalPages - 1, totalPages];
  }
  return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}

export function cutString(str: string, maxLength: number = 150) {
  if (maxLength >= str.length) return str;
  const ending = '...';
  return str.slice(0, maxLength - ending.length) + ending;
}
