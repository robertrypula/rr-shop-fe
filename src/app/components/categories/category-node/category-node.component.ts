import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Category } from '../../../models/category.model';
import { CategoryService } from '../../../services/category.service';

@Component({
  selector: 'rr-shop-category-node',
  templateUrl: './category-node.component.html',
  styleUrls: ['./category-node.component.scss']
})
export class CategoryNodeComponent implements OnInit {
  @Input()
  public parentId: number;

  public categories$: Observable<Category[]>;

  public constructor(protected categoryService: CategoryService) {}

  public ngOnInit(): void {
    this.categories$ = this.categoryService.categoriesByParentId$(this.parentId);
  }
}
