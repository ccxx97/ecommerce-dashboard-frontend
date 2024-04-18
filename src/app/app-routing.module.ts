import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductsComponent } from './dashboard/pages/products/products.component';
import { AddProductComponent } from './dashboard/pages/products/add-product/add-product.component';
import { EditProductComponent } from './dashboard/pages/products/edit-product/edit-product.component';
import { CustomersComponent } from './dashboard/pages/customers/customers.component';
import { OrdersComponent } from './dashboard/pages/orders/orders.component';
import { DiscountsComponent } from './dashboard/pages/discounts/discounts.component';
import { CustomerDetailComponent } from './dashboard/pages/customers/customer-detail/customer-detail.component';
import { AddDiscountComponent } from './dashboard/pages/discounts/add-discount/add-discount.component';
import { LanguagesComponent } from './dashboard/pages/languages/languages.component';
import { AddLanguageComponent } from './dashboard/pages/languages/add-language/add-language.component';
import { SiteSettingsComponent } from './dashboard/pages/management-pages/site-settings/site-settings.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { ApiAndIntegrationComponent } from './dashboard/pages/api-and-integration/api-and-integration.component';
import { AddPaymentIntegrationComponent } from './dashboard/pages/api-and-integration/add-payment-integration/add-payment-integration.component';
import { LanguageAndRegionComponent } from './dashboard/pages/language-and-region/language-and-region.component';
import { AddRegionComponent } from './dashboard/pages/language-and-region/add-country/add-country.component';
import { OrderDetailComponent } from './dashboard/pages/orders/order-detail/order-detail.component';
import { TimezoneComponent } from './dashboard/pages/timezone/timezone.component';
import { AddTimezoneComponent } from './dashboard/pages/timezone/add-timezone/add-timezone.component';
import { CurrencyComponent } from './dashboard/pages/currency/currency.component';
import { AddCurrencyComponent } from './dashboard/pages/currency/add-currency/add-currency.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { AddUserComponent } from './dashboard/pages/users/add-user/add-user.component';

const routes: Routes = [
  {
    path: '',
    data: { breadcrumb: 'dashboard' },
    component: DashboardComponent,
    children: [
      {
        path: 'Products',
        data: { breadcrumb: 'products' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: ProductsComponent, pathMatch: 'full' },
          { path: 'Add', component: AddProductComponent, data: { breadcrumb: 'addProduct' } },
          { path: 'Edit/:id', component: EditProductComponent, data: { breadcrumb: 'editProduct' } },
        ],
      },
      {
        path: 'Customers',
        data: { breadcrumb: 'customers' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: CustomersComponent, pathMatch: 'full' },
          { path: 'Detail/:id', data: { breadcrumb: 'details'}, component: CustomerDetailComponent } 
        ],
      },
      {
        path: 'Orders',
        data: { breadcrumb: 'orders' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: OrdersComponent, pathMatch: 'full' },
          { path: 'Detail/:id', data: { breadcrumb: 'orderDetail' }, component: OrderDetailComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'Languages',
        data: { breadcrumb: 'languages' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: LanguagesComponent, pathMatch: 'full' },
          { path: 'Add', data: { breadcrumb: 'addLanguage' }, component: AddLanguageComponent, pathMatch: 'full' },
          { path: 'Edit/:code', data: { breadcrumb: 'editLanguage' }, component: AddLanguageComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'Discounts',
        data: { breadcrumb: 'discounts' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: DiscountsComponent, pathMatch: 'full' },
          { path: 'Add', data: { breadcrumb: 'addDiscount' }, component: AddDiscountComponent, pathMatch: 'full' },
          { path: 'Edit/:id', data: { breadcrumb: 'editDiscount' }, component: AddDiscountComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'Settings',
        data: { breadcrumb: 'settings' },
        children: [
          { path: 'Site', data: { breadcrumb: '' }, component: SiteSettingsComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'ApiIntegrations',
        data: { breadcrumb: 'Api and Integration' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: ApiAndIntegrationComponent, pathMatch: 'full' },
          { path: 'Add', data: { breadcrumb: 'Add Payment Integration' }, component: AddPaymentIntegrationComponent, pathMatch: 'full' },
        ],
      },
      {
        path: 'Countries',
        data: { breadcrumb: 'countries' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: LanguageAndRegionComponent, pathMatch: 'full' },
          { path: 'Add', data: { breadcrumb: 'addCountry' }, component: AddRegionComponent, pathMatch: 'full' },
          { path: 'Edit/:id', data: { breadcrumb: 'editCountry' }, component: AddRegionComponent, pathMatch: 'full' },

        ],
      },
      {
        path: 'Timezone',
        data: { breadcrumb: 'timezone' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: TimezoneComponent, pathMatch: 'full' },
          { path: 'Add', data: { breadcrumb: 'addTimezone' }, component: AddTimezoneComponent, pathMatch: 'full' },
          { path: 'Edit/:id', data: { breadcrumb: 'editTimezone' }, component: AddTimezoneComponent, pathMatch: 'full' },

        ],
      },
      {
        path: 'Currency',
        data: { breadcrumb: 'currency' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: CurrencyComponent, pathMatch: 'full' },
          { path: 'Add', data: { breadcrumb: 'addCurrency' }, component: AddCurrencyComponent, pathMatch: 'full' },
          { path: 'Edit/:id', data: { breadcrumb: 'editCurrency' }, component: AddCurrencyComponent, pathMatch: 'full' },

        ],
      },
      {
        path: 'Users',
        data: { breadcrumb: 'users' },
        children: [
          { path: '', data: { breadcrumb: '' }, component: UsersComponent, pathMatch: 'full' },
          { path: 'Add', data: { breadcrumb: 'addUser' }, component: AddUserComponent, pathMatch: 'full' },
          { path: 'Edit/:id', data: { breadcrumb: 'editUser' }, component: AddUserComponent, pathMatch: 'full' },

        ],
      },
      {path:'Profile',data:{breadcrumb:'myProfile'},component:ProfileComponent},
      
      { path: '', redirectTo: 'Dashboard', pathMatch: 'full' },
    ],
  },
  {
    path:'Dashboard/login',
    component:LoginComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
