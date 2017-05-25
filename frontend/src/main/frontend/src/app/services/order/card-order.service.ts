import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import {OrderResp} from "../../models/order";

@Injectable()
export class CardOrderService {
  private subjectOrderResp = new Subject<OrderResp>();
  private subjectItems = new Subject<OrderResp>();

  // private subject = new Subject<any>();
  //
  // sendMessage(message: string) {
  //   this.subject.next({ text: message });
  // }

  sendOrderResp(message: OrderResp) {
    this.subjectOrderResp.next(message);
  }

  clearMessage() {
    this.subjectOrderResp.next();
  }

  getMessage(): Observable<OrderResp> {
    return this.subjectOrderResp.asObservable();
  }

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
