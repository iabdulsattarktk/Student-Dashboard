import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'sort', standalone: true })
export class SortPipe implements PipeTransform {
  transform(items: any[], field: string, order: string = 'asc'): any[] {
    if (!items || !field) return items;
    return [...items].sort((a, b) => {
      if (a[field] < b[field]) return order === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return order === 'asc' ? 1 : -1;
      return 0;
    });
  }
}
