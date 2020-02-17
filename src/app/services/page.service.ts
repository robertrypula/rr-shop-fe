import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { PageFacadeService } from '../store/facades/page-facade.service';

@Injectable({
  providedIn: 'root'
})
export class PageService {
  public isLoadingOverlayVisible$: Observable<boolean>;

  public constructor(protected pageFacadeService: PageFacadeService) {
    this.isLoadingOverlayVisible$ = pageFacadeService.isLoadingOverlayVisible$;
  }
}
