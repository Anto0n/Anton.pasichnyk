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
import {AlertService} from "../../services/alert.service";
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
  private currentOrder : OrderResp = new OrderResp();

  constructor(private restService: RestService, private roleService: UserRoleService, private cd: ChangeDetectorRef,
              private authService : AuthenticationService, private cardOrderService : CardOrderService, private alertService : AlertService) {
    this.cardOrderService.sendEmitReloadBucket();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      this.getModelsByUserId();
    }
    this.cd.markForCheck();

    this.authService.isAuthenticatedSubject.subscribe((auth: boolean ) => {
      if(auth){
        console.log("send reload bucket on login");
        this.getModelsByUserId();  //refresh models on login
        // this.cardOrderService.sendEmitReloadBucket();  //reload bucket on login
      }else{
        //this.cardOrderService.clearMessage(); // clear local bucket (front only)
      }
    });

    this.subsOrderResp = this.cardOrderService.getMessage().subscribe(orderResp => {
      console.log("order comp get Resp 111");
      console.log(orderResp);
      this.currentOrder = orderResp;
      console.log(this.currentOrder.idOrder + "--")
    });
  }

  private getModelsByUserId() {
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
      "materialId": 1,
      "mname": "new model name",
      "userId": iid
    };
    this.restService.postJsonResp('./api/models/create', createModelobjT).subscribe(
      (data: IModel[]) => {
        //this.uModels.push(createModelobjT);
        this.selectedModel = null;
        this.uModels = data;
        //this.getModelsByUserId();
      }, () => console.log('err'));
  }

  addModelToBucket(quantity: number, modelid:number){
    if(quantity > 0){
    let iid = this.roleService.getUserId();
    //console.log(this.currentOrder.idOrder + "--")
    let oid : number = this.currentOrder.idOrder;
    let data = {
      "userId": iid,
      "orderId": oid,
      "items": [
        {
          "modelId": modelid,
          "count": quantity
        }
      ]
    }
    this.restService.putData("./api/order/additems", data).subscribe(
      () => {
         this.cardOrderService.sendEmitReloadBucket();  //reload bucket
         this.alertService.success(quantity + " items added to bucket", false)
      }, () => console.log('err'));
        this.alertService.error("error");
    } else{
      this.alertService.error("set items quantity");
    }
  }

   ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
     //this.subsOrderResp.unsubscribe();
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



