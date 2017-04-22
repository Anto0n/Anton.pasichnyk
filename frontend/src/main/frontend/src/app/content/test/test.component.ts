import {Component} from "@angular/core";
import {RestService} from "../../shared/services/rest.service";
import {IUser} from "./test.model";
@Component({
  selector: 'test',
  templateUrl: './test.components.html'
})
export class TestComponent {

  private users: IUser[] = [];

  constructor(private restService: RestService) { }

  getUser(){
    this.restService.getData('/api/user/list')
      .subscribe((data: IUser[]) => {
        this.users=data;
        console.log(data);
      }, ()=>console.log('err'));
  }

/*  createUser(){
    this.restService.postJson('/user/create')
      .subscribe()
  }*/

}

