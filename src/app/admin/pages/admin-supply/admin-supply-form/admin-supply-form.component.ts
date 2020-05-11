import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-admin-supply-form',
  templateUrl: './admin-supply-form.component.html',
  styleUrls: ['./admin-supply-form.component.scss']
})
export class AdminSupplyFormComponent implements OnInit {
  @Input()
  public supply: any;

  @Input()
  public products: any[];

  public constructor() {}

  public ngOnInit(): void {}
}
