import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasketEntry } from '../../models/basket.model';
import { BasketService } from '../../services/basket.service';

@Component({
  selector: 'rr-shop-basket-overview',
  templateUrl: './basket-overview.component.html',
  styleUrls: ['./basket-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BasketOverviewComponent implements OnInit {
  public basketEntries$: Observable<BasketEntry[]>;

  public constructor(protected basketService: BasketService) {
    this.basketEntries$ = this.basketService.basketEntries$;
  }

  public ngOnInit(): void {}

  public trackBy(index: number, item: BasketEntry): string {
    return item.id + '';
  }
}
