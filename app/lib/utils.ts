import { formatDistanceToNow } from 'date-fns';

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
