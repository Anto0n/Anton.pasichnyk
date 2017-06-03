import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Router} from '@angular/router';


import {AppComponent } from './app.component';
import {RestService} from "./services/rest.service";
import {TestComponent} from "./content/test/test.component";
import {ConfiguratorComponent} from "./configurator/configurator.component";

import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { AppRoutingModule }        from './routing/app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { HomeComponent } from './content/home/home.component';
import { ProductsComponent } from './content/products/products.component';
import { OrdersComponent } from './content/orders/orders.component';
import { FAQsComponent } from './content/FAQs/faqs.component';
import { ContactComponent } from './content/contact/contact.component';
import {SafePipe} from "./shared/safe.pipe.spec.";
import { UserCreateComponent } from './shared/register/user-create.component';
import {PageNotFoundComponent} from "./routing/not-found.component";
import {UserCRUDService} from "./services/user/user-crud.service";
import {TestformComponent} from "./content/testform/testform.component";
import {AlertService} from "./services/alert.service";
import {AlertComponent} from "./shared/alert/alert.component";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user/user.service";
import {LoginComponent} from "./shared/login/login.component";
import {AuthGuard} from "./shared/guards/auth.guard";
import {FactoryComponent} from "app/content/factory/factory.component";
import {ModeratorComponent} from "./content/moderator/moderator.component";
import {AdminComponent} from "./content/admin/admin/admin.component";
import {UserRoleService} from "./services/user/user-role.service";
import {ModelService} from "./services/model.service";
import { CreateNewsComponent } from './content/admin/editnews/edit-news.component';
import {AdminGuard} from "./shared/guards/admin.guard";
import {OrderService} from "./services/order/order.service"

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CardMenuComponent } from './content/orders/card-menu.component';
import {CardOrderService} from "./services/order/card-order.service";
import { CardViewComponent } from './content/orders/card-view.component';
import {ImageUploadModule} from "angular2-image-upload";
import {Configurator3DComponent} from "app/configurator/3DConfigurator/configurator3d.component";
import {Configurator2DComponent} from "./configurator/2DConfigurator/configurator2d.component";

@NgModule({
  declarations: [
    AppComponent,
    TestformComponent,
    TestComponent,
    MenuComponent,
    HomeComponent,
    ProductsComponent,
    OrdersComponent,
    FAQsComponent,
    ContactComponent,
    FactoryComponent,
    ModeratorComponent,
    AdminComponent,
    ConfiguratorComponent,
    AlertComponent,
    LoginComponent,
    SafePipe,
    UserCreateComponent,
    PageNotFoundComponent,
    CreateNewsComponent,
    CardMenuComponent,
    CardViewComponent,
    Configurator3DComponent,
    Configurator2DComponent

  ],
  imports: [
    NgbModule.forRoot(),
    ImageUploadModule.forRoot(),
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [RestService,AlertService, AuthenticationService,UserCRUDService,ModelService,
    UserService, UserRoleService, SafePipe, AuthGuard, AdminGuard, OrderService, CardOrderService ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router, private authService: AuthenticationService) { // Diagnostic only: inspect router configuration
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
    /* authService.init();
     console.log('Auth service init');*/
  } }
