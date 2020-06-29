import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';

import { RrShopDocument, RrShopWindow } from '../models/root.model';

@Injectable({
  providedIn: 'root'
})
export class RootService {
  public readonly isPlatformBrowser: boolean = isPlatformBrowser(this.platformId);
  public readonly rrShopDocument: RrShopDocument = isPlatformBrowser(this.platformId)
    ? (document as RrShopDocument)
    : null;
  public readonly rrShopWindow: RrShopWindow = isPlatformBrowser(this.platformId) ? (window as RrShopWindow) : null;

  public constructor(@Inject(PLATFORM_ID) protected platformId: any) {}
}
