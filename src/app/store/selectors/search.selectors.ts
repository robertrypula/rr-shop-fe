import { createSelector } from '@ngrx/store';

import { isOnSearchRoute } from '../../utils/routing.utils';

import { selectUrl } from './router.selectors';

export const selectIsOnSearchRoute = createSelector(selectUrl, (url: string): boolean => {
  return isOnSearchRoute(url);
});
