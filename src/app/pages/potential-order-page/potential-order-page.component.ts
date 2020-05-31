import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { Order } from '../../models/order.model';
import { POTENTIAL_ORDER_UUID } from '../../store/reducers/order.reducers';

@Component({
  selector: 'rr-shop-potential-order-page',
  templateUrl: './potential-order-page.component.html',
  styleUrls: ['./potential-order-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PotentialOrderPageComponent implements OnInit {
  public potentialOrder$: Observable<Order> = this.orderFacadeService.orderByUuid$(POTENTIAL_ORDER_UUID);
  public regulations$: Observable<CategoryStore> = this.categoryFacadeService.categoryByStructuralNode$(
    StructuralNode.Regulations
  );
  public privacyPolicy$: Observable<CategoryStore> = this.categoryFacadeService.categoryByStructuralNode$(
    StructuralNode.PrivacyPolicy
  );

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected orderFacadeService: OrderFacadeService
  ) {}

  public ngOnInit(): void {}
}
