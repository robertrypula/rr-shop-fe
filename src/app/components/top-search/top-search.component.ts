import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ClickableActionType } from '../clickable-action/clickable-action.model';
import { IconType } from '../icon/icon.models';
import { SearchFacadeService } from '../../store/facades/search-facade.service';

@Component({
  selector: 'rr-shop-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopSearchComponent implements OnInit {
  public query = '';

  public readonly ClickableActionType = ClickableActionType;
  public readonly IconType = IconType;

  public constructor(protected router: Router, protected searchFacadeService: SearchFacadeService) {}

  public ngOnInit(): void {}

  public change(query: string): void {
    this.searchFacadeService.setQuery(query);
  }

  public search(): void {
    this.query && this.router.navigate(['/search', this.query]).then(() => undefined);
  }
}
