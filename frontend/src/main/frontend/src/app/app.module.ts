import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Routes, RouterModule } from '@angular/router';

//import {} from "@angular/router"; //RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS

import {AppComponent } from './app.component';
import {RestService} from "./shared/services/rest.service";
import {TestComponent} from "./content/test/test.component";
import {ConfiguratorComponent} from "./configurator/configurator.component";


import { MenuComponent } from './menu/menu.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './content/home/home.component';
import { NewComponent } from './content/new/new.component';
import { OrdersComponent } from './content/orders/orders.component';
import { AboutComponent } from './content/about/about.component';
import { HelpComponent } from './content/help/help.component';
import {SafePipe} from "./shared/safe.pipe.spec.";
import { UserCreateComponent } from './user/user-create/user-create.component';

const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'new', component: NewComponent},
  {path: 'orders', component: OrdersComponent},
  {path: 'about', component: AboutComponent},
  {path: 'help', component: HelpComponent},
  {path: 'test', component: TestComponent}
];


@NgModule({
  declarations: [
    AppComponent,
    TestComponent,
    MenuComponent,
    ContentComponent,
    HomeComponent,
    NewComponent,
    OrdersComponent,
    AboutComponent,
    HelpComponent,
    ConfiguratorComponent,
    SafePipe,
    UserCreateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [RestService],
  bootstrap: [AppComponent]
})
export class AppModule { }
