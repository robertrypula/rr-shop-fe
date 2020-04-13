import { Pipe, PipeTransform } from '@angular/core';

import { Image, SizeImage, Transparency } from '../../models/image.model';
import { environment } from '../../../environments/environment';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  public transform(
    image: Image,
    sizeImage: SizeImage = SizeImage.Full,
    transparency: Transparency = Transparency.Enabled
  ): string {
    return [
      `${environment.urlStatic}products/${this.getSizeDirectory(sizeImage)}/`,
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

  protected getSizeDirectory(sizeImage: SizeImage): string {
    switch (sizeImage) {
      case SizeImage.Full:
        return 'full';
      case SizeImage.Px0128:
        return '0128px';
      case SizeImage.Px0400:
        return '0400px';
      case SizeImage.Px0600:
        return '0600px';
      case SizeImage.Px1600:
        return '1600px';
      default:
        return '';
    }
  }
}
