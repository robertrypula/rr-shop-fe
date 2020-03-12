import { Component, Input, OnInit } from '@angular/core';
import { Image, Size } from '../../models/image.model';
import { ClickableActionTheme } from '../clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.scss']
})
export class ImageComponent implements OnInit {
  @Input()
  public images: Image[] = [];

  @Input()
  public size: Size;

  @Input()
  public slider = false;

  public position = 0;

  public readonly Size = Size;
  public readonly ClickableActionTheme = ClickableActionTheme;

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
