import {IUser} from "../test/test.model";
/**
 * Created by potaychuk on 12.04.2017.
 */
export interface IOrder{
  id: number,
  user: IUser,
  status: IOrderStatus,
  model: IModel


}
export interface IOrderStatus{
  code: string
}
export interface IModel{
  id: number
}
