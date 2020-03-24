import { Pipe, PipeTransform } from '@angular/core';

import { Image, Size } from '../../models/image.model';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  public transform(image: Image, size: Size = Size.Full): string {
    return `${environment.urlStatic}products/${this.getSizeDirectory(size)}/${image.filename}`;
  }

  protected getSizeDirectory(size: Size): string {
    switch (size) {
      case Size.Full:
        return 'full';
      case Size.Thumb064px:
        return '064px';
      case Size.Thumb200px:
        return '200px';
      case Size.Thumb300px:
        return '300px';
      default:
        return '';
    }
  }
}
