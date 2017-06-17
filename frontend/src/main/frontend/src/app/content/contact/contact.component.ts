import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {SendMailFromUser} from "./sendMailFromUser.model";
import {RestService} from "../../services/rest.service";
import {AlertService} from "app/services";
import {Router} from "@angular/router";

@Component({
  selector: 'app-contsct',
  templateUrl: './contact.component.html',
  styles: [
      `input.ng-invalid {
      border: 1px solid red;
    }

    .ng-valid[required], .ng-valid.required {
      border-left: 5px solid #42A948; /* green */
    }

    .ng-invalid:not(form) {
      border-left: 5px solid #a94442; /* red */
    }`]
})
export class ContactComponent implements OnInit {
  active = true;
  loading = false;
  createContactForm: FormGroup;
  model: SendMailFromUser = new SendMailFromUser();


  ngOnInit(): void {  //Validations bring out from Template
    this.buildForm();
  }

  buildForm(): void {
    this.createContactForm = this.fb.group({
      'email': [this.model.email, [Validators.required, Validators.maxLength(254), Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")]],
      'name': [this.model.name, [Validators.required, Validators.minLength(2), Validators.maxLength(45),]],
      'lastname': [this.model.lastname, [Validators.required, Validators.minLength(2), Validators.maxLength(45)]],
      'message': [this.model.message, [Validators.required, Validators.minLength(3), Validators.maxLength(45)]],
      'phone': [this.model.phone, [Validators.minLength(3), Validators.maxLength(99)]]
    });
    this.createContactForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages no
  }

  constructor(private router: Router, private fb: FormBuilder, private restService: RestService, private alertService: AlertService) {
  }

  onSubmit() { // on submit send data to server
    this.model.name = this.createContactForm.value.name;
    this.model.lastname = this.createContactForm.value.lastname;
    this.model.email = this.createContactForm.value.email;
    this.model.message = this.createContactForm.value.message;
    this.model.phone = this.createContactForm.value.phone;

    if (this.createContactForm.valid) {
      this.loading = true;
      this.restService.postJson('./api/user/sendMailFromUser', this.model).subscribe(
        ()=> {
          this.alertService.success('message send  successful!', true);
          this.loading = false;
          this.createContactForm.reset();
        },
        error => {
          this.alertService.error("some error occured");
          console.log(error);
          this.loading = false;
        }
      )


      console.log(this.model);
    } else {
      this.alertService.error("check data in form")
      console.log("Form not valid");
    }
  }

  private  onValueChanged(data?: any) {
    if (!this.createContactForm) {
      return;
    }
    const form = this.createContactForm;

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
      'required': 'First name is required.',
      'maxlength': 'cannot be more than 45 char long.',
      'minlength': 'Minimum 2 symbols'
    },//'minlength':     'Name must be at least 2 characters long.',
    'email': {
      'required': 'email is required.',
      'maxlength': 'cannot be more than 254 char long.',
      'pattern': 'invalid email'
    },
    'message': {
      'required': 'message is required.',
      'minlength': 'Minimum 2 symbols'
    },
    'lastname': {
      'required': 'Las tname is required.',
      'maxlength': 'cannot be more than 45 char long.',
      'minlength': 'Minimum 2 symbols'
    },
    'phone': {
      'maxlength': 'cannot be more than 99 char long.',
      'minlength': 'Minimum 3 symbols'
    }
  };

  formErrors = {
    'name': '',
    'lastname': '',
    'email': '',
    'message': '',
    'phone': ''
  };

}
