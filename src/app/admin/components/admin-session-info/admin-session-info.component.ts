import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

import { ADMIN_SESSION_WARNING_CLOSE_TO_EXPIRE, ADMIN_SESSION_WARNING_LAST_MOMENTS } from '../../../config';

@Component({
  selector: 'rr-shop-admin-session-info',
  templateUrl: './admin-session-info.component.html',
  styleUrls: ['./admin-session-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSessionInfoComponent implements OnInit {
  @Input()
  public expirationSeconds: number;

  public readonly ADMIN_SESSION_WARNING_CLOSE_TO_EXPIRE = ADMIN_SESSION_WARNING_CLOSE_TO_EXPIRE;
  public readonly ADMIN_SESSION_WARNING_LAST_MOMENTS = ADMIN_SESSION_WARNING_LAST_MOMENTS;

  public constructor() {}

  public ngOnInit(): void {}
}
