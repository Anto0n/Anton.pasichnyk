import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy} from '@angular/core';
import {RestService} from "../../services/rest.service";
import {IModel, CreateModel} from "../../models/model";
import {IUser} from "../../models/test.model";
import {UserRoleService} from "../../services/user/user-role.service";
import {Response} from "@angular/http";
import {AuthenticationService} from "../../services/authentication.service";
import {Subscription} from "rxjs";
import {CardOrderService} from "../../services/order/card-order.service";
import {OrderResp} from "../../models/order";
//  changeDetection: ChangeDetectionStrategy.OnPush

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html'
})
export class OrdersComponent implements OnInit, OnDestroy {
  private uId: string
  private createModelobj: CreateModel;
  private uModels: IModel[] = [];
  private selectedModel:IModel;
 // private subscription: Subscription;
  private subsOrderResp: Subscription;
  private oId: number;


  constructor(private restService: RestService, private roleService: UserRoleService, private cd: ChangeDetectorRef,
              private authService : AuthenticationService, private cardOrderService : CardOrderService) {
    // if(this.authService.isAuthenticated()){
    //   this.getModelsByUserId();
    // }
    this.authService.subjectLogin.subscribe((auth: boolean ) => {
      if(auth){
        this.getModelsByUserId();  //refresh models on login
      }else{
        // void
      }

      this.subsOrderResp = this.cardOrderService.getMessage().subscribe(orderResp => {
        let r : OrderResp = orderResp;
        this.oId = r.idOrder;
        console.log(r);
      });


    });

  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.getModelsByUserId();
    }
    this.cd.markForCheck();



  }

  getModelsByUserId() {
    this.uId = this.roleService.getUserId();

    this.restService.getData(`./api/models/${this.uId}/list`)
      .subscribe((data: IModel[]) => {
        this.uModels = data;
      }, () => console.log('err'));
  }

  deleteModel(model: IModel) { //done
    this.restService.deleteData('./api/models/delete' + `/${model.id}`).subscribe(
      () => {
          this.uModels = this.uModels.filter(m => m !== model); //selectedModel - null

          /*if (this.selectedModel === model) {
            this.selectedModel = null;      }*/
        }
    )
  }

  createModel() {
    let iid = this.roleService.getUserId(); //todo: RE
    let createModelobjT: any = {
      "approved": "NEW",
      "bagTypeId": 1,
      "mname": "string",
      "userId": iid
    };
    this.restService.postJsonResp('./api/models/create', createModelobjT).subscribe(
      (data: IModel[]) => {
        this.uModels.push(createModelobjT);
        this.selectedModel = null;
        this.uModels = data;
        //this.getModelsByUserId();
      }, () => console.log('err'));

  }

  addModelToBucket(quantity: number, modelid:number){
    let iid = this.roleService.getUserId();
    let orid = this.getOrderId();
    console.log(orid + "--")
    let data = {
      "userId": iid,
      "orderId": orid,
      "items": [
        {
          "modelId": modelid,
          "count": quantity
        }
      ]
    }
    this.restService.putData("./api/order/additems", data).subscribe(
      () => {
        // this.cardOrderService.reloadBucket();
      }, () => console.log('err'));
  }

  getOrderId() : number{

    return this.oId;
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.authService.subjectLogin.unsubscribe();  error Object unsecribed
    //this.roleService.roleEmiter.unsubscribe(); //error ???
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
 );

 export class newsStatus{
 idnews: number;
 type: string;
 }


 */



