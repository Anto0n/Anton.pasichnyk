import {Component, OnInit, ChangeDetectorRef, NgZone} from '@angular/core';
import {IModel, ModelStatus} from "../../models/model";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {OrderResp, OrderStatusNameEnum} from "../../models/order";

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html'
})
export class ModeratorComponent implements OnInit {
  private uModels: IModel[] = [];
  private selectedModel:IModel;
  private approved : string;
  private  showEditOrder : boolean = true;
  private myOrders : OrderResp[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService, private cd: ChangeDetectorRef, private zone: NgZone) {
  }



  ngOnInit() {
    this.getModelsByApproved(ModelStatus.NEW);
    this.getOrdersByApproved(1);
  }


  getModelsByApproved(mStatus : ModelStatus) {
    this.approved = ModelStatus[mStatus];     // !!! Trick with enum
    this.restService.getData(`./api/models/list/${this.approved}`)
      .subscribe((data: IModel[]) => {
        this.uModels = data;
      }, () => console.log('err'));
  }

  approveModel(model: IModel, mStatus : ModelStatus ){
    let id:number = model.id;
     let approved :string = ModelStatus[mStatus];
    this.restService.getData('./api/models/approve', `/${id}?approved=${approved}`)
      .subscribe(
        () => {
          this.uModels = this.uModels.filter(m => m !== model);
          if (this.selectedModel === model) {
            this.selectedModel = null;
          }
        }
      );
  }

  showModels(){
    this.getModelsByApproved(ModelStatus.NEW);
    this.showEditOrder = false;
    // refresh models ent
  }

  showOrders(){
    this.getOrders();
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

 // change order status
  approveOrder(ord : OrderResp, newStatus : OrderStatusNameEnum ){
    let mstat : string = OrderStatusNameEnum[newStatus];
    let model  = {
      "orderId": ord.idOrder,
      "orderStatusNameEnum": mstat
    };
    this.restService.putData("./api/order/changeStatus", model).subscribe(
      (data: OrderResp) => {
        let newOr : OrderResp = data;
        let foundIndex : number = this.myOrders.findIndex(x => x == newOr);  // find in array

        this.myOrders[foundIndex] = newOr;                                    // replace in arr
        this.getOrdersByApproved(1); //reload arr NEW     Rewrite to change detection
      }
    ),  () => console.log('err')

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




}

/*

export enum OrderStatusNameEnum {
  BUCKET, NEW, ACCEPTED, PROCESSING, DENIED, SEND
}*/
