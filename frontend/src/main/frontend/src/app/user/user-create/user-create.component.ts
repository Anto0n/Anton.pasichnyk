import { Component, OnInit} from '@angular/core';
import { UserCreate } from '../../models/userCreate';
//import { UserCreateService } from './user-create.service';
import {RestService} from "../../services/rest.service";
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl} from '@angular/forms';
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css'],
  providers: [RestService]
})
export class UserCreateComponent  {
  errorMessage: string;
  createUserForm: FormGroup;
  model: UserCreate;
  //private str: string;

  constructor ( private fb: FormBuilder, private restService: RestService, private alertService: AlertService) {}

  ngOnInit() {  //Validations bring out from Template
   this.buildForm();
  }

  buildForm(): void {
    this.createUserForm = this.fb.group({
      firstName: ["", [Validators.required, this.forbiddenNameValidator(/bob/i), Validators.minLength(2), Validators.maxLength(45), ]],
      lastName: ["", [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      email: ["", [Validators.required,Validators.maxLength(254) ,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      password: ["", [Validators.required, Validators.minLength(3), Validators.maxLength(254)]]
    });
  }

//todo: Add error parsing from server
  onSubmit(){ //Custom, on submit send data to server
    var password = this.createUserForm.value.password;
    var email = this.createUserForm.value.email;
    var firstName = this.createUserForm.value.firstName;
    var lastName = this.createUserForm.value.lastName;

     this.model = new UserCreate(password, email, firstName,lastName);
    //console.log(this.createUserForm);   //DELETE after debug
    this.restService.postJson('/api/user/create', this.model)
      .subscribe(
        UserCreate=> {
        UserCreate => this.model = new UserCreate(password, email, firstName,lastName );
          this.alertService.success('Registration successful', true);
      },
      error =>{ this.alertService.error(error);
                this.errorMessage = <any>error;}
    );
   // if (password1 === password2) {
   // pattern for email
  }


  validationMessages = {
    'firstName': {
      'required':      'Name is required.',
      'minlength':     'Name must be at least 2 characters long.',
      'maxlength':     'Name cannot be more than 45 characters long.'
    },
    'email': {
      'required': 'email is required.'
    }
  };

  formErrors = {
    'firstName': '',
    'email': ''
  };

  //not finished yet
  passwordCompareValidator(control: FormControl):{[s: string]: boolean}{
    if(control.value ==='111'){
      return{example: true};
    }
  return null;
  }
  //not works
   cannotContainSpace(control:FormControl){
    if(control.value.indexOf('')>=0)
      return {    cannotContainSpace:null };
     return null;
  }
  //works
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const name = control.value;
      const no = nameRe.test(name);
      return no ? {'forbiddenName': {name}} : null;
    };
  }


}

/*
{
  "email": "sd335223ewrg4",
  "firstname": "as2323dg34t",
  "lastname": "asd23g34g",
  "password": "as23dgf34g"
}*/
