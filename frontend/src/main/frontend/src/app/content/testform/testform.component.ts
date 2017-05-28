import {Component, OnDestroy} from '@angular/core';
import {IUser} from "../../models/test.model";
import {RestService} from "../../services/rest.service";
import {IModel, ModelStatus} from "../../models/model";
import {OrderResp, OrderCreate, mItems} from "../../models/order";
import {CardOrderService} from "../../services/order/card-order.service";
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-testform',
  templateUrl: './testform.component.html'
})
export class TestformComponent  {

  private users: IUser[] = [];
  private uModels: IModel[] = [];
  private moderModels: IModel[] = [];
  private orderResp : OrderResp;

  constructor(private restService: RestService, private corServ:CardOrderService) {  }

  getUser(){
    this.restService.getData('./api/user/list')
      .subscribe((data: IUser[]) => {
        this.users=data;
        console.log(data);
      }, ()=>console.log('err')); //todo: add Alert service
  }

  getModelsByUserId(){
    this.restService.getData(`./api/models/${2}/list`)
      .subscribe((data: IModel[]) => {
        this.uModels=data;
        console.log(data);
      }, ()=>console.log('err'));
  }

  getModelsList(){
    this.restService.getData('./api/models/list')
      .subscribe((data: IModel[]) => {
        this.moderModels=data;
        console.log(data);
      }, ()=>console.log('err'));
  }

  approveModel(id:number, approved:string ){
    this.restService.getData('./api/models/approve', `/${id}?approved=${approved}`)
      .subscribe(data => console.log(data));
    console.log(''+id, ''+approved);
  }

  createOrder(){
    let orderCreate : OrderCreate = {
      "userId": 2,
      "items": [
        {
          "modelId": 1,
          "count": 15
        },
        {
          "modelId": 1,
          "count": 15
        }
      ]
    };
    this.restService.postJsonResp('./api/order/createOrder', orderCreate)
      .subscribe((data: OrderResp)  => {
        this.orderResp = data;
        console.log(this.orderResp)
      } ,
      ()=>console.log('err')
    )
  }

  sendTestDataToObservable(){
    let iMod : IModel = {
      "id": 1,
      "userId": 1,
      "bagTypeId": 1,
      "materialId": 1,
      "mname": "model_1",
      "approved": ModelStatus.NEW,
      "modelCreate": 1495664395000,
      "modelUpdate": 1495664395000
    };


    let iMod2 : IModel =   {
      "id": 2,
      "userId": 2,
      "bagTypeId": 2,
      "materialId": 2,
      "mname": "mod2",
      "approved": ModelStatus.NEW,
      "modelCreate": 1495664395000,
      "modelUpdate": 1495664395000
    }



    let tIt : mItems[] = [
      {
        "count": 12,
        "price": 12.95,
        "model": iMod
      },
      {
        "count": 5,
        "price": 15,
        "model": iMod2
      }
    ]

    let testD : OrderResp =  {
      "idOrder": 2,
      "moderatorId": 0,
      "userDto": {
        "idUser": 1,
        "email": "admin@gmail",
        "firstname": "Ivan",
        "lastname": "Onobrenko"
      },
      "status": {
        "description": "new created order",
        "code": "NEW"
      },
      "orderCreate": 1495664395000,
      "items": tIt,
      "sumPrice": 230.4
    }
    this.corServ.sendOrderResp(testD);
  }

  clearTestDataToObservable(){
    this.corServ.clearMessage();
  }

}
