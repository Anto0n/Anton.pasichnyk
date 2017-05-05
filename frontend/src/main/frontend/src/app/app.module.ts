import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {Routes, RouterModule, Router, PreloadAllModules} from '@angular/router';


import {AppComponent } from './app.component';
import {RestService} from "./services/rest.service";
import {TestComponent} from "./content/test/test.component";
import {ConfiguratorComponent} from "./configurator/configurator.component";

import { ReactiveFormsModule } from '@angular/forms';  // <-- #1 import module

import { AppRoutingModule }        from './routing/app-routing.module';
import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { NewComponent } from './content/new/new.component';
import { OrdersComponent } from './content/orders/orders.component';
import { AboutComponent } from './content/about/about.component';
import { HelpComponent } from './content/help/help.component';
import {SafePipe} from "./shared/safe.pipe.spec.";
import { UserCreateComponent } from './shared/register/user-create.component';
import {PageNotFoundComponent} from "./routing/not-found.component";
import {UserCRUDService} from "./services/user-crud.service";
import {TestformComponent} from "./content/testform/testform.component";
import {AlertService} from "./services/alert.service";
import {AlertComponent} from "./shared/alert/alert.component";
import {AuthenticationService} from "./services/authentication.service";
import {UserService} from "./services/user.service";
import {LoginComponent} from "./shared/login/login.component";
import {RegisterComponent} from "./shared/register/register.component";
import {BfwComponent} from "./conf2/bfw.component";
import {AuthGuard} from "../guards/auth.guard";

/*const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'new', component: NewComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'about', component: AboutComponent},
  {path: 'help', component: HelpComponent},
  {path: 'test', component: TestComponent}
];*/


@NgModule({
  declarations: [
    AppComponent,
    TestformComponent,
    TestComponent,
    MenuComponent,
    ContentComponent,
    HomeComponent,
    NewComponent,
    OrdersComponent,
    AboutComponent,
    HelpComponent,
    ConfiguratorComponent,
    AlertComponent,
    LoginComponent,
    RegisterComponent,
    SafePipe,
    UserCreateComponent,
    PageNotFoundComponent,
    BfwComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [RestService,AlertService, AuthenticationService,UserCRUDService, UserService, SafePipe, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(router: Router) { // Diagnostic only: inspect router configuration
    console.log('Routes: ', JSON.stringify(router.config, undefined, 2));
  } }
