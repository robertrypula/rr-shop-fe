import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public constructor() {}

  public ngOnInit(): void {}
}
