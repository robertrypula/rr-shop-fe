import { Component, Input, OnInit } from '@angular/core';
import { IconName, IconPrefix } from '@fortawesome/fontawesome-common-types';

@Component({
  selector: 'rr-shop-icon',
  templateUrl: './icon.component.html',
  styleUrls: ['./icon.component.scss']
})
export class IconComponent implements OnInit {
  @Input()
  public icon: [IconPrefix, IconName];

  public constructor() {}

  public ngOnInit(): void {}
}
