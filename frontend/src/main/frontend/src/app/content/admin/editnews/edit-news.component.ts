import {Component, OnInit} from '@angular/core';
import {News, NewsCreate} from "../../../models/news";
import {RestService} from "../../../services/rest.service";
import {UserRoleService} from "../../../services/user/user-role.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  private createNewsForm: FormGroup;
  private createNew: boolean = false;
  private listNews: boolean = false;
  private model: NewsCreate = new NewsCreate('', '');
  private newsList: News[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService, private fb: FormBuilder) {

  }

  ngOnInit() {
    this.buildForm();
  }

  buildForm(): void {
    this.createNewsForm = this.fb.group({
      'header': [this.model.header, [Validators.maxLength(5592415), , Validators.pattern("(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?")]],
      'body': [this.model.body, [Validators.required, Validators.minLength(3), Validators.maxLength(5592415)]]
    });

    this.createNewsForm.valueChanges
      .subscribe(data => this.onValueChanged(data));

    this.onValueChanged(); // (re)set validation messages now
  }

  onValueChanged(data?: any) {
    if (!this.createNewsForm) {
      return;
    }
    const form = this.createNewsForm;

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

  formErrors = {
    'header': '',
    'body': ''
  };

  validationMessages = {
    'header': {
      'required': 'srting is required.',
      'maxlength': 'Name cannot be more than 5592415 characters long.',
      'minLength': 'min length 3',
      'pattern': 'invalid img src (png gif or jpg)'
    },//'minlength':     'Name must be at least 2 characters long.',
    'body': {
      'required': 'text body',
      'minLength': 'min length 3',
      'maxlength': 'text cannot be more than 5592415 characters long.',

    }
  };


  onSubmitNews() {
    let header = this.createNewsForm.value.header;
    let body = this.createNewsForm.value.body;
    console.log("onSubmitNews" + header + body);
    this.model = new NewsCreate(header, body);
    this.restService.postJson('./api/news/create', this.model).subscribe(

    )
    this.createNew = false;
  }


  getAllNews() {
    this.restService.getData('./api/news/list').subscribe(
      (data: News[]) => {
        this.newsList = data;
        this.listNews = true;
      }
    )
  }

  createNews() {
  }

  updateNews() {
  }

  deleteNews() {
  }

}
