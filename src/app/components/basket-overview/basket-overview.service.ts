import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BasketEntry } from '../../models/basket.model';
import { BasketService } from '../../services/basket.service';

@Injectable({
  providedIn: 'root'
})
export class BasketOverviewService {
  public basketEntries$: Observable<BasketEntry[]>;

  public constructor(protected basketService: BasketService) {
    this.basketEntries$ = basketService.basketEntries$;
  }

  public remove(id: number) {
    this.basketService.remove(id);
  }
}
