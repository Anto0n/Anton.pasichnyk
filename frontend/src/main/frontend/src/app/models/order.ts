
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

export class statusOrderDto{
  code: string;
  description: string;
}

export class OrderCreate{
  userId : number;
  items: ItemsCreate[];
}
export class Items{
  models: IModel[];
  count: number;
  price: number;
}

export class  ItemsCreate{
  modelId: number;
  count: number;
}



