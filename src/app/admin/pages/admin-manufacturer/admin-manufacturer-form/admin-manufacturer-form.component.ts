import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-admin-manufacturer-form',
  templateUrl: './admin-manufacturer-form.component.html',
  styleUrls: ['./admin-manufacturer-form.component.scss']
})
export class AdminManufacturerFormComponent implements OnInit {
  @Input()
  public manufacturer: any;

  public constructor() {}

  public ngOnInit(): void {}
}
