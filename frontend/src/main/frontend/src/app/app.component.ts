import { Component } from '@angular/core';
//import {RouteConfig } from "@angular/router"; //
import {HomePageComponent} from "./home-page/home-page.component"
//import {DashboardMainCategoryComponent} from "./dashboard/catalog/main-category/main-category.root.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

/*@RouteConfig([
  {
    path: '/',
    name: 'HomePage',
    component: HomePageComponent,
    useAsDefault: true
  }*/

/*  {
    path: '/main-category',
    name: 'DashboardMainCategory',
    component: DashboardMainCategoryComponent
  }*/

//])

export class AppComponent {
  title = 'app works!!!';


}


