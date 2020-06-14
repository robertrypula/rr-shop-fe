import { Pipe, PipeTransform } from '@angular/core';

import { removeWhitespaceCharacters } from '../../utils/string.utils';

@Pipe({
  name: 'stripWhitespaces'
})
export class StripWhitespacesPipe implements PipeTransform {
  public transform(value: string): string {
    return value ? removeWhitespaceCharacters(value) : '';
  }
}
