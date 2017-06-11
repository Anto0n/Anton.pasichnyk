import { Injectable } from '@angular/core';
import { UserCreate } from '../../models/userCreate';
import {RestService} from "../rest.service";


/*@Component({
  providers: [RestService]
})*/

@Injectable()
export class UserCRUDService {
  private  usercreate_url :String = '/api/user/create';
  private  alluserslist_url :String = '/api/user/list';


  //  delete /api/user/delete{id}
  //  get /api/user/getbyemail{email}
  //  get /api/user/list
  //  put /api/user/update{id}
  //  get /api/user/{id}
data: UserCreate[]= [];
  constructor (private restService: RestService) {}


  getUsers(): UserCreate[] {
    return this.data;
  }

/*data: User[]= [];
  getUsers(): User[] {
    return this.data;
  }*/

  addUser (firstName: string, lastName: string, login: string, email: string, password: string) {
    this.data.push(new UserCreate(firstName, lastName, login, password));

  }

  postUser (url: string, data: any) {


  }
}
