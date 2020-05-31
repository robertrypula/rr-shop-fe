import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ClickableActionTheme } from '../../clickable-action/clickable-action.model';
import { IconType } from '../../icon/icon.models';
import { Image, SizeImage, SizeImageContainer, Transparency } from '../../../models/image.model';

@Component({
  selector: 'rr-shop-slider-image',
  templateUrl: './slider-image.component.html',
  styleUrls: ['./slider-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderImageComponent implements OnInit {
  @Input()
  public images: Image[] = [];

  @Input()
  public sizeImage: SizeImage;

  @Input()
  public sizeImageContainer: SizeImageContainer;

  @Input()
  public slider = false;

  public position = 0;

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly IconType = IconType;
  public readonly SizeImage = SizeImage;
  public readonly SizeImageContainer = SizeImageContainer;
  public readonly Transparency = Transparency;

  public constructor() {}

  public ngOnInit() {}

  public onLeftClick(): void {
    this.position = (this.images.length + this.position - 1) % this.images.length;
  }

  public onRightClick(): void {
    this.position = (this.images.length + this.position + 1) % this.images.length;
  }

  public trackBy(index: number, item: Image): string {
    return item.id + '';
  }
}
