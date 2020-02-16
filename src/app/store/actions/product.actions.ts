import { createAction, props } from '@ngrx/store';
import { HttpErrorResponse } from '@angular/common/http';

import { Product } from '../../models/product.model';

export const productsRequest = createAction('[Product] Request');

export const productsSuccess = createAction('[Product] Success', props<{ products: Product[] }>());

export const productsFailure = createAction('[Product] Failure', props<{ httpErrorResponse: HttpErrorResponse }>());
