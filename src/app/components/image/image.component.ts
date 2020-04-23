import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { Image, SizeImage, SizeImageContainer, Transparency } from '../../models/image.model';
import { ClickableActionTheme } from '../clickable-action/clickable-action.model';
import { IconType } from '../icon/icon.models';

@Component({
  selector: 'rr-shop-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ImageComponent implements OnInit {
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
