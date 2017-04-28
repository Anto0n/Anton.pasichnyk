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
    ).catch(this.handleError)
  }

  private handleError (error: Response) {
    //in a real world app, we may send the error to some remote logging infrastructure
    //instead of just logging it to the console
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
