import {Component, OnInit} from '@angular/core';
import {News} from "../../models/news";
import {RestService} from "app/services";
import {UserRoleService} from "../../services/user/user-role.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  private roleAdmin:boolean = false;


  private news : News[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService, private appComponent : AppComponent) {
    if(this.roleService.isAdmin()){
      this.roleAdmin = true;
    }
  }

  //emiter on logout roleAdmin = false;
 // this.appComponent.
 // appComponent.logoutEmiter.subscribe((isloged : boolean) => {

//});

/*
  this.roleService.roleEmiter.subscribe((role: string ) => {  // init menu from emiter
  this.initMenu(role);
}
);
*/

  ngOnInit(): void {
    this.getNews();
  }

  getNews(){
    this.restService.getData('./api/news/list')
      .subscribe((data: News[]) => {
        this.news=data;
        console.log(data);
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
