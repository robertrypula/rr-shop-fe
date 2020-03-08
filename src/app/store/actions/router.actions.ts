import { createAction } from '@ngrx/store';

export const firstRouteChange = createAction('[Router] First route change');

export const routeChangedAfterInit = createAction('[Router] Route change after init');
