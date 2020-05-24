import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../../store/facades/category-facade.service';
import { CategoryStore } from '../../../models/category.model';

@Component({
  selector: 'rr-shop-category-related-products',
  templateUrl: './category-related-products.component.html',
  styleUrls: ['./category-related-products.component.scss']
})
export class CategoryRelatedProductsComponent implements OnInit {
  @Input()
  public categoryId: number;

  public category: Observable<CategoryStore>;

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {
    this.category = this.categoryFacadeService.categoryByCategoryId$(this.categoryId);
  }
}
