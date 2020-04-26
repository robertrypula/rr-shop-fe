import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore, StructuralNode } from '../../models/category.model';

@Component({
  selector: 'rr-shop-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FooterComponent implements OnInit {
  public categories$: Observable<CategoryStore[]>;

  public readonly StructuralNode = StructuralNode;

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {
    this.categories$ = this.categoryFacadeService.categoriesByStructuralNode$(StructuralNode.Footer);
  }

  public trackBy(index: number, item: CategoryStore): string {
    return item.id + '';
  }
}
