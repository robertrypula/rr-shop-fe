import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { CategoryFacadeService } from '../../store/facades/category-facade.service';
import { CategoryStore, StructuralNode } from '../../models/category.model';
import { MAIN_PAGE_PRODUCTS_IN_SECTION_LIMIT } from '../../config';
import { IconType } from '../../components/icon/icon.models';

@Component({
  selector: 'rr-shop-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainComponent implements OnInit {
  public categoriesMainPageSlider$: Observable<
    CategoryStore[]
  > = this.categoryFacadeService.categoriesByStructuralNode$(StructuralNode.MainPageSlider);

  public categoriesMainPage$: Observable<CategoryStore[]> = this.categoryFacadeService.categoriesByStructuralNode$(
    StructuralNode.MainPageCategories
  );

  public readonly IconType = IconType;
  public readonly MAIN_PAGE_PRODUCTS_IN_SECTION_LIMIT = MAIN_PAGE_PRODUCTS_IN_SECTION_LIMIT;

  public constructor(protected categoryFacadeService: CategoryFacadeService) {}

  public ngOnInit(): void {}
}
