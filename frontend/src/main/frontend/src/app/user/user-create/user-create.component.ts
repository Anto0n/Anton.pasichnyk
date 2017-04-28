import { Component, OnInit} from '@angular/core';
import { UserCreate } from '../userCreate';
import { UserCreateService } from './user-create.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [UserCreateService]
})
export class UserCreateComponent  {
  users: UserCreate[] ;

  constructor (private userService: UserCreateService) {}

  userCreate (firstName, lastName, login, email, password1, password2) {
    if (password1 === password2) {
     //newUser  = new UserCreate(firstName, lastName, login, email, password1);
      this.userService.addUser(firstName, lastName, login, email, password1);

    }
  }
}

//on form submit send data to server
//onSubmit() { }

/*
@Component({
  selector: 'uc-app',
  templateUrl: "user-create.html",
  styleUrls: ['style.css'],
  providers: [UserService]
})
export class UserCreateComponent {
  users: User[] = [];
  constructor (private userService: UserService) {}
  userCreate (firstName, lastName, login, email, password1, password2) {
    if (password1 === password2) {
      newUser = new User(firstName, lastName, login, email, password1);
    }
  }
}*/
