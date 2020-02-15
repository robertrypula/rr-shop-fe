import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ActiveLevelUpdateEntry, Category, StructuralNode } from '../../models/category.model';
import { CategoryService } from '../../services/category.service';
import { RouterFacadeService } from '../../store/facades/router-facade.service';

@Component({
  selector: 'rr-shop-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopMenuComponent implements OnInit {
  public categories$: Observable<Category[]>;
  public url$: Observable<string>;
  public activeLevelUpdateEntriesBasedOnRoute$: Observable<ActiveLevelUpdateEntry[]>;

  public constructor(protected categoryService: CategoryService, protected routerFacadeService: RouterFacadeService) {
    this.categories$ = this.categoryService.categoriesByStructuralNode$(StructuralNode.Header);
    this.url$ = this.routerFacadeService.url$;
    this.activeLevelUpdateEntriesBasedOnRoute$ = this.categoryService.activeLevelUpdateEntriesBasedOnRoute$;
  }

  public ngOnInit(): void {}

  public trackBy(index: number, item: Category): string {
    return item.id + '';
  }
}
