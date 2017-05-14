import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from "../../models/news";
import {RestService} from "app/services";
import {UserRoleService} from "../../services/user/user-role.service";
import {AppComponent} from "../../app.component";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {
  subscriptionAdmin: Subscription;


  private roleAdmin:boolean = false;


  private news : News[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService, private authService : AuthenticationService, private router: Router) {
    this.subscriptionAdmin = this.authService.getAdminStatus().subscribe(
      roleAdmin => {this.roleAdmin = roleAdmin});

    if(this.roleService.isAdmin()){
      this.roleAdmin = true;
    }
  }


  ngOnInit(): void {
    this.getNews();
  }


  editNewsRedir(){
    this.router.navigate(['./editnews']);
  }
  getNews(){
    this.restService.getData('./api/news/list')
      .subscribe((data: News[]) => {
        this.news=data;
        console.log(data);
      }, ()=>console.log('err')); //todo: add Alert service
  }

  ngOnDestroy(): void {
    this.subscriptionAdmin.unsubscribe();
  }

}

// http://stackoverflow.com/questions/36076700/what-is-the-proper-use-of-an-eventemitter
// Mission Service
// https://angular.io/docs/ts/latest/cookbook/component-communication.html

/*
export interface News{
  "idnews": number;
  "body": string;
  "header": string;
  "newsCreate": number;
  "newsUpdate": number;
  "pagesType": PagesType;

}*/
