import { Component, OnInit } from '@angular/core';
import {OrderResp} from "../../models/order";

@Component({
  selector: 'app-card-menu',
  templateUrl: './card-menu.component.html'
})
export class CardMenuComponent implements OnInit {
  ordModels : OrderResp[] =[]

  constructor() { }

  ngOnInit() {
  }

}
