import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminCategoryListComponent } from './admin/pages/admin-category-list/admin-category-list.component';
import { AdminCategoryListModule } from './admin/pages/admin-category-list/admin-category-list.module';
import { AdminCategoryComponent } from './admin/pages/admin-category/admin-category.component';
import { AdminCategoryModule } from './admin/pages/admin-category/admin-category.module';
import { AdminLoginComponent } from './admin/pages/admin-login/admin-login.component';
import { AdminLoginModule } from './admin/pages/admin-login/admin-login.module';
import { AdminOrderListComponent } from './admin/pages/admin-order-list/admin-order-list.component';
import { AdminOrderListModule } from './admin/pages/admin-order-list/admin-order-list.module';
import { AdminOrderComponent } from './admin/pages/admin-order/admin-order.component';
import { AdminOrderModule } from './admin/pages/admin-order/admin-order.module';
import { AdminProductListComponent } from './admin/pages/admin-product-list/admin-product-list.component';
import { AdminProductListModule } from './admin/pages/admin-product-list/admin-product-list.module';
import { AdminProductComponent } from './admin/pages/admin-product/admin-product.component';
import { AdminProductModule } from './admin/pages/admin-product/admin-product.module';
import { CategoryComponent } from './pages/category/category.component';
import { CategoryModule } from './pages/category/category.module';
import { MainComponent } from './pages/main/main.component';
import { MainModule } from './pages/main/main.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderPageModule } from './pages/order-page/order-page.module';
import { PotentialOrderComponent } from './pages/potential-order/potential-order.component';
import { PotentialOrderModule } from './pages/potential-order/potential-order.module';
import { ProductComponent } from './pages/product/product.component';
import { ProductModule } from './pages/product/product.module';
import { SearchComponent } from './pages/search/search.component';
import { SearchModule } from './pages/search/search.module';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'c/:id/:slug', component: CategoryComponent },
  { path: 'p/:id/:slug', component: ProductComponent },
  { path: 'order/:uuid', component: OrderPageComponent },
  { path: 'potential-order', component: PotentialOrderComponent },
  { path: 'search/:keywords', component: SearchComponent },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminLoginComponent, pathMatch: 'full' },
      { path: 'category', component: AdminCategoryListComponent, pathMatch: 'full' },
      { path: 'order', component: AdminOrderListComponent, pathMatch: 'full' },
      { path: 'product', component: AdminProductListComponent, pathMatch: 'full' },
      { path: 'category/new', component: AdminCategoryComponent, pathMatch: 'full' },
      { path: 'category/:id', component: AdminCategoryComponent },
      { path: 'order/:id', component: AdminOrderComponent },
      { path: 'product/:id', component: AdminProductComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    AdminCategoryModule,
    AdminCategoryListModule,
    AdminLoginModule,
    AdminOrderListModule,
    AdminOrderModule,
    AdminProductListModule,
    AdminProductModule,
    CategoryModule,
    MainModule,
    NotFoundModule,
    OrderPageModule,
    PotentialOrderModule,
    ProductModule,
    SearchModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
