import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketEntry } from '../../models/basket.model';
import { BasketService } from '../../services/basket.service';

@Injectable({
  providedIn: 'root'
})
export class BasketOverviewService {
  public basketEntries$: Observable<BasketEntry[]>;
  public priceTotal$: Observable<number>;
  public quantityTotal$: Observable<number>;

  public constructor(protected basketService: BasketService) {
    this.basketEntries$ = basketService.basketEntries$;
    this.priceTotal$ = basketService.priceTotal$;
    this.quantityTotal$ = basketService.quantityTotal$;
  }

  public remove(id: number) {
    this.basketService.remove(id);
  }
}
