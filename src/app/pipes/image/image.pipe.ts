import { Pipe, PipeTransform } from '@angular/core';

import { Image, Size, Transparency } from '../../models/image.model';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  public transform(image: Image, size: Size = Size.Full, transparency: Transparency = Transparency.Enabled): string {
    return [
      `${environment.urlStatic}products/${this.getSizeDirectory(size)}/`,
      `${image.filename}.${this.getExtension(transparency)}`
    ].join('');
  }

  protected getExtension(transparency: Transparency): string {
    switch (transparency) {
      case Transparency.Disabled:
        return 'jpg';
      case Transparency.Enabled:
      default:
        return 'png';
    }
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
