import { Component, OnInit } from '@angular/core';

import { AdminBaseComponent } from '../admin-base-component.class';
import { AdminCall, AdminCallState } from '../../models/admin-component.models';
import { ClickableActionTheme, ClickableActionType } from '../../../components/clickable-action/clickable-action.model';

@Component({
  selector: 'rr-shop-admin-image-list',
  templateUrl: './admin-image-list.component.html',
  styleUrls: ['./admin-image-list.component.scss']
})
export class AdminImageListComponent extends AdminBaseComponent implements OnInit {
  public images: AdminCall = this.getAdminCall<any[]>();

  public readonly AdminCallState = AdminCallState;
  public readonly ClickableActionTheme = ClickableActionTheme;
  public readonly ClickableActionType = ClickableActionType;

  public ngOnInit(): void {
    this.refresh();
  }

  public refresh(): void {
    this.get(this.images, 'image').subscribe();
  }
}
