import { Component, OnInit} from '@angular/core';
import { UserCreate } from '../../models/userCreate';
//import { UserCreateService } from './user-create.service';
import {RestService} from "../../services/rest.service";
import {FormBuilder, FormControl, FormGroup, ValidatorFn, Validators, AbstractControl} from '@angular/forms';
import {AlertService} from "../../services/alert.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-create',
  templateUrl: 'user-create.component.html',
  styleUrls: ['user-create.component.css'],
  providers: [RestService]
})
export class UserCreateComponent implements OnInit {
  active = true;
  loading = false;
  errorMessage: string;
  createUserForm: FormGroup;
  model: UserCreate = new UserCreate('', '', '', '','');

  constructor ( private router: Router, private fb: FormBuilder, private restService: RestService, private alertService: AlertService) {}

  ngOnInit(): void {  //Validations bring out from Template
   this.buildForm();
  }

  buildForm(): void {
    this.createUserForm = this.fb.group({
      'email': [this.model.email, [Validators.required,Validators.maxLength(254) ,Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      'firstname': [this.model.firstname, [Validators.required, Validators.minLength(2), Validators.maxLength(45), ]],
      'lastname': [this.model.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      'password': [this.model.password, [Validators.required, Validators.minLength(3), Validators.maxLength(254)]],
      'passwordConfirm': [this.model.passwordConfirm, [Validators.required, Validators.minLength(3), Validators.maxLength(254)]]
    });

    this.createUserForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

//todo: Add error parsing from server
  onSubmit(){ //Custom, on submit send data to server
    let password = this.createUserForm.value.password;
    let email = this.createUserForm.value.email;
    let firstName = this.createUserForm.value.firstname;
    let lastName = this.createUserForm.value.lastname;
    let passwordConfirm = this.createUserForm.value.passwordConfirm;

    if (passwordConfirm === password){
      this.loading = true;

      this.model = new UserCreate(password, email, firstName, lastName);
      this.restService.postJson('./api/registration', this.model)
        .subscribe(
          UserCreate => {
            UserCreate => this.model = new UserCreate(password, email, firstName, lastName);
            this.alertService.success('Registration successful', true);
            this.router.navigate(['/login']);
          },
          error => {
            this.alertService.error(error);
            this.errorMessage = <any>error;
            this.loading = false;
          }
        );
    } else {
      this.alertService.error("passwords must by equal");
      this.errorMessage = <any>"passwords must by equal";
      this.loading = false;
    }

  }

  onValueChanged(data?: any) {
    if (!this.createUserForm) { return; }
    const form = this.createUserForm;

    for (const field in this.formErrors) {
      // clear previous error message (if any)
      this.formErrors[field] = '';
      const control = form.get(field);

      if (control && control.dirty && !control.valid) {
        const messages = this.validationMessages[field];
        for (const key in control.errors) {
          if (messages[key] != '')
            this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }


  validationMessages = {
    'name': {
      'required':      'Name is required.',
      'maxlength':     'Name cannot be more than 45 characters long.',
      'minlength':     ''
    },//'minlength':     'Name must be at least 2 characters long.',
    'email': {
      'required': 'email is required.',
      'maxlength':     'email cannot be more than 254 characters long.',
      'pattern':     'invalid email'
    },
    'password': {
      'minlength':     '',
      'maxlength':     'too long password',
      'required': 'password is required.'
    }
  };

  formErrors = {
    'name': '',
    'email': '',
    'password': ''
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
      return {cannotContainSpace:null };
     return null;
  }
  //works this.forbiddenNameValidator(/bob/i),
  forbiddenNameValidator(nameRe: RegExp): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      const name = control.value;
      const no = nameRe.test(name);
      return no ? {'forbiddenName': {name}} : null;
    };
  }


}
