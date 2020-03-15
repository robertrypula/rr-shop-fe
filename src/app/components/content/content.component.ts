import { Component } from '@angular/core';

@Component({
  selector: 'rr-shop-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss']
  // changeDetection: ChangeDetectionStrategy.OnPush // TODO admin is not working when OnPush is enabled
})
export class ContentComponent {
  public constructor() {}
}
