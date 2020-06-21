import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-admin-session-info',
  templateUrl: './admin-session-info.component.html',
  styleUrls: ['./admin-session-info.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdminSessionInfoComponent implements OnInit {
  @Input()
  public expirationSeconds: number;

  public constructor() {}

  public ngOnInit(): void {}
}
