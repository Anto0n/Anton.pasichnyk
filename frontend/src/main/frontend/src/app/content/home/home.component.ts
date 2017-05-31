import {Component, OnDestroy, OnInit} from '@angular/core';
import {News} from "../../models/news";
import {RestService} from "app/services";
import {UserRoleService} from "../../services/user/user-role.service";
import {Subscription} from "rxjs";
import {AuthenticationService} from "../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private news : News[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService, private authService : AuthenticationService, private router: Router) {

  }


  ngOnInit(): void {
    this.getNews();
  }

  getNews(){
    this.restService.getData('./api/news/list/active')
      .subscribe((data: News[]) => {
        this.news=data;
      }, ()=>console.log('err')); //todo: add Alert service
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
