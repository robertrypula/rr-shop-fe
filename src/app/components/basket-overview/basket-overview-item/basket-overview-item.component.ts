import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { BasketEntry } from '../../../models/basket.model';
import { BasketService } from '../../../services/basket.service';

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

  public constructor(protected basketService: BasketService) {}

  public ngOnInit(): void {}

  public remove(id: number): void {
    this.basketService.remove(id);
  }
}
