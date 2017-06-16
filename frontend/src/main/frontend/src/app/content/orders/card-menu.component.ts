import {Component, OnDestroy, OnInit} from '@angular/core';
import {mItems, OrderResp} from "../../models/order";
import {Subscription} from "rxjs";
import {CardOrderService} from "../../services/order/card-order.service";
import {AuthenticationService} from "../../services/authentication.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {RestService} from "../../services/rest.service";
import {IModel} from "../../models/model";


@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html',
  styles:[`
      .modoverflow {
        height:300px;
        overflow-y: scroll;
      }
`]
})
export class CardMenuComponent implements OnInit, OnDestroy {
  //ordModels : OrderResp[] =[]
  private orderRespListener: OrderResp = new OrderResp();
  private subscription: Subscription;
  private subscrReloadBucket: Subscription;
  private selectedModel: IModel ;
  //private emtyCard: boolean;

  constructor(private cardServ: CardOrderService, private authService: AuthenticationService,
              private roleService: UserRoleService, private restService: RestService) {

    this.subscription = this.cardServ.getMessage().subscribe(orderResp => {
      this.orderRespListener = orderResp;
    });


   /* this.authService.isAuthenticatedSubject.subscribe((auth: boolean ) => {
      if(auth){
        console.log("send reload bucket on login from card-menu");
        this.reloadBucket();
      }else{   }
    });*/

    this.subscrReloadBucket = this.cardServ.getEmitReloadBucket().subscribe(    //reload bucket by comand
      booleanIn => {
      if(booleanIn){
        this.reloadBucket();
      }
      }
    )
  }

  ngOnInit() {
    if (!this.authService.isAuthenticated()) {
      this.initBucket('Guest');
    }

    this.roleService.roleEmiter.subscribe((role: string) => {  // init menu from emiter
        this.initBucket(role);
      }
    );
    this.reloadBucket();
  }

  initBucket(role: string) {
    switch (role) {
      case 'Customer' :
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
    //let orderRespL: OrderResp;
    if (this.authService.isAuthenticated()) {
      let uId = this.roleService.getUserId();
      this.restService.getData(`./api/order/findbucket/${uId}`)
        .subscribe((data: OrderResp) => {
          this.orderRespListener = data;
          console.log("BUCKET SEND MESS");
          this.cardServ.sendOrderResp(data); //req!!!! err
        }, () => console.log('err'));

    } else {
      this.clearBucket();
    }
  }

  private clearBucket() {
    this.cardServ.clearMessage();
    this.orderRespListener = new OrderResp();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.subscription.unsubscribe();
   // this.roleService.roleEmiter.unsubscribe();
  }


}

/*
 * on init get bucket order
 * if [] - create new one
 * onLogout clear bucket
 *
 * */
