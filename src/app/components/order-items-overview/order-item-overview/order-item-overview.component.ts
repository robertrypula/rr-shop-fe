import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { OrderService } from '../../../services/order.service';
import { SizeImage, SizeImageContainer } from '../../../models/image.model';
import { OrderFacadeService } from '../../../store/facades/order-facade.service';
import { OrderItem } from '../../../models/order-item.model';
import { IconType } from '../../icon/icon.models';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[rr-shop-order-item-overview]',
  templateUrl: './order-item-overview.component.html',
  styleUrls: ['./order-item-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemOverviewComponent implements OnInit {
  @Input()
  public orderItem: OrderItem;

  public readonly SizeImage = SizeImage;
  public readonly SizeImageContainer = SizeImageContainer;
  public readonly IconType = IconType;

  public constructor(protected orderFacadeService: OrderFacadeService, protected orderService: OrderService) {}

  public ngOnInit(): void {}

  public quantityDecrement(orderItemId: number): void {
    this.orderFacadeService.quantityDecrement(orderItemId);
  }

  public quantityIncrement(orderItemId: number): void {
    this.orderFacadeService.quantityIncrement(orderItemId);
  }

  public remove(orderItemId: number): void {
    this.orderService.remove(orderItemId);
  }
}
