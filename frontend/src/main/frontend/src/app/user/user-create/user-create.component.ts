import { Component, OnInit } from '@angular/core';
import { User } from '../user';
//import { UserCreateService } from 'user-create.service';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
 // providers: [UserCreateService]
})
export class UserCreateComponent  {

  users: User[] = [];
 // constructor (private userService: UserCreateService) {}
  userCreate (firstName, lastName, login, email, password1, password2) {
    if (password1 === password2) {
     // new User  = new User(firstName, lastName, login, email, password1);
    }
  }
}



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
