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
  public priceTotal$: Observable<number>;
  public quantityTotal$: Observable<number>;

  public constructor(protected basketService: BasketService) {
    this.basketEntries$ = this.basketService.basketEntries$;
    this.priceTotal$ = this.basketService.priceTotal$;
    this.quantityTotal$ = this.basketService.quantityTotal$;
  }

  public ngOnInit(): void {}

  public remove(id: number): void {
    this.basketService.remove(id);
  }

  public trackBy(index: number, item: BasketEntry): string {
    return item.id + '';
  }
}
