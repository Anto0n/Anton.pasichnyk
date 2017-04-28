export class UserCreate {
  constructor(public firstName: string,
              public lastName: string,
              public login: string,
              public email: string,
              public password: string) { }
}
