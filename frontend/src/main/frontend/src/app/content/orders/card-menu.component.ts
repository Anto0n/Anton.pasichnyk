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
export class CardMenuComponent implements OnInit, OnDestroy {
  //ordModels : OrderResp[] =[]
  private orderRespListener: OrderResp = new OrderResp();
  private subscription: Subscription;
  private emtyCard: boolean;

  constructor(private cardServ: CardOrderService, private authService: AuthenticationService,
              private roleService: UserRoleService, private restService: RestService) {

    this.subscription = this.cardServ.getMessage().subscribe(orderResp => {
      this.orderRespListener = orderResp;
    /*  if (orderResp.items.length == 0) {
        this.emtyCard = true;
      } else{
        this.emtyCard = false;
      }*/
    });
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.initBucket('Guest');
    }

    this.roleService.roleEmiter.subscribe((role: string) => {  // init menu from emiter
        this.initBucket(role);
      }
    );

  }

  initBucket(role: string) {
    switch (role) {
      case 'Customer' :
        this.recreateBucket();
        this.reloadBucket();
        break;
      case 'Moderator' :
        this.clearBucket();
        break;
      case 'Factory' :
        this.clearBucket();
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

  private reloadBucket() {
    let orderRespL: OrderResp;
    if (this.authService.isAuthenticated()) {
      let uId = this.roleService.getUserId();
      this.restService.getData(`./api/order/findbucket/${uId}`)
        .subscribe((data: OrderResp[]) => {
          this.orderRespListener = data[0]; // attach first value from array
        /*  if (data[0].items?.length > 0) {
            this.emtyCard = true;
          } else{
            this.emtyCard = false;
          }*/
        }, () => console.log('err'))

      // this.orderRespListener = orderRespL;
      //this.cardServ.sendOrderResp(orderRespL);
      //if is empty [] - create new one
      //check on login/logout
    } else {
      this.cardServ.clearMessage();
    }
  }

  recreateBucket() {

  }

  private createBucketIfNotExist() {

  }

  private clearBucket() {

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
