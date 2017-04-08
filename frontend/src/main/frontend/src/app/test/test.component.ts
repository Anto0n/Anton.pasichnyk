import {Component} from "@angular/core";
import {RestService} from "../shared/services/rest.service";
import {IUser} from "./test.model";
@Component({
  selector: 'test',
  template: `
      <div *ngFor="let user of users" >
        {{user.firstname}}, {{user.email}}
      </div>
    <button (click)="getUser()">GetData</button>
  `
})
export class TestComponent {

  private users: IUser[] = [];

  constructor(private restService: RestService) { }

  getUser(){
    this.restService.getData('/users')
      .subscribe((data: IUser[]) => {
        this.users=data;
        console.log(data);
      }, ()=>console.log('err'));
  }


}

