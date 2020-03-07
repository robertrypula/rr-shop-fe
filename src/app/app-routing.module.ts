import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BasketComponent } from './pages/basket/basket.component';
import { BasketModule } from './pages/basket/basket.module';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryModule } from './pages/category/category.module';
import { MainComponent } from './pages/main/main.component';
import { MainModule } from './pages/main/main.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { ProductComponent } from './pages/product/product.component';
import { ProductModule } from './pages/product/product.module';
import { SearchComponent } from './pages/search/search.component';
import { SearchModule } from './pages/search/search.module';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'basket', component: BasketComponent },
  { path: 'c/:id/:slug', component: CategoryComponent },
  { path: 'p/:id/:slug', component: ProductComponent },
  { path: 'search/:keywords', component: SearchComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    ProductModule,
    CategoryModule,
    NotFoundModule,
    MainModule,
    BasketModule,
    SearchModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
