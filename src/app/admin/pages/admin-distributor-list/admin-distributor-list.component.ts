import { Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall, AdminCallState } from '../../models/admin-component.models';
import { ClickableActionTheme, ClickableActionType } from '../../../components/clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-admin-distributor-list',
  templateUrl: './admin-distributor-list.component.html',
  styleUrls: ['./admin-distributor-list.component.scss']
})
export class AdminDistributorListComponent extends AdminBaseComponent implements OnInit {
  public distributors: AdminCall = this.getAdminCall<any[]>();

  public readonly AdminCallState = AdminCallState;
  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.distributors, 'distributor').subscribe();
  }
}
