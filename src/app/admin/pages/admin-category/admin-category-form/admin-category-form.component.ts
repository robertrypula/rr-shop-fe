import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-admin-category-form',
  templateUrl: './admin-category-form.component.html',
  styleUrls: ['./admin-category-form.component.scss']
})
export class AdminCategoryFormComponent implements OnInit {
  @Input()
  public category: any;

  @Input()
  public categories: any[];

  public constructor() {}

  public ngOnInit(): void {}
}
