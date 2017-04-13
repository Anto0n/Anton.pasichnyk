import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class RestService {

  constructor(private http: Http) {
  }

  headers = new Headers({
    'Content-Type': 'application/json'
  });

  getData(restPath: string, param?: string): Observable<any> {
    return this.http.get(restPath + (param ? param : '')).map(res => res.json());
  }

  postJson(url: string, data: any): Observable<Response> {
    return this.http.post(
      url,
      JSON.stringify(data),
      {headers: this.headers}
    )
  }
}
