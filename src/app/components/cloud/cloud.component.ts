import { Component, OnInit } from '@angular/core';
import { CLOUD_HIDE_DELAY, CLOUD_SHOW_DELAY } from '../../config/cloud.config';

@Component({
  selector: 'rr-shop-cloud',
  templateUrl: './cloud.component.html',
  styleUrls: ['./cloud.component.scss']
})
export class CloudComponent implements OnInit {
  public isVisible = false;

  protected timerShow: any;
  protected timerHide: any;

  public constructor() {}

  public ngOnInit(): void {}

  public hide(): void {
    this.clearTimers();
    this.timerHide = setTimeout(() => {
      this.isVisible = false;
    }, CLOUD_HIDE_DELAY);
  }

  public show(): void {
    this.clearTimers();
    this.timerShow = setTimeout(() => {
      this.isVisible = true;
    }, CLOUD_SHOW_DELAY);
  }

  protected clearTimers(): void {
    this.timerHide && clearTimeout(this.timerHide);
    this.timerShow && clearTimeout(this.timerShow);
  }
}
