import { CategoryEffects } from './effects/category-effects.service';
import { OrderEffects } from './effects/order-effects.service';
import { ProductsEffects } from './effects/products-effects.service';
import { RouterEffects } from './effects/router-effects.service';
import { SearchEffects } from './effects/search-effects.service';
import { ViewportEffects } from './effects/viewport-effects.service';

export const effects = [CategoryEffects, OrderEffects, ProductsEffects, RouterEffects, SearchEffects, ViewportEffects];
