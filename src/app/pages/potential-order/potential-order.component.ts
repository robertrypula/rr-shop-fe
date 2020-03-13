import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { BasketService } from '../../services/basket.service';
import { Type } from '../../models/basket.model';
import { BasketFacadeService } from '../../store/facades/basket-facade.service';

@Component({
  selector: 'rr-shop-potential-order',
  templateUrl: './potential-order.component.html',
  styleUrls: ['./potential-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PotentialOrderComponent implements OnInit {
  public isBasketValid$: Observable<boolean>;
  public priceSumDelivery$: Observable<number>;
  public priceSumNormal$: Observable<number>;
  public priceSumPayment$: Observable<number>;
  public priceSumTotal$: Observable<number>;

  public constructor(protected basketService: BasketService, protected basketFacadeService: BasketFacadeService) {
    this.isBasketValid$ = basketService.isBasketValid$;
    this.priceSumDelivery$ = basketService.priceSum$([Type.Delivery]);
    this.priceSumNormal$ = basketService.priceSum$([Type.Normal]);
    this.priceSumPayment$ = basketService.priceSum$([Type.Payment]);
    this.priceSumTotal$ = basketService.priceSum$([Type.Normal, Type.Delivery, Type.Payment]);
  }

  public ngOnInit() {}

  public createOrder(): void {
    this.basketFacadeService.createOrder();
  }
}
