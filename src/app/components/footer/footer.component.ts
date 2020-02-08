import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { CategoryService } from '../../services/category.service';
import { Category, StructuralNode } from '../../models/category.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'rr-shop-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  public categories$: Observable<Category[]>;

  public readonly StructuralNode = StructuralNode;

  public constructor(protected categoryService: CategoryService) {}

  public ngOnInit(): void {
    this.categories$ = this.categoryService.categoriesByStructuralNode$(StructuralNode.Footer);
  }

  public trackBy(index: number, item: Category): string {
    return item.id + '';
  }
}
