import { Component, OnInit } from '@angular/core';
import {CardOrderService} from "../../services/order/card-order.service";
import {AuthenticationService} from "../../services/authentication.service";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {OrderResp} from "../../models/order";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html'
})
export class CardViewComponent implements OnInit {
  private orderRespListener: OrderResp = new OrderResp();
  private subscription: Subscription;
  //private subscrReloadBucket: Subscription;

  constructor(private cardServ: CardOrderService, private authService: AuthenticationService,
              private roleService: UserRoleService, private restService: RestService) {

    this.subscription = this.cardServ.getMessage().subscribe(orderResp => {
      console.log("card view ordResp")
      this.orderRespListener = orderResp;
    });
  }

  ngOnInit() {
  }

  //this.cardOrderService.sendEmitReloadBucket();

}
