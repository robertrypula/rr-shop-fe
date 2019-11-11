import { createSelector } from '@ngrx/store';

import { State } from '../reducers';
import { Bar } from '../../models/bar.model';
import { selectProductFeature } from './product.selectors';

export const selectBasketFeature = (state: State) => state.basket;

// export const selectProducts = createSelector(
//   selectBasketFeature,
//   selectProductFeature,
//   (bar): Bar[] => Object.keys(bar).map(key => bar[key])
// );
