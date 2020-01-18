import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ClickableActionType } from '../button/clickable-action.model';

@Component({
  selector: 'rr-shop-top-search',
  templateUrl: './top-search.component.html',
  styleUrls: ['./top-search.component.scss']
})
export class TopSearchComponent implements OnInit {
  public query = '';

  public readonly ClickableActionType = ClickableActionType;

  public constructor(protected router: Router) {}

  public ngOnInit(): void {}

  public search(): void {
    this.query && this.router.navigate(['/search', this.query]).then(() => undefined);
  }
}
