import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

import { IconType } from './icon.models';

@Component({
  selector: 'rr-shop-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class IconComponent {
  @Input()
  public icon: [IconPrefix, IconName];

  @Input()
  public color = 'inherit';

  @Input()
  public width = 64;

  @Input()
  public height = 64;

  @Input()
  public iconType: IconType;

  public readonly IconType = IconType;
}
