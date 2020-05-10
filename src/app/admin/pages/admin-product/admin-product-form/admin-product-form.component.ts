import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-admin-product-form',
  templateUrl: './admin-product-form.component.html',
  styleUrls: ['./admin-product-form.component.scss']
})
export class AdminProductFormComponent implements OnInit {
  @Input()
  public product: any;

  public constructor() {}

  public ngOnInit(): void {}
}
