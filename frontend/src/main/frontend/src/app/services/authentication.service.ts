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
                let user = response.json();
              console.log("----------" + response.json());
                if (user && user.token) {
                                      // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('currentUser', JSON.stringify(user));
                }
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}
