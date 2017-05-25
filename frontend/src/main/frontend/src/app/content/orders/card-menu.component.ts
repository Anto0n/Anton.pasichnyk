import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderResp} from "../../models/order";
import {Subscription} from "rxjs";
import {CardOrderService} from "../../services/order/card-order.service";

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html'
})
export class CardMenuComponent implements OnInit, OnDestroy{
  //ordModels : OrderResp[] =[]
    orderRespListener : OrderResp = new OrderResp();
  subscription: Subscription;

  constructor(private corServ:CardOrderService) {
    this.subscription = this.corServ.getMessage().subscribe(orderResp => { this.orderRespListener = orderResp; console.log(orderResp.idOrder) });
  }

  ngOnInit() {

  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
  }

}
