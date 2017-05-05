import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map'
import {RestService} from "./rest.service";

@Injectable()
export class AuthenticationService {
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


              var testObject = { 'one': 1, 'two': 2, 'three': 3 };

              // Put the object into storage
              localStorage.setItem('testObject', JSON.stringify(testObject));

              // Retrieve the object from storage
              var retrievedObject = localStorage.getItem('testObject');


              console.log('retrievedObject: ', JSON.parse(retrievedObject));
             var user = response.json();
              console.log('----------'+ response.text());
              //if (user.copyIn && user.role) { //user && user.role
                  localStorage.setItem('currentUser', JSON.stringify(user));
                  let temp = localStorage.getItem('currentUser');
              let  u2 =  JSON.parse(temp);
              console.log("retrievedObject: ",temp + u2.role);
              console.log("+++++++++++---------user"+user+'---||--'+user.role);

             // }


            });

    }

    logout() {

        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
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
