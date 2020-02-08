import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-header-image-separator',
  templateUrl: './header-image-separator.component.html',
  styleUrls: ['./header-image-separator.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderImageSeparatorComponent implements OnInit {
  public constructor() {}

  public ngOnInit(): void {}
}
