import { Component, OnInit} from '@angular/core';
import { UserCreate } from '../../models/userCreate';
//import { UserCreateService } from './user-create.service';
import {RestService} from "../../services/rest.service";
import {FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [RestService]
})
export class UserCreateComponent  {
  errorMessage: string;
  createUserForm: FormGroup;
  myuser: UserCreate;
  //private str: string;

  constructor ( public fb: FormBuilder, private restService: RestService) {}

  ngOnInit() {  //Validations bring out from Template
    this.createUserForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      email: ["", Validators.required],
      password: ["", Validators.required]
      });
  }

  onSubmit(){ //Custom, on submit send data to server
    var firstName = this.createUserForm.value.firstName;
    var lastName = this.createUserForm.value.lastName;
    var email = this.createUserForm.value.email;
    var password = this.createUserForm.value.password;
     this.myuser = new UserCreate(firstName,lastName,email,password);
   // this.str = this.user.getemail;
   // console.log('------------------' + this.user.greet());
    console.log(this.createUserForm.value);   //DELETE after debug
    this.restService.postJson('/api/user/create', this.myuser)
      .subscribe(
        UserCreate=> {
        UserCreate => this.myuser = new UserCreate(email,firstName,lastName,password);
      },
      error => this.errorMessage = <any>error
    );
   // if (password1 === password2) {
  }

}

/*
{
"email": "sd335223ewrg4",
  "firstname": "as2323dg34t",
  "lastname": "asd23g34g",
  "password": "as23dgf34g"
}*/
