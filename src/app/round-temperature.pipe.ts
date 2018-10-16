import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roundTemperature'
})
export class RoundTemperaturePipe implements PipeTransform {
  transform(value: any): number {
    return Math.round(value);
  }
}
