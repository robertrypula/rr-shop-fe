import { ChangeDetectionStrategy, Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'rr-shop-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IconComponent implements OnInit {
  @Input()
  public icon: [IconPrefix, IconName];

  public constructor() {}

  public ngOnInit(): void {}
}
