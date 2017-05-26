import {Component, OnDestroy, OnInit} from '@angular/core';
import {OrderResp} from "../../models/order";
import {Subscription} from "rxjs";
import {CardOrderService} from "../../services/order/card-order.service";
import {AuthenticationService} from "../../services/authentication.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {RestService} from "../../services/rest.service";

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html'
})
export class CardMenuComponent implements OnInit, OnDestroy{
  //ordModels : OrderResp[] =[]
  private orderRespListener : OrderResp = new OrderResp();
  private subscription: Subscription;

  constructor(private cardServ:CardOrderService, private authService: AuthenticationService,
              private roleService: UserRoleService, private restService: RestService) {

    this.subscription = this.cardServ.getMessage().subscribe(orderResp => { this.orderRespListener = orderResp; console.log(orderResp.idOrder) });
  }

  ngOnInit() {
    if(this.authService.isAuthenticated()){
      this.reloadBucket();
    }

    this.roleService.roleEmiter.subscribe((role: string ) => {  // init menu from emiter
        this.initBucket(role);
      }
    );

  }

  initBucket(role: string){
    switch (role) {
      case 'Customer' :
        this.reloadBucket();
        break;
      case 'Moderator' :
        this.reloadBucket();
        break;
      case 'Factory' :
        this.reloadBucket();
        break;
      case 'Administrator' :
        this.reloadBucket();
        break;
      case 'Guest' :
        this.clearBucket();
        break;
      default :
        this.clearBucket();
    }
  }

  private reloadBucket(){
    let orderRespL : OrderResp;
    if(this.authService.isAuthenticated()){
      let uId  = this.roleService.getUserId();
      this.restService.getData(`./api/order/findbucket/${uId}`)
        .subscribe((data: OrderResp[]) => {
          this.orderRespListener = data[0]; // attach first value from array

        }, () => console.log('err'))
     /* if(this.orderRespListener === {}){
        console.log("EMPTY");
      }*/
     // this.orderRespListener = orderRespL;
      //this.cardServ.sendOrderResp(orderRespL);
      //if is empty [] - create new one
      //check on login/logout
    } else {
      this.cardServ.clearMessage();
    }
  }

  private createBucketIfNotExist(){

  }

  private clearBucket(){

    this.cardServ.clearMessage();
    this.orderRespListener = new OrderResp();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.subscription.unsubscribe();
    this.roleService.roleEmiter.unsubscribe();
  }



}

/*
* on init get bucket order
* if [] - create new one
* onLogout clear bucket
*
* */
