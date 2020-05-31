import { Pipe, PipeTransform } from '@angular/core';

import { environment } from '../../../environments/environment';
import { Image, SizeImage, Transparency } from '../../models/image.model';

@Pipe({
  name: 'imageCategory'
})
export class ImageCategoryPipe implements PipeTransform {
  public transform(
    image: Image,
    sizeImage: SizeImage = SizeImage.Full,
    transparency: Transparency = Transparency.Disabled
  ): string {
    return [
      `${environment.urlStatic}categories/${this.getSizeDirectory(sizeImage)}/`,
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
      case SizeImage.Px0600:
        return '0600x0600';
      case SizeImage.Px2400:
        return '2400x0880';
      default:
        return '';
    }
  }
}
