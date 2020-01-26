import { Component, OnInit } from '@angular/core';
import { ViewportService } from '../../services/viewport.service';

@Component({
  selector: 'rr-shop-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  public constructor(public viewportService: ViewportService) {}

  public ngOnInit(): void {}
}
