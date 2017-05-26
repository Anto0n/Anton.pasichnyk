import {Injectable} from "@angular/core";
import {Http, Headers, Response} from "@angular/http";
import {Observable} from "rxjs";
import "rxjs/add/operator/map";

@Injectable()
export class RestService {

  private headers = new Headers({
    'Content-Type': 'application/json'
  });


  constructor(private http: Http) {
  }

  getData(restPath: string, param?: string): Observable<any> {
    return this.http.get(restPath + (param ? param : ''),   {headers: this.headers})
      .map(res => res.json())
      .catch(this.handleError);
  }

  postJson(url: string, data: any): Observable<Response> {
    return this.http.post(
      url,
      JSON.stringify(data),
      {headers: this.headers}
    ).catch(this.handleError)
  }

  postJsonResp(url: string, data: any): Observable<any> {
    return this.http.post(
      url,
      JSON.stringify(data),
      {headers: this.headers}
    )
      .map(res => res.json())
      .catch(this.handleError)
  }

  deleteData(restUrl: string, param?: string): Observable<any> { // not tested
    return this.http.delete(restUrl +  (param ? param : ''))
      .map(res => res.json())
      .catch(this.handleError);
  }

  putData(restUrl: string, body: any, param?: string): Observable<Response> {
    return this.http.put(restUrl + (param ? param : ''), JSON.stringify(body), {headers: this.headers})
      .map((response: Response) => {
        response.json()
      })
      .catch(this.handleError);
  }

  private handleError(error: Response) {
    //in a real world app, we may send the error to some remote logging infrastructure
    //instead of just logging it to the console
    console.error(error);
    return Observable.throw(error);
  }
}

//return this.http.put('/api/users/' + user.id, user, this.jwt()).map((response: Response) => response.json());
