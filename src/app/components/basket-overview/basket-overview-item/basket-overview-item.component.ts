import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { BasketEntry } from '../../../models/basket.model';
import { BasketService } from '../../../services/basket.service';
import { Size } from '../../../models/image.model';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rr-shop-basket-overview-item]',
  templateUrl: './basket-overview-item.component.html',
  styleUrls: ['./basket-overview-item.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketOverviewItemComponent implements OnInit {
  @Input()
  public basketEntry: BasketEntry;

  public readonly Size = Size;

  public constructor(protected basketService: BasketService) {}

  public ngOnInit(): void {}

  public quantityDecrement(id: number): void {
    this.basketService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.basketService.quantityIncrement(id);
  }

  public remove(id: number): void {
    this.basketService.remove(id);
  }
}
