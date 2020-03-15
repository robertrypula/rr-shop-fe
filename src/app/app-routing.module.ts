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
import { OrderComponent } from './pages/order/order.component';
import { OrderModule } from './pages/order/order.module';

import { AdminOrderComponent } from './pages-admin/admin-order/admin-order.component';
import { AdminOrderListComponent } from './pages-admin/admin-order-list/admin-order-list.component';
import { AdminOrderListModule } from './pages-admin/admin-order-list/admin-order-list.module';
import { AdminOrderModule } from './pages-admin/admin-order/admin-order.module';
import { AdminProductComponent } from './pages-admin/admin-product/admin-product.component';
import { AdminProductListComponent } from './pages-admin/admin-product-list/admin-product-list.component';
import { AdminProductListModule } from './pages-admin/admin-product-list/admin-product-list.module';
import { AdminProductModule } from './pages-admin/admin-product/admin-product.module';
import { AdminLoginComponent } from './pages-admin/admin-login/admin-login.component';
import { AdminLoginModule } from './pages-admin/admin-login/admin-login.module';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'c/:id/:slug', component: CategoryComponent },
  { path: 'p/:id/:slug', component: ProductComponent },
  { path: 'order/:uuid', component: OrderComponent },
  { path: 'potential-order', component: PotentialOrderComponent },
  { path: 'search/:keywords', component: SearchComponent },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminLoginComponent, pathMatch: 'full' },
      { path: 'order', component: AdminOrderListComponent, pathMatch: 'full' },
      { path: 'product', component: AdminProductListComponent, pathMatch: 'full' },
      { path: 'order/:id', component: AdminOrderComponent },
      { path: 'product/:id', component: AdminProductComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    AdminLoginModule,
    AdminOrderListModule,
    AdminOrderModule,
    AdminProductListModule,
    AdminProductModule,
    CategoryModule,
    MainModule,
    NotFoundModule,
    OrderModule,
    PotentialOrderModule,
    ProductModule,
    SearchModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
