import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class UserRoleService {
  public roleEmiter;

  constructor() {
    this.roleEmiter = new EventEmitter<{ role: string }>();
  }

  reloadMenuForUserRole(){
    if (localStorage.getItem('currentUser')) {
      console.log("1");
      let user = localStorage.getItem('currentUser');
      // let role1: any = user[0];
      console.log(user);
      this.roleEmiter.emit(user);
    } else {
      console.log("2");
      this.roleEmiter.emit("Guest");
    }
  }

}
