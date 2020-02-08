import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClickableActionType } from '../clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopSearchComponent implements OnInit {
  public query = '';

  public readonly ClickableActionType = ClickableActionType;

  public constructor(protected router: Router) {}

  public ngOnInit(): void {}

  public search(): void {
    console.log('test');
    this.query && this.router.navigate(['/search', this.query]).then(() => undefined);
  }
}
