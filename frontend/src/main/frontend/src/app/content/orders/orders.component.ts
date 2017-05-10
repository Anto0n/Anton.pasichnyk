import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {IModel, CreateModel} from "../../models/model";
import {IUser} from "../../models/test.model";
import {UserRoleService} from "../../services/user/user-role.service";
import {Response} from "@angular/http";
//  changeDetection: ChangeDetectionStrategy.OnPush

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit {
  private uId : string
  private createModelobj: CreateModel;
  private uModels: IModel[] = [];
  //CreateModel

  constructor(private restService: RestService, private roleService: UserRoleService, private cd: ChangeDetectorRef) {

  }

  ngOnInit(): void {
    this.getModelsByUserId();
    this.cd.markForCheck();

  }

  getModelsByUserId(){
    this.uId  = this.roleService.getUserId();
    this.restService.getData(`./api/models/${this.uId}/list`)
      .subscribe((data: IModel[]) => {
        this.uModels=data;
      }, ()=>console.log('err'));
  }

deleteModel(id:string){
    this.restService.deleteData('/api/models/delete'+`/${id}`).subscribe(
  )
  this.cd.markForCheck();
  let delModel = this.uModels.find(myObj => myObj.id < 0)  ;

  this.getModelsByUserId();

}
  createModel(){
    let createModelobjT : any = {
      "approved": "NEW",
      "bagTypeId": 1,
      "mname": "string",
      "userId": 3
    };
     this.restService.postJson('./api/models/create', createModelobjT).subscribe(

      )
    this.getModelsByUserId()
    this.cd.markForCheck();
  }

}

/*this.restService.postJson('./api/user/create', this.model)
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
  );*/


//Moderator
//private moderModels: IModel[] = [];
//private users: IUser[] = [];
/*  getModelsList(){
 this.restService.getData('./api/models/list')
 .subscribe((data: IModel[]) => {
 this.moderModels=data;
 console.log(data);
 }, ()=>console.log('err'));
 }*/
/*

 getUser(){
 this.restService.getData('./api/user/list')
 .subscribe((data: IUser[]) => {
 this.users=data;
 console.log(data);
 }, ()=>console.log('err')); //todo: add Alert service
 }

 Д
 approveModel(id:number, approved:string ){
 this.restService.getData('./api/models/approve', `/${id}?approved=${approved}`)
 .subscribe(data => console.log(data));
 console.log(''+id, ''+approved);
 }*/
