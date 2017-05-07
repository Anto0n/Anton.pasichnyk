import {Component} from "@angular/core";
import {RestService} from "../../services/rest.service";
import {IUser} from "../../models/test.model";
@Component({
  selector: 'test',
  templateUrl: './test.components.html'
})
export class TestComponent {

  private users: IUser[] = [];

  constructor(private restService: RestService) { }



/*  createUser(){
    this.restService.postJson('/user/create')
      .subscribe()
  }*/

}

