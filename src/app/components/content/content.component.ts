import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'rr-shop-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContentComponent {
  public constructor() {}
}
