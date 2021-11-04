import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxsModule } from '@ngxs/store';
import { BasketState } from './basket.state';

import { AppComponent } from './app.component';
import { ProductsListComponent } from './products-list/products-list.component';
import { ProductsSearchBarComponent } from './products-search-bar/products-search-bar.component';
import { BasketHeaderComponent } from './basket-header/basket-header.component';
import { BasketComponent } from './basket/basket.component';
import { LinksComponent } from './links/links.component';
import { RouterModule, Routes } from '@angular/router';
import { FormComponent } from './form/form.component';
import { RecapComponent } from './recap/recap.component';
import { PhonePipe } from './phone.pipe';
import { UserState } from './user.state';
import { AddressesComponent } from './addresses/addresses.component';

const appRoutes: Routes = [
  {
    path: '',
    component: FormComponent
  },
  {
    path: 'basket',
    component: BasketComponent
  },
  {
    path: 'list',
    component: ProductsSearchBarComponent
  },
  {
    path: 'form',
    component: FormComponent
  },
  {
    path: 'addresses',
    component: AddressesComponent
  }
];

@NgModule({
  declarations: [
    AppComponent,
    ProductsListComponent,
    ProductsSearchBarComponent,
    BasketHeaderComponent,
    BasketComponent,
    LinksComponent,
    FormComponent,
    RecapComponent,
    PhonePipe,
    AddressesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRoutes),
    NgxsModule.forRoot ([BasketState, UserState])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
