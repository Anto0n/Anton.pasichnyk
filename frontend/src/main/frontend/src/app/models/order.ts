
import {UserDto} from "./user";
import {IModel} from "./model";
export class OrderResp{
  idOrder : number;
  moderatorId: number;
  userDto: UserDto;
  status: statusOrderDto;
  orderCreate: number;
  items: Items[];
  sumPrice: number;
}

export interface statusOrderDto{
  code: string;
  description: string;
}

export class OrderCreate{
  userId : number;
  items: ItemsCreate[];
}
export interface Items{
  models: IModel[];
  count: number;
  price: number;
}

export interface  ItemsCreate{
  modelId: number;
  count: number;
}



