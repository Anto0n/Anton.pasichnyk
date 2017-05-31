import {Component, OnDestroy, OnInit} from '@angular/core';
import {CardOrderService} from "../../services/order/card-order.service";
import {AuthenticationService} from "../../services/authentication.service";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {OrderResp, OrderStatusNameEnum} from "../../models/order";
import {Subscription} from "rxjs";
import {subscribeOn} from "rxjs/operator/subscribeOn";
import {AlertService} from "../../services/alert.service";

@Component({
  selector: 'app-card-view',
  templateUrl: './card-view.component.html'
})
export class CardViewComponent implements OnInit, OnDestroy {
  private orderRespListener: OrderResp = new OrderResp();
  private subscription: Subscription;
  private myOrders : OrderResp[];
  //private subscrReloadBucket: Subscription;

  constructor(private cardOrderService: CardOrderService, private authService: AuthenticationService,
              private roleService: UserRoleService, private restService: RestService, private alertService: AlertService) {

  }

  ngOnInit() {
    this.cardOrderService.sendEmitReloadBucket();
    this.reloadMyOrdersList();
    this.subscription = this.cardOrderService.getMessage().subscribe(orderResp => {   // subscribeOn on change
     this.orderRespListener = orderResp;
    });

    this.authService.isAuthenticatedSubject.subscribe((auth: boolean ) => {
      if(auth){
        this.cardOrderService.sendEmitReloadBucket();
      }
    });

  }

  putOrder(){
    let nstatus = {
      "orderId": this.orderRespListener.idOrder,
      "orderStatusNameEnum": OrderStatusNameEnum[1]
    };
    this.restService.putData("./api/order/changeStatus", nstatus ).subscribe(
      () => {
        this.alertService.success( " order submitted", false)
        this.cardOrderService.clearMessage();
        this.orderRespListener = new OrderResp();
        this.reloadMyOrdersList();
        this.cardOrderService.sendEmitReloadBucket();
      }, () => {console.log('err')
        this.alertService.error("error");
      });


  }

  reloadMyOrdersList(){
    let id = this.roleService.getUserId();
    this.restService.getData('./api/order/findall' + `/${id}`).subscribe(
      (data: OrderResp[]) => {
          this.myOrders = data;
          this.myOrders =  this.myOrders.sort((a, b): number => {   //sor array by
            if (a.status.code < b.status.code) return 1;
            if (a.status.code > b.status.code) return -1;
            return 0;
          })
      }, () => console.log('err')
    );
  }

  clearCart(){
    let oid = this.orderRespListener.idOrder;
     this.restService.deleteData('./api/order/cleanbucket' + `/${oid}`).subscribe(
       () =>{
         this.cardOrderService.sendEmitReloadBucket();    //clean bucket
         this.orderRespListener = new OrderResp();
         this.cardOrderService.clearMessage();
       } , () => console.log('err')
     );
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    //this.subsOrderResp.unsubscribe();
    //this.authService.subjectLogin.unsubscribe();  error Object unsecribed
    //this.roleService.roleEmiter.unsubscribe(); //error ???
  }

  //this.cardOrderService.sendEmitReloadBucket();

}
