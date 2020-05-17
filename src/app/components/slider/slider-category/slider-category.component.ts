import { ChangeDetectionStrategy, Component, Input, OnDestroy, OnInit } from '@angular/core';

import { BaseSliderComponent } from '../base-slider-component.class';
import { CategoryStore } from '../../../models/category.model';

@Component({
  selector: 'rr-shop-slider-category',
  templateUrl: './slider-category.component.html',
  styleUrls: ['./slider-category.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SliderCategoryComponent extends BaseSliderComponent implements OnInit, OnDestroy {
  @Input()
  public categories: CategoryStore[];

  public ngOnInit(): void {
    this.init();
  }

  public ngOnDestroy(): void {
    this.destroy();
  }

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
  }

  public getLength(): number {
    return this.categories ? this.categories.length : 0;
  }
}
