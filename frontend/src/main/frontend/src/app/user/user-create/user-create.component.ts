import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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
