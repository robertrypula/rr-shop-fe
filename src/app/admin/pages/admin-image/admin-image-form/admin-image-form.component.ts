import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-admin-image-form',
  templateUrl: './admin-image-form.component.html',
  styleUrls: ['./admin-image-form.component.scss']
})
export class AdminImageFormComponent implements OnInit {
  @Input()
  public image: any;

  @Input()
  public categories: any[];

  @Input()
  public manufacturers: any[];

  @Input()
  public products: any[];

  public constructor() {}

  public ngOnInit(): void {}
}
