import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'capitalize'
})
export class CapitalizePipe implements PipeTransform {
  transform(value: string | null): string {
    return value === null ? '' : value.charAt(0).toUpperCase() + value.slice(1);
  }
}
