import { Pipe, PipeTransform } from '@angular/core';

import { Image, ImageSize } from '../../models/image.model';
import { environment } from '../../../environments/environment';
import { NO_PICTURE_FILENAME } from '../../config/config';

@Pipe({
  name: 'image'
})
export class ImagePipe implements PipeTransform {
  public transform(value: Image[], imageSize: ImageSize = ImageSize.Full): string {
    return `${environment.urlStatic}products/${imageSize}/${
      value && value.length ? value[0].name : NO_PICTURE_FILENAME
    }`;
  }
}
