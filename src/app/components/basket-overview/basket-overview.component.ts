import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasketEntry, Type } from '../../models/basket.model';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'rr-shop-basket-overview',
  templateUrl: './basket-overview.component.html',
  styleUrls: ['./basket-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketOverviewComponent implements OnInit {
  public basketEntriesNormal$: Observable<BasketEntry[]>;
  public basketEntriesPayment$: Observable<BasketEntry[]>;
  public quantityTotal$: Observable<number>;

  public constructor(protected basketService: BasketService) {
    this.quantityTotal$ = this.basketService.quantityTotal$;
    this.basketEntriesNormal$ = this.basketService.basketEntriesByType$(Type.Normal);
    this.basketEntriesPayment$ = this.basketService.basketEntriesByType$(Type.Payment);
  }

  public ngOnInit(): void {}

  public trackBy(index: number, item: BasketEntry): string {
    return item.id + '';
  }
}
