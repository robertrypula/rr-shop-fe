import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderItem, Type } from '../../models/order.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';

@Component({
  selector: 'rr-shop-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderOverviewComponent implements OnInit {
  public orderItemsNormal$: Observable<OrderItem[]> = this.orderFacadeService.orderItemsByType$([Type.Normal]);

  public constructor(protected orderFacadeService: OrderFacadeService) {}

  public ngOnInit(): void {}

  public trackBy(index: number, item: OrderItem): string {
    return item.id + '';
  }
}
