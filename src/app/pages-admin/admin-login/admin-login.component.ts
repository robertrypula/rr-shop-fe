import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'rr-shop-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {
  public constructor() {}

  public ngOnInit(): void {}

  public onSubmit(): void {
    console.log('test');
  }
}
