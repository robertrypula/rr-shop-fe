import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketEntry } from '../../models/basket.model';
import { BasketOverviewService } from './basket-overview.service';

@Component({
  selector: 'rr-shop-basket-overview',
  templateUrl: './basket-overview.component.html',
  styleUrls: ['./basket-overview.component.scss'],
  providers: [BasketOverviewService]
})
export class BasketOverviewComponent implements OnInit {
  public basketEntries$: Observable<BasketEntry[]>;
  public priceTotal$: Observable<number>;
  public quantityTotal$: Observable<number>;

  public constructor(protected basketOverviewService: BasketOverviewService) {
    this.basketEntries$ = this.basketOverviewService.basketEntries$;
    this.priceTotal$ = this.basketOverviewService.priceTotal$;
    this.quantityTotal$ = this.basketOverviewService.quantityTotal$;
  }

  public ngOnInit(): void {}

  public remove(id: number): void {
    this.basketOverviewService.remove(id);
  }
}
