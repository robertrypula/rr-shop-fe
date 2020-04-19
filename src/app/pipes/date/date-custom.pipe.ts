import { Pipe, PipeTransform } from '@angular/core';

import { getFormattedDate } from '../../utils/transfomation.utils';

@Pipe({
  name: 'dateCustom'
})
export class DateCustomPipe implements PipeTransform {
  public transform(value: Date): string {
    if (typeof value === 'string') {
      value = new Date(value);
    }

    return value ? getFormattedDate(value) : '';
  }
}
