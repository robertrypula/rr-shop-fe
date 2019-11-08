import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { delay, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'rr-shop-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public text$: Observable<string>;

  public constructor(protected activatedRoute: ActivatedRoute) {}

  public ngOnInit(): void {
    this.text$ = this.activatedRoute.paramMap.pipe(switchMap((params: ParamMap) => this.getDelayed(params.get('id'))));
  }

  public getDelayed(id: string): Observable<string> {
    return of(`Loaded category: ${id}`).pipe(delay(250));
  }
}
