import { Component, OnInit } from '@angular/core';

import { H1_TEXT } from '../../config';

@Component({
  selector: 'rr-shop-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  public readonly h1Text: string = H1_TEXT;

  public constructor() {}

  public ngOnInit(): void {}
}
