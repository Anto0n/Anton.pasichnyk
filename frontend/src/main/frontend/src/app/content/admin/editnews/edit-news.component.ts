import {Component, OnInit, ChangeDetectorRef} from '@angular/core';
import {News, NewsCreate, newsStatus} from "../../../models/news";
import {RestService} from "../../../services/rest.service";
import {UserRoleService} from "../../../services/user/user-role.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-edit-news',
  templateUrl: './edit-news.component.html',
  styleUrls: ['./edit-news.component.css']
})
export class CreateNewsComponent implements OnInit {
  private createNewsForm: FormGroup;
  private createNew: boolean = false;
  private listNews: boolean = false;
  private returnUrl: string;
  private model: NewsCreate = new NewsCreate('', '');
  private newsList: News[] = [];
  private selectedModel: News;

  constructor(private restService: RestService, private roleService: UserRoleService, private fb: FormBuilder, private route: ActivatedRoute,
              private router: Router,  private alertService: AlertService, private cd: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.getAllNews();
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.buildForm();
    this.cd.markForCheck(); // delete???
  }

  buildForm(): void {
    //let expression  =/(@^(https?|ftp)://[^\s/$.?#].[^\s]*$@iS)/g;
    var regex = new RegExp("(@^(https?|ftp)://[^\s/$.?#].[^\s]*$@iS)");
    this.createNewsForm = this.fb.group({
      'header': [this.model.header, [Validators.maxLength(5000), Validators.pattern("(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png|.{0,}))(?:\\?([^#]*))?(?:#(.*))?")]],
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
      'maxlength': 'Name cannot be more than 5000 characters long.',
      'minLength': 'min length 3',
      'pattern': 'invalid pattern'
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
      data => {
        this.router.navigate([this.returnUrl]); // go back
      },
      error => {
        this.alertService.error(error);
      }
    )
    this.createNew = false;
  }


  getAllNews() {
    this.restService.getData('./api/news/list/all').subscribe(
      (data: News[]) => {
        this.newsList = data;
        this.listNews = true;
      }
    )
  }


 /* updateNews() {
  }*/

  setNewsStatus(model : News, newStatus: string){
    let id:number = model.idnews;
    let statusDto: newsStatus = new newsStatus(id, newStatus);

    this.restService.putData('./api/news/update/status', statusDto).subscribe(
      () => {
        console.log("-----------1111111111");
        this.newsList = this.newsList.filter(m => m !== model);
        //console.log(model);
        console.log(this.selectedModel === model);
        if (this.selectedModel === model) {
          //this.selectedModel = model;
          console.log(this.selectedModel.pagesType.type);
          console.log("-----------");
        }

      },
      error => {
        this.alertService.error(error);
      }
    );


  }

deleteNews(model: News) { //done
    this.restService.deleteData('./api/news/delete' + `/${model.idnews}`).subscribe(
      () => {
        this.newsList = this.newsList.filter(m => m !== model);
        if (this.selectedModel === model) {
          this.selectedModel = null;
        }
      }
    )
  }
}
/*

{
  "idnews": 0,
  "type": "ACTIVE"
}*/
// Validators.pattern("(?:([^:/?#]+):)?(?://([^/?#]*))?([^?#]*\\.(?:jpg|gif|png))(?:\\?([^#]*))?(?:#(.*))?")
