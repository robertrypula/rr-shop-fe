import { Injectable } from '@angular/core';

import { RrShopWindow } from '../models/page.model';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public constructor() {}

  public getRrShopWindow(): RrShopWindow {
    return window as RrShopWindow;
  }
}
