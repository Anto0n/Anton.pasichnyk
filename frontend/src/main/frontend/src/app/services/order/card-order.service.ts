import { Injectable } from '@angular/core';
import {Observable, Subscription} from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {OrderResp} from "../../models/order";
import {AuthenticationService} from "../authentication.service";
import {RestService} from "../rest.service";
import {UserRoleService} from "../user/user-role.service";

@Injectable()
export class CardOrderService {
  private subjectOrderResp = new Subject<OrderResp>();
  private subjectItems = new Subject<OrderResp>();
  private subsOrderResp: Subscription;
  private subjectReloadBucket = new Subject<boolean>();


  // private subject = new Subject<any>();
  //
  // sendMessage(message: string) {
  //   this.subject.next({ text: message });
  // }

/*  constructor(private roleService: UserRoleService, private restService: RestService, private authService: AuthenticationService){

  }*/

  sendOrderResp(message: OrderResp) {
    this.subjectOrderResp.next(message);
  }

  clearMessage() {
    let resp : OrderResp = new OrderResp();
    this.subjectOrderResp.next(resp);
  }

  getMessage(): Observable<OrderResp> {
    //console.log("get OrdResp service");
    return this.subjectOrderResp.asObservable();
  }

  sendEmitReloadBucket(){
    this.subjectReloadBucket.next(true);
  }

  getEmitReloadBucket(): Observable<boolean>{
    return this.subjectReloadBucket.asObservable();
  }




 // refreshOrderBucket
/*  sendMessage(message: string) {
    this.subject.next({ text: message });
  }

  clearMessage() {
    this.subject.next();
  }

  getMessage(): Observable<any> {
    return this.subject.asObservable();
  }*/


}

//http://jasonwatmore.com/post/2016/12/01/angular-2-communicating-between-components-with-observable-subject
