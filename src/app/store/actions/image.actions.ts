import { createAction, props } from '@ngrx/store';

import { Image } from '../../models/image.model';

export const imageSet = createAction('[Image] Set', props<{ images: Image[] }>());
