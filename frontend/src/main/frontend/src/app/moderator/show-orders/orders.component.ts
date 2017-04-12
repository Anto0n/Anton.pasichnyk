/**
 * Created by potaychuk on 12.04.2017.
 */
import {Component} from "@angular/core";
import {RestService} from "../../shared/services/rest.service";
import {IOrder} from "../moderator.model";
@Component({
  selector: 'orders',
  template: `
      <div *ngFor="let order of orders" >
        {{order.id}}, {{order.user.email},{{order.model.id}}
      </div>
    <button (click)="getOrders()">Get Orders</button>
  `
})
export class ModeratorOrdersComponent {

  private orders: IOrder[] = [];

  constructor(private restService: RestService) {
  }

  getOrders() {
    this.restService.getData('/orders')
      .subscribe((data: IOrder[]) => {
        this.orders = data;
        console.log(data);
      }, () => console.log('err'));
  }
}
