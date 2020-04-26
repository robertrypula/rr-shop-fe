import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';

import { ProductStore } from '../../models/product.model';

export const searchRequest = createAction('[Search] Search request');

export const searchSuccess = createAction('[Search] Search success', props<{ productsStore: ProductStore[] }>());

export const searchFailure = createAction('[Search] Search failure', props<{ httpErrorResponse: HttpErrorResponse }>());

export const setQuery = createAction('[Search] Set query', props<{ query: string }>());
