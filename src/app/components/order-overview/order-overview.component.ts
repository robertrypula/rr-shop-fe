import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { OrderEntry, Type } from '../../models/order.model';
import { OrderService } from '../../services/order.service';

@Component({
  selector: 'rr-shop-order-overview',
  templateUrl: './order-overview.component.html',
  styleUrls: ['./order-overview.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrderOverviewComponent implements OnInit {
  public orderEntriesNormal$: Observable<OrderEntry[]>;

  public constructor(protected orderService: OrderService) {
    this.orderEntriesNormal$ = this.orderService.orderEntriesByType$([Type.Normal]);
  }

  public ngOnInit(): void {}

  public trackBy(index: number, item: OrderEntry): string {
    return item.id + '';
  }
}
