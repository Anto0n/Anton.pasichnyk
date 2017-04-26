import { Injectable } from '@angular/core';

import { User } from '../user';
export class UserCreateService {
/*  data: User[] = [
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
  ]; */

data: User[]= [];
  getUsers(): User[] {
    return this.data;
  }
  addUser (firstName: string, lastName: string, login: string, email: string, password: string) {
    this.data.push(new User(firstName, lastName, login, email, password));
  }
}
