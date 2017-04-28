import { Injectable } from '@angular/core';
import {Http, Headers, RequestOptions, Response} from "@angular/http";
import { UserCreate } from '../userCreate';

//@Injectable - декоратор, который передает данные о нашем сервисе.
@Injectable()
export class UserCreateService {
  data: UserCreate[]= [];
  constructor (private http: Http) {}

  UserCreate = [
    {
      login: "admin",
      email: "admin@gmail.com",
      password: "12345",
      firstName: "Pavel",
      lastName: "Khokhlov"
    },
    {
      login: "user",
      email: "user@gmail.com",
      password: "qwerty",
      firstName: "Boris",
      lastName: "TheAnimal"
    },
    {
      login: "master",
      email: "master@gmail.com",
      password: "1q2w3e",
      firstName: "Martin",
      lastName: "Freeman"
    }
  ];

  getUsers(): UserCreate[] {
    return this.data;
  }

/*data: User[]= [];
  getUsers(): User[] {
    return this.data;
  }*/

  addUser (firstName: string, lastName: string, login: string, email: string, password: string) {
    this.data.push(new UserCreate(firstName, lastName, login, email, password));
  }

  postUser (url: string, data: any){
   // postJson
  }

}
