import { Component, Input, OnInit } from '@angular/core';

import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { IconType } from '../icon/icon.models';
import { SizeImage, SizeImageContainer } from '../../models/image.model';
import { OrderFacadeService } from '../../store/facades/order-facade.service';
import { OrderService } from '../../services/order.service';
import { Product } from '../../models/product.model';

@Component({
  selector: 'rr-shop-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  @Input()
  public product: Product;

  public readonly IconType = IconType;
  public readonly SizeImage = SizeImage;
  public readonly SizeImageContainer = SizeImageContainer;

  public constructor(
    protected categoryFacadeService: CategoryFacadeService,
    protected orderService: OrderService,
    protected orderFacadeService: OrderFacadeService
  ) {}

  public ngOnInit(): void {}

  public addToOrder(product: Product): void {
    this.orderService.add(product);
  }

  public quantityDecrement(id: number): void {
    this.orderFacadeService.quantityDecrement(id);
  }

  public quantityIncrement(id: number): void {
    this.orderFacadeService.quantityIncrement(id);
  }

  public remove(id: number): void {
    this.orderService.remove(id);
  }
}
