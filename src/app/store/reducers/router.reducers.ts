import { Params, RouterStateSnapshot } from '@angular/router';
import { RouterReducerState, routerReducer, RouterStateSerializer } from '@ngrx/router-store';
import { Action } from '@ngrx/store';
import { StoreRouterConfig } from '@ngrx/router-store/src/router_store_module';

export interface InnerState {
  url: string;
  params: Params;
  queryParams: Params;
}

export type State = RouterReducerState<InnerState>;

export function reducer(state: State | undefined, action: Action) {
  return routerReducer(state, action);
}

// -----------------------------------------------------------------------------

export class CustomRouterStateSerializer implements RouterStateSerializer<InnerState> {
  public serialize(routerState: RouterStateSnapshot): InnerState {
    let route = routerState.root;

    console.log(routerState);

    while (route.firstChild) {
      route = route.firstChild;
    }

    const {
      url,
      root: { queryParams }
    } = routerState;
    const { params } = route;

    return { url, params, queryParams };
  }
}

export const routerStateConfig: StoreRouterConfig = {
  stateKey: 'router',
  serializer: CustomRouterStateSerializer
};

/*
export interface MergedRoute {
  url: string;
  queryParams: Params;
  params: Params;
  data: Data;
}
export type MergedRouteReducerState = RouterReducerState<MergedRoute>;



export class CustomSerializer implements RouterStateSerializer<MergedRoute> {
  serialize(routerState: RouterStateSnapshot): MergedRoute {
    return {
      url: routerState.url,
      params: mergeRouteParams(routerState.root, r => r.params),
      queryParams: mergeRouteParams(routerState.root, r => r.queryParams),
      data: mergeRouteData(routerState.root)
    };
  }
}

function mergeRouteParams(route: ActivatedRouteSnapshot, getter: (r: ActivatedRouteSnapshot) => Params): Params {
  if (!route) {
    return {};
  }
  const currentParams = getter(route);
  const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
  return {...currentParams, ...mergeRouteParams(primaryChild, getter)};
}

function mergeRouteData(route: ActivatedRouteSnapshot): Data {
  if (!route) {
    return {};
  }

  const currentData = route.data;
  const primaryChild = route.children.find(c => c.outlet === 'primary') || route.firstChild;
  return {...currentData, ...mergeRouteData(primaryChild)};
}
*/
