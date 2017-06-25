import {Component, OnInit, ViewChild} from '@angular/core';
import {IModel, ModelStatus} from "../../models/model";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {OrderResp, OrderStatusNameEnum} from "../../models/order";
import {Configurator3DComponent} from "../../configurator/3DConfigurator/configurator3d.component";
import {Config3d} from "../../models/modelConfig";

@Component({
  selector: 'app-manager',
  templateUrl: './factory.component.html',
  styles:[`
      .modoverflow {
        height:500px;
        overflow-y: scroll;
      }
`]
})
export class FactoryComponent implements OnInit {
  private uModels: IModel[] = [];
  private selectedModel:IModel;
  // private selectedConfig: Config3d;
  private approved : string;
  @ViewChild("config")
  private configurator: Configurator3DComponent;
  private showEditOrder : boolean = true;
  private myOrders : OrderResp[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService,) { }

  ngOnInit() {
    this.getModelsByApproved(ModelStatus.APPROVED);
    this.getOrdersByStatus(2); //accepted




  }

  selectModel(model: IModel) {   //old for 3d
    this.selectedModel=model;
    this.configurator.loadModel(model);
  }

  parseMaterials(config:string){
    let jStr: string = JSON.parse(JSON.stringify(config));
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
    this.selectedModel = null;
    this.getModelsByApproved(ModelStatus.APPROVED);
    this.showEditOrder = false;
    // refresh models ent
  }

  showOrders(){
    this.selectedModel = null; //clean view
    this.getOrdersByStatus(2); //Accepted
    this.showEditOrder = true;
    //refresh orders ent
  }

  showModelsInOrder(ord : OrderResp){
    //this.showWhat = ShowView.MODELS_IN_ORDER;
    this.showEditOrder = false; // show models view
    this.uModels = [];  //clean arr
    for (let it  of ord.items){
      this.uModels.push(it.model);
    }
  }

 /* getOrders(){ //All
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
  }*/

  getOrdersByStatus(status : OrderStatusNameEnum){
    let mstat : string = OrderStatusNameEnum[status];// Accepted
    this.restService.getData('./api/order/findallByStatus', `/${mstat}`)
      .subscribe(
        (data: OrderResp[]) => {
          this.myOrders = data},
        () => console.log('err')
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
        this.getOrdersByStatus(2); //reload arr Accepted     Rewrite to change detection
      }
    ),  () => console.log('err')

  }

}
