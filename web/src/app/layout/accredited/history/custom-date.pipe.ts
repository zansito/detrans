import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDatePipe'
})
export class CustomDatePipe implements PipeTransform {
  transform(value, type: string = ''): string {

    const year = value.split('-')[0];
    const month = value.split('-')[1];
    const day = value.split('-')[2];
    const hour = value.split(' ')[1];
    const finalDay = day.split(' ')[0];
    const finalHour = hour.split('.')[0];

    return `${finalDay}/${month}/${year} as ${finalHour}`;
  }

}
