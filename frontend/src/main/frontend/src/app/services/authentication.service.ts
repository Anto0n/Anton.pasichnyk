import {Injectable, EventEmitter} from '@angular/core';
import {Http, Headers, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {RestService} from "./rest.service";

@Injectable()
export class AuthenticationService {

  public roleEmiter;

  constructor(private http: Http, private restService: RestService) {
    this.roleEmiter = new EventEmitter<{ role: string }>();

  }

  init() { //void method, use to init service
  }

  login(username: string, password: string) {
    return this.restService.postJson('./api/login', ({login: username, password: password}))
      .map((response: Response) => {
        // login successful if there's a jwt token in the response
        //original:
        /*    let user = response.json();
         console.log("----------" + response.json());
         if (user && user.token) {
         // store user details and jwt token in local storage to keep user logged in between page refreshes
         localStorage.setItem('currentUser', JSON.stringify(user));
         }*/

        //temp solution:
        let user: userRole = response.json()[0];//!!!
        console.log('----USER!!!!!!------' + user);
        console.log(user);
        if (user) { //user && user.role
          localStorage.setItem('currentUser', user.role);
        }
        this.roleEmiter.emit(user);
      });
  }

  logout() {
    // remove user from local storage to log user
    this.roleEmiter.emit( "Guest");
    localStorage.removeItem('currentUser');
  }

  isAuthenticated() {
    var user = localStorage.getItem('currentUser');

    if (user) {
      return true;
    } else {
      return false;
    }
  }

}

export interface userRole {
 role: string;
 }


/*
 Save to local storage

 localStorage.setItem('currentUser', JSON.stringify({ token: token, name: name }));
 Load from local storage

 var currentUser = JSON.parse(localStorage.getItem('currentUser'));
 var token = currentUser.token; // your token
 For more I suggest you go through this tutorial: Angular 2 JWT Authentication Example & Tutorial

 if (localStorage.getItem("infiniteScrollEnabled") === null) {
 //...
 }

 var testObject = { 'one': 1, 'two': 2, 'three': 3 };

 // Put the object into storage
 localStorage.setItem('testObject', JSON.stringify(testObject));

 // Retrieve the object from storage
 var retrievedObject = localStorage.getItem('testObject');

 console.log('retrievedObject: ', JSON.parse(retrievedObject));

 */
