import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  @Input()
  public categories: any[];

  @Input()
  public distributors: any[];

  @Input()
  public manufacturers: any[];

  @Input()
  public product: any;

  public readonly CASH_REGISTER_NAME_MAX_LENGTH = 40;

  public constructor() {}

  public ngOnInit(): void {}
}
