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
      case Size.Px0064:
        return '0064px';
      case Size.Px0200:
        return '0200px';
      case Size.Px0300:
        return '0300px';
      case Size.Px1600:
        return '1600px';
      default:
        return '';
    }
  }
}
