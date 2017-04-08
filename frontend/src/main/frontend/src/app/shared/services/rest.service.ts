import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class RestService {

  constructor(private http: Http) {
  }

  getData(restPath: string, param?: string): Observable<any> {
    return this.http.get(restPath + (param ? param : '')).map(res => res.json());
  }


}
