import { Component, Input, OnInit } from '@angular/core';
import { ProductEnriched } from '../../../models/product.model';
import { ClickableActionTheme } from '../../clickable-action/clickable-action.model';
import { BasketService } from '../../../services/basket.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rr-shop-delivery-overview-item]',
  templateUrl: './delivery-overview-item.component.html',
  styleUrls: ['./delivery-overview-item.component.scss']
})
export class DeliveryOverviewItemComponent implements OnInit {
  @Input()
  public productEnriched: ProductEnriched;

  public ClickableActionTheme = ClickableActionTheme;

  public constructor(protected basketService: BasketService) {}

  public ngOnInit(): void {}

  public chooseDelivery(productId: number): void {
    // this.basketService.
  }
}
