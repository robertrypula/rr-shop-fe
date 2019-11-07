import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductModule } from './pages/product/product.module';
import { CategoryModule } from './pages/category/category.module';

const routes: Routes = [
  { path: 'product/:id', component: ProductComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: '', redirectTo: '/category/', pathMatch: 'full' },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '**', component: ProductComponent } // TODO add not found route
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProductModule, CategoryModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
