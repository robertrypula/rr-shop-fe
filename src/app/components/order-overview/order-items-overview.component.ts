import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderItem, Type } from '../../models/order.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';

@Component({
  selector: 'rr-shop-order-items-overview',
  templateUrl: './order-items-overview.component.html',
  styleUrls: ['./order-items-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderItemsOverviewComponent implements OnInit {
  public orderItemsByProductType$: Observable<OrderItem[]> = this.orderFacadeService.orderItemsByType$([Type.Product]);

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: OrderItem): string {
    return item.id + '';
  }
}
