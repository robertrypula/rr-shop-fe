import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

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
  public query$: Observable<string> = this.searchFacadeService.query$;
  public query = '';

  public readonly ClickableActionType = ClickableActionType;
  public readonly IconType = IconType;

  public constructor(
    protected router: Router,
    protected searchFacadeService: SearchFacadeService,
    protected changeDetectorRef: ChangeDetectorRef
  ) {}

  public ngOnInit(): void {
    this.query$
      .pipe(
        tap((query: string): void => {
          this.query = query;
          this.changeDetectorRef.markForCheck();
        })
      )
      .subscribe();
  }

  public change(query: string): void {
    this.searchFacadeService.setQuery(query);
  }

  public search(): void {
    this.query && this.router.navigate(['/search', this.query]).then(() => undefined);
  }
}
