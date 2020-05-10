import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'externalId'
})
export class ExternalIdPipe implements PipeTransform {
  public transform(value: string): string {
    return (value + '').padStart(4, '0');
  }
}
