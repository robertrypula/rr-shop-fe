import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '../../../services/category.service';
import { Observable } from 'rxjs';
import { Category } from '../../../models/category.model';

@Component({
  selector: 'rr-shop-footer-group',
  templateUrl: './footer-group.component.html',
  styleUrls: ['./footer-group.component.scss']
})
export class FooterGroupComponent implements OnInit {
  @Input()
  public parentId: number;

  public categories$: Observable<Category[]>;

  public constructor(protected categoryService: CategoryService) {}

  public ngOnInit(): void {
    this.categories$ = this.categoryService.categoriesByParentId$(this.parentId);
  }
}
