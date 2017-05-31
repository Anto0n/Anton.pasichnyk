import { Component, OnInit } from '@angular/core';
import {IModel, ModelStatus} from "../../models/model";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {OrderResp, OrderStatusNameEnum} from "../../models/order";

@Component({
  selector: 'app-manager',
  templateUrl: './factory.component.html',
  styles: []
})
export class FactoryComponent implements OnInit {
  private uModels: IModel[] = [];
  private selectedModel:IModel;
  private approved : string;

  private  showEditOrder : boolean = true;
  private myOrders : OrderResp[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService,) { }

  ngOnInit() {
    this.getModelsByApproved(ModelStatus.APPROVED);
  }


  getModelsByApproved(mStatus : ModelStatus) {
    this.approved = ModelStatus[mStatus];     // !!! Trick with enum
    this.restService.getData(`./api/models/list/${this.approved}`)
      .subscribe((data: IModel[]) => {
        this.uModels = data;
      }, () => console.log('err'));
  }

  /*EDIT/refactor  this code>>*/
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

  getOrders(){
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

  approveOrder(ord : OrderResp, oStatus : OrderStatusNameEnum ){

  }

}
