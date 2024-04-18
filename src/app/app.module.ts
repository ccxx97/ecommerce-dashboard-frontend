import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { LeftSideMenuComponent } from './components/left-side-menu/left-side-menu.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { PaginatorModule } from 'primeng/paginator';
import { ProductsComponent } from './dashboard/pages/products/products.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { AddProductComponent } from './dashboard/pages/products/add-product/add-product.component';
import { EditProductComponent } from './dashboard/pages/products/edit-product/edit-product.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { FileUploadModule  } from 'primeng/fileupload';
import { InputSwitchModule  } from 'primeng/inputswitch';
import { ImageModule  } from 'primeng/image';
import { AvatarModule  } from 'primeng/avatar';
import { DialogModule  } from 'primeng/dialog';
import { ToastModule  } from 'primeng/toast';
import { CarouselModule } from 'primeng/carousel';
import { CustomersComponent } from './dashboard/pages/customers/customers.component';
import { OrdersComponent } from './dashboard/pages/orders/orders.component';
import { DiscountsComponent } from './dashboard/pages/discounts/discounts.component';
import { CustomerDetailComponent } from './dashboard/pages/customers/customer-detail/customer-detail.component';
import { AddDiscountComponent } from './dashboard/pages/discounts/add-discount/add-discount.component';
import { LanguagesComponent } from './dashboard/pages/languages/languages.component';
import { AddLanguageComponent } from './dashboard/pages/languages/add-language/add-language.component';
import { SiteSettingsComponent } from './dashboard/pages/management-pages/site-settings/site-settings.component';
import { SeoAnalyticsComponent } from './dashboard/pages/management-pages/seo-analytics/seo-analytics.component';
import { SliderComponent } from './dashboard/pages/management-pages/slider/slider.component';
import { GeneralSettingsComponent } from './dashboard/pages/management-pages/general-settings/general-settings.component';
import { LoginComponent } from './auth/login/login.component';
import { ProfileComponent } from './dashboard/pages/profile/profile.component';
import { ApiAndIntegrationComponent } from './dashboard/pages/api-and-integration/api-and-integration.component';
import { AddPaymentIntegrationComponent } from './dashboard/pages/api-and-integration/add-payment-integration/add-payment-integration.component';
import { LanguageAndRegionComponent } from './dashboard/pages/language-and-region/language-and-region.component';
import { AddRegionComponent } from './dashboard/pages/language-and-region/add-country/add-country.component';
import { OrderDetailComponent } from './dashboard/pages/orders/order-detail/order-detail.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { MessageService } from 'primeng/api';
import { TimezoneComponent } from './dashboard/pages/timezone/timezone.component';
import { AddTimezoneComponent } from './dashboard/pages/timezone/add-timezone/add-timezone.component';
import { CurrencyComponent } from './dashboard/pages/currency/currency.component';
import { AddCurrencyComponent } from './dashboard/pages/currency/add-currency/add-currency.component';
import { AddUserComponent } from './dashboard/pages/users/add-user/add-user.component';
import { UsersComponent } from './dashboard/pages/users/users.component';
import { NgJsonEditorModule } from 'ang-jsoneditor' 
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient);
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    ProductsComponent,
    AddProductComponent,
    CustomerDetailComponent,
    AddDiscountComponent,
    OrdersComponent,
    DiscountsComponent,
    GeneralSettingsComponent,
    SiteSettingsComponent,
    LanguagesComponent,
    AddLanguageComponent,
    CustomersComponent,
    EditProductComponent,
    LeftSideMenuComponent,
    ProfileComponent,
    SliderComponent,
    ApiAndIntegrationComponent,
    HeaderComponent,
    AddPaymentIntegrationComponent,
    SeoAnalyticsComponent,
    LanguageAndRegionComponent,
    OrderDetailComponent,
    AddRegionComponent,
    TimezoneComponent,
    AddTimezoneComponent,
    CurrencyComponent,
    AddCurrencyComponent,
    AddUserComponent,
    UsersComponent
  ],
  imports: [
    NgJsonEditorModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    CommonModule,
    AvatarModule,
    PaginatorModule,
    CarouselModule,
    ToastModule,
    InputSwitchModule,
    FileUploadModule,
    DialogModule,
    ButtonModule,
    TabViewModule,
    ImageModule,
    RatingModule,
    TagModule,
    CKEditorModule,
    TableModule,
    BreadcrumbModule,
    AppRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      },
      defaultLanguage: localStorage.getItem('locale') || 'en',
    })
  ],
  providers:[MessageService],
  bootstrap:[AppComponent]
})
export class AppModule { }
