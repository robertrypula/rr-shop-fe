import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-admin-distributor-form',
  templateUrl: './admin-distributor-form.component.html',
  styleUrls: ['./admin-distributor-form.component.scss']
})
export class AdminDistributorFormComponent implements OnInit {
  @Input()
  public distributor: any;

  public constructor() {}

  public ngOnInit(): void {}
}
