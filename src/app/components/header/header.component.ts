import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

import { H1_TEXT } from '../../config';

@Component({
  selector: 'rr-shop-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent implements OnInit {
  public h1Text: string = H1_TEXT;

  public constructor() {}

  public ngOnInit(): void {}
}
