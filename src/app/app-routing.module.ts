import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComponent } from './pages/category/category.component';
import { CategoryModule } from './pages/category/category.module';
import { MainComponent } from './pages/main/main.component';
import { MainModule } from './pages/main/main.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { PotentialOrderComponent } from './pages/potential-order/potential-order.component';
import { PotentialOrderModule } from './pages/potential-order/potential-order.module';
import { ProductComponent } from './pages/product/product.component';
import { ProductModule } from './pages/product/product.module';
import { SearchComponent } from './pages/search/search.component';
import { SearchModule } from './pages/search/search.module';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'potential-order', component: PotentialOrderComponent },
  { path: 'c/:id/:slug', component: CategoryComponent },
  { path: 'p/:id/:slug', component: ProductComponent },
  { path: 'search/:keywords', component: SearchComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    CategoryModule,
    MainModule,
    NotFoundModule,
    PotentialOrderModule,
    ProductModule,
    SearchModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
