import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
//import {} from "@angular/router"; //RouteConfig, ROUTER_DIRECTIVES, ROUTER_PROVIDERS

import { AppComponent } from './app.component';
import { MainComponent } from './main/main.component';
import { HomePageComponent } from './home-page/home-page.component';
import { ManagerOrdersComponent } from './manager/manager-orders/manager-orders.component';


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomePageComponent,
    ManagerOrdersComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
