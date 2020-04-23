import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Order } from '../../models/order.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { POTENTIAL_ORDER_UUID } from '../../store/reducers/order.reducers';
import { Type } from '../../models/product.model';
import { ClickableActionTheme } from '../../components/clickable-action/clickable-action.model';
import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { IconType } from '../../components/icon/icon.models';

@Component({
  selector: 'rr-shop-potential-order',
  templateUrl: './potential-order.component.html',
  styleUrls: ['./potential-order.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PotentialOrderComponent implements OnInit {
  public potentialOrder$: Observable<Order> = this.orderFacadeService.orderByUuid$(POTENTIAL_ORDER_UUID);
  public regulations$: Observable<CategoryStore> = this.categoryFacadeService.categoryByStructuralNode$(
    StructuralNode.Regulations
  );
  public privacyPolicy$: Observable<CategoryStore> = this.categoryFacadeService.categoryByStructuralNode$(
    StructuralNode.PrivacyPolicy
  );

  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly IconType = IconType;
  public readonly Type = Type;

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected orderFacadeService: OrderFacadeService
  ) {}

  public ngOnInit(): void {}

  public createOrder(): void {
    this.orderFacadeService.createOrder();
  }

  public toggleLegalConfirmation(): void {
    this.orderFacadeService.toggleLegalConfirmation();
  }
}
