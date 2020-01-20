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

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'basket', component: BasketComponent },
  { path: 'product/:productIdWithSlug', component: ProductComponent },
  { path: 'search/:keywords', component: CategoryComponent },
  { path: ':categoryIdWithSlug', component: CategoryComponent },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProductModule, CategoryModule, NotFoundModule, MainModule, BasketModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
