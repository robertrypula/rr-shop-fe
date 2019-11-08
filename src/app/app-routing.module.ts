import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProductComponent } from './pages/product/product.component';
import { CategoryComponent } from './pages/category/category.component';
import { ProductModule } from './pages/product/product.module';
import { CategoryModule } from './pages/category/category.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundModule } from './pages/not-found/not-found.module';

const routes: Routes = [
  { path: 'product/:id', component: ProductComponent },
  { path: 'category/:id', component: CategoryComponent },
  { path: '', redirectTo: '/category/', pathMatch: 'full' },
  // {
  //   path: 'heroes',
  //   component: HeroListComponent,
  //   data: { title: 'Heroes List' }
  // },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ProductModule, CategoryModule, NotFoundModule],
  exports: [RouterModule]
})
export class AppRoutingModule {}
