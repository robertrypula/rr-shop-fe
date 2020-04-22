import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { ClickableActionType } from '../../../components/clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-admin-menu',
  templateUrl: './admin-menu.component.html',
  styleUrls: ['./admin-menu.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminMenuComponent implements OnInit {
  public readonly ClickableActionType = ClickableActionType;

  public constructor() {}

  public ngOnInit() {}
}
