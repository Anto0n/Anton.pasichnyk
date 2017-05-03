import {Injectable} from "@angular/core";
//@Injectable()
export class UserCreate {
/*  private firstName: string;
  private lastName: string;
  private email: string;
  private password: string;*/

  constructor(public password: string,
              public email: string,
              public firstname: string,
              public lastname: string,
              public passwordConfirm? : string
              ) {

  /*  this.email = _email;
    this.password = _password;
    this.firstName = _firstName;
    this.lastName = _lastName;*/
  }

/*

  get getFirstName(): string {
    return this.firstname;
  }

  set setFirstName(value: string) {
    this.firstname = value;
  }

  get getemail(): string {
    return this.email;
  }

  set setemail(value: string) {
    this.email = value;
  }

  get getpassword(): string {
    return this.password;
  }

  set setpassword(value: string) {
    this.password = value;
  }


  public get getlastName(): string {
    return this.lastname;
  }

  public set setlastName(value: string) {
    this.lastname = value;
  }

  greet() {
    console.log("Hello", this.firstname);
  }

*/


}
