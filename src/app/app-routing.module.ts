import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdminCategoryCreateComponent } from './admin/pages/admin-category/admin-category-create/admin-category-create.component';
import { AdminCategoryEditComponent } from './admin/pages/admin-category/admin-category-edit/admin-category-edit.component';
import { AdminCategoryListComponent } from './admin/pages/admin-category-list/admin-category-list.component';
import { AdminCategoryListModule } from './admin/pages/admin-category-list/admin-category-list.module';
import { AdminCategoryModule } from './admin/pages/admin-category/admin-category.module';
import { AdminDistributorCreateComponent } from './admin/pages/admin-distributor/admin-distributor-create/admin-distributor-create.component';
import { AdminDistributorEditComponent } from './admin/pages/admin-distributor/admin-distributor-edit/admin-distributor-edit.component';
import { AdminDistributorListComponent } from './admin/pages/admin-distributor-list/admin-distributor-list.component';
import { AdminDistributorListModule } from './admin/pages/admin-distributor-list/admin-distributor-list.module';
import { AdminDistributorModule } from './admin/pages/admin-distributor/admin-distributor.module';
import { AdminImageCreateComponent } from './admin/pages/admin-image/admin-image-create/admin-image-create.component';
import { AdminImageEditComponent } from './admin/pages/admin-image/admin-image-edit/admin-image-edit.component';
import { AdminImageListComponent } from './admin/pages/admin-image-list/admin-image-list.component';
import { AdminImageListModule } from './admin/pages/admin-image-list/admin-image-list.module';
import { AdminImageModule } from './admin/pages/admin-image/admin-image.module';
import { AdminLoginComponent } from './admin/pages/admin-login/admin-login.component';
import { AdminLoginModule } from './admin/pages/admin-login/admin-login.module';
import { AdminManufacturerCreateComponent } from './admin/pages/admin-manufacturer/admin-manufacturer-create/admin-manufacturer-create.component';
import { AdminManufacturerEditComponent } from './admin/pages/admin-manufacturer/admin-manufacturer-edit/admin-manufacturer-edit.component';
import { AdminManufacturerListComponent } from './admin/pages/admin-manufacturer-list/admin-manufacturer-list.component';
import { AdminManufacturerListModule } from './admin/pages/admin-manufacturer-list/admin-manufacturer-list.module';
import { AdminManufacturerModule } from './admin/pages/admin-manufacturer/admin-manufacturer.module';
import { AdminOrderListComponent } from './admin/pages/admin-order-list/admin-order-list.component';
import { AdminOrderListModule } from './admin/pages/admin-order-list/admin-order-list.module';
import { AdminOrderComponent } from './admin/pages/admin-order/admin-order.component';
import { AdminOrderModule } from './admin/pages/admin-order/admin-order.module';
import { AdminProductCreateComponent } from './admin/pages/admin-product/admin-product-create/admin-product-create.component';
import { AdminProductEditComponent } from './admin/pages/admin-product/admin-product-edit/admin-product-edit.component';
import { AdminProductListComponent } from './admin/pages/admin-product-list/admin-product-list.component';
import { AdminProductListModule } from './admin/pages/admin-product-list/admin-product-list.module';
import { AdminProductModule } from './admin/pages/admin-product/admin-product.module';
import { AdminSupplyCreateComponent } from './admin/pages/admin-supply/admin-supply-create/admin-supply-create.component';
import { AdminSupplyEditComponent } from './admin/pages/admin-supply/admin-supply-edit/admin-supply-edit.component';
import { AdminSupplyListComponent } from './admin/pages/admin-supply-list/admin-supply-list.component';
import { AdminSupplyListModule } from './admin/pages/admin-supply-list/admin-supply-list.module';
import { AdminSupplyModule } from './admin/pages/admin-supply/admin-supply.module';
import { CategoryPageComponent } from './pages/category-page/category-page.component';
import { CategoryPageModule } from './pages/category-page/category-page.module';
import { MainComponent } from './pages/main/main.component';
import { MainModule } from './pages/main/main.module';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { NotFoundModule } from './pages/not-found/not-found.module';
import { OrderPageComponent } from './pages/order-page/order-page.component';
import { OrderPageModule } from './pages/order-page/order-page.module';
import { PotentialOrderPageComponent } from './pages/potential-order-page/potential-order-page.component';
import { PotentialOrderPageModule } from './pages/potential-order-page/potential-order-page.module';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { ProductPageModule } from './pages/product-page/product-page.module';
import { SearchComponent } from './pages/search/search.component';
import { SearchModule } from './pages/search/search.module';

const routes: Routes = [
  { path: '', component: MainComponent, pathMatch: 'full' },
  { path: 'c/:id/:slug/:sortBy', component: CategoryPageComponent },
  { path: 'p/:id/:slug', component: ProductPageComponent },
  { path: 'order/:uuid', component: OrderPageComponent },
  { path: 'potential-order', component: PotentialOrderPageComponent },
  { path: 'search/:keywords', component: SearchComponent },
  {
    path: 'admin',
    children: [
      { path: '', component: AdminLoginComponent, pathMatch: 'full' },
      { path: 'category', component: AdminCategoryListComponent, pathMatch: 'full' },
      { path: 'category/new', component: AdminCategoryCreateComponent, pathMatch: 'full' },
      { path: 'distributor', component: AdminDistributorListComponent, pathMatch: 'full' },
      { path: 'distributor/new', component: AdminDistributorCreateComponent, pathMatch: 'full' },
      { path: 'image', component: AdminImageListComponent, pathMatch: 'full' },
      { path: 'image/new', component: AdminImageCreateComponent, pathMatch: 'full' },
      { path: 'manufacturer', component: AdminManufacturerListComponent, pathMatch: 'full' },
      { path: 'manufacturer/new', component: AdminManufacturerCreateComponent, pathMatch: 'full' },
      { path: 'order', component: AdminOrderListComponent, pathMatch: 'full' },
      { path: 'product', component: AdminProductListComponent, pathMatch: 'full' },
      { path: 'product/new', component: AdminProductCreateComponent, pathMatch: 'full' },
      { path: 'supply', component: AdminSupplyListComponent, pathMatch: 'full' },
      { path: 'supply/new', component: AdminSupplyCreateComponent, pathMatch: 'full' },
      { path: 'category/:id', component: AdminCategoryEditComponent },
      { path: 'distributor/:id', component: AdminDistributorEditComponent },
      { path: 'image/:id', component: AdminImageEditComponent },
      { path: 'manufacturer/:id', component: AdminManufacturerEditComponent },
      { path: 'order/:id', component: AdminOrderComponent },
      { path: 'product/:id', component: AdminProductEditComponent },
      { path: 'supply/:id', component: AdminSupplyEditComponent }
    ]
  },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    AdminCategoryListModule,
    AdminCategoryModule,
    AdminDistributorListModule,
    AdminDistributorModule,
    AdminImageListModule,
    AdminImageModule,
    AdminLoginModule,
    AdminManufacturerListModule,
    AdminManufacturerModule,
    AdminOrderListModule,
    AdminOrderModule,
    AdminProductListModule,
    AdminProductModule,
    AdminSupplyListModule,
    AdminSupplyModule,
    CategoryPageModule,
    MainModule,
    NotFoundModule,
    OrderPageModule,
    PotentialOrderPageModule,
    ProductPageModule,
    SearchModule
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
