import { Component, OnInit } from '@angular/core';
import {IUser} from "../../models/test.model";
import {RestService} from "../../services/rest.service";

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html'
})
export class TestformComponent {

  private users: IUser[] = [];

  constructor(private restService: RestService) { }


  getUser(){
    this.restService.getData('./api/user/list')
      .subscribe((data: IUser[]) => {
        this.users=data;
        console.log(data);
      }, ()=>console.log('err'));
  }
}
