import { Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall, AdminCallState } from '../../models/admin-component.models';
import { ClickableActionTheme, ClickableActionType } from '../../../components/clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-admin-supply-list',
  templateUrl: './admin-supply-list.component.html',
  styleUrls: ['./admin-supply-list.component.scss']
})
export class AdminSupplyListComponent extends AdminBaseComponent implements OnInit {
  public supplies: AdminCall = this.getAdminCall<any[]>();

  public readonly AdminCallState = AdminCallState;
  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.supplies, 'supply').subscribe();
  }
}
