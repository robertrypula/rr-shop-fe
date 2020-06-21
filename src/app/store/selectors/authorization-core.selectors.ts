import * as fromAuthorizationReducers from '../reducers/authorization.reducers';
import { State } from '../reducers';

export const selectAuthorizationFeature = (state: State): fromAuthorizationReducers.State => state.authorization;
