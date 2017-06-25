
import {UserDto} from "./user";
import {IModel} from "./model";


export class OrderResp{
  idOrder : number;
  moderatorId: number;
  userDto: UserDto;
  status: statusOrderDto;
  orderCreate: number;
  items: mItems[];
  sumPrice: number;
}

export class statusOrderDto{
  code: string;
  description: string;
}

export class OrderCreate{
  userId : number;
  items: ItemsCreate[];
}
export class mItems{
  idOrderItem: number;
  count: number;
  price: number;
  model: IModel;
}

export class  ItemsCreate{
  modelId: number;
  count: number;
}

export enum OrderStatusNameEnum {
  BUCKET, NEW, ACCEPTED, PROCESSING, DENIED, SEND
}

//models vs model
