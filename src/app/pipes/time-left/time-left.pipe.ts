import { Pipe, PipeTransform } from '@angular/core';

import { getFormattedTimeLeft } from '../../utils/transfomation.utils';

@Pipe({
  name: 'timeLeft'
})
export class TimeLeftPipe implements PipeTransform {
  public transform(seconds: number): string {
    return seconds ? getFormattedTimeLeft(seconds) : '';
  }
}
