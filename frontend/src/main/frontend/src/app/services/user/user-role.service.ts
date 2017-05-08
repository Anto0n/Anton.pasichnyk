import {EventEmitter, Injectable} from '@angular/core';

@Injectable()
export class UserRoleService {
  public roleEmiter;

  constructor() {
    this.roleEmiter = new EventEmitter<{ role: string }>();
  }

  reloadMenuForUserRole(){
    if (localStorage.getItem('currentUserRole')) {
      let user = localStorage.getItem('currentUserRole');
      this.roleEmiter.emit(user);
    } else {
      this.roleEmiter.emit("Guest");
    }
  }

}
