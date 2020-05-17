import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-loading-overlay',
  templateUrl: './loading-overlay.component.html',
  styleUrls: ['./loading-overlay.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoadingOverlayComponent implements OnInit {
  public constructor() {}

  public ngOnInit(): void {}
}
