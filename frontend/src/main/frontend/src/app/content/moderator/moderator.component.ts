import {Component, OnInit, ChangeDetectorRef, NgZone, ViewChild} from '@angular/core';
import {IModel, ModelStatus} from "../../models/model";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {OrderResp, OrderStatusNameEnum} from "../../models/order";
import {AlertService} from "../../services/alert.service";
import {Configurator3DComponent} from "../../configurator/3DConfigurator/configurator3d.component";

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styles:[`
      .modoverflow {
        height:300px;
        overflow-y: scroll;
      }
      .ordverflow{
        height:550px;
        overflow-y: scroll;
      }
`]
})
export class ModeratorComponent implements OnInit {
  private uModels: IModel[] = [];
  private selectedModel:IModel;
  private selectedOrder:OrderResp;
  private approved : string;
  @ViewChild("config")
  private configurator: Configurator3DComponent;
  private  showEditOrder : boolean = true;
  private showModelsFilter : boolean = true;
  private myOrders : OrderResp[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService,
              private alertService : AlertService,
              private cd: ChangeDetectorRef, private zone: NgZone) {
  }



  ngOnInit() {
    this.getModelsByApproved(ModelStatus.NEW);
    this.getOrdersByApproved(1);
  }


  getModelsByApproved(mStatus : ModelStatus) {
    this.selectedOrder=null;
    this.approved = ModelStatus[mStatus];     // !!! Trick with enum
    this.restService.getData(`./api/models/list/${this.approved}`)
      .subscribe((data: IModel[]) => {
        this.uModels = data;
        console.log(data);
        this.selectedModel = null;
      }, () => console.log('err'));
  }

  showModelsInOrder(ord : OrderResp){
    //this.showWhat = ShowView.MODELS_IN_ORDER;
    this.showEditOrder = false; // show models view
    this.selectedOrder=ord;
    console.log(this.selectedOrder);
    this.uModels = [];  //clean arr
    for (let it  of ord.items){
      this.uModels.push(it.model);
    }
  }

  approveModel(model: IModel, mStatus : ModelStatus ){
    let id:number = model.id;
     let approved :string = ModelStatus[mStatus];
    this.restService.getData('./api/models/approve', `/${id}?approved=${approved}`)
      .subscribe(
        () => {
          // this.uModels = this.uModels.filter(m => m !== model);
          if (this.selectedOrder!=null){
          this.restService.getData('./api/models', `/${id}`)
            .subscribe((data:IModel)=>{
              this.selectedModel=data;
              this.uModels = this.uModels.filter(m => m !== model);
              // this.uModels.filter(m=>m.id===data.id)=this.selectedModel;
              this.uModels.push(this.selectedModel);
            });
          }else {
            this.uModels = this.uModels.filter(m => m !== model);
          }


          if (this.selectedModel.id === model.id) {
            this.selectedModel = null;
          }
        }
      );
  }

  // change order status
  approveOrder(ord : OrderResp, newStatus : OrderStatusNameEnum ){
    if (newStatus ==2 ){
      for (let it  of ord.items){
        if (it.model.approved.toString() !== ModelStatus[1]) { // status not APPROVED
          console.log(it.model.approved );
          console.log(ModelStatus.APPROVED);
          this.alertService.error("Confirm all models in order № " + ord.idOrder + " first!", false);
          return;
        }
      }
    }
    let mstat : string = OrderStatusNameEnum[newStatus];
    let model  = {
      "orderId": ord.idOrder,
      "orderStatusNameEnum": mstat
    };
     this.restService.putData("./api/order/changeStatus", model).subscribe(
       (data: OrderResp) => {
         let newOr : OrderResp = data;
         let foundIndex : number = this.myOrders.findIndex(x => x == newOr);  // find in array
         this.alertService.success("order " + ord.idOrder + " "+ mstat, false);
         this.myOrders[foundIndex] = newOr;                                    // replace in arr
         this.getOrdersByApproved(1); //reload arr NEW     Rewrite to change detection
       }
     ),  () => console.log('err')

  }

  showModels(){
    this.selectedOrder=null;
    this.getModelsByApproved(ModelStatus.NEW);
    this.showEditOrder = false;
    // refresh models ent
  }

  showOrders(){
    //this.getOrders(); // all
    this.getOrdersByApproved(1); //NEW
    this.showEditOrder = true;
    //refresh orders ent
  }

  getOrders(){  //all orders
    //"./api/order/listOrders"
    this.restService.getData('./api/order/listOrders').subscribe(
      (data: OrderResp[]) => {
        this.myOrders = data;
        this.myOrders =  this.myOrders.sort((a, b): number => {   //sor array by status
          if (a.status.code < b.status.code) return 1;
          if (a.status.code > b.status.code) return -1;
          return 0;
        })
      }, () => console.log('err')
    );
  }


  getOrdersByApproved(status : OrderStatusNameEnum){
    let mstat : string = OrderStatusNameEnum[status];
    this.restService.getData('./api/order/findallByStatus', `/${mstat}`)
      .subscribe(
        (data: OrderResp[]) => {
          this.myOrders = data},
        () => console.log('err')
      );
  }

  selectModel(model:IModel){
    console.log(model);
    this.selectedModel=model;
    this.configurator.loadModel(model);
  }
}

/*

export enum OrderStatusNameEnum {
  BUCKET, NEW, ACCEPTED, PROCESSING, DENIED, SEND
}*/
