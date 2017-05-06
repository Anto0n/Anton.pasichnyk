import {Injectable, EventEmitter} from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {RestService} from "./rest.service";

@Injectable()
export class AuthenticationService {

    public roleEmiter = new EventEmitter<{role:string}>();

    constructor(private http: Http, private restService: RestService) { }

    login(username: string, password: string) {
        return this.restService.postJson('/api/login', ({ login: username, password: password }))
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
              let user:  any[] = response.json();
              console.log('----USER!!!!!!------'+ user);
              console.log(user);
              if (user) { //user && user.role
                localStorage.setItem('currentUser', JSON.stringify(user));
              }
              console.log('!!!!');

              this.roleEmiter.emit(user[0]);
            });
    }

    logout() {

        // remove user from local storage to log user
        this.roleEmiter.emit({role: "anonumus"});
        localStorage.removeItem('currentUser');
    }

  isAuthenticated() {
    var user = localStorage.getItem('currentUser');

    if (user) {
      return true;
    } else {
      return false;
    }
  }}


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
