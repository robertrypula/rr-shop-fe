import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { Product } from '../../models/product.model';
import { SearchFacadeService } from '../../store/facades/search-facade.service';

@Component({
  selector: 'rr-shop-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SearchComponent implements OnInit {
  public productsByQuery$: Observable<Product[]> = this.searchFacadeService.productsByQuery$;

  public constructor(protected searchFacadeService: SearchFacadeService) {}

  public ngOnInit(): void {}
}
