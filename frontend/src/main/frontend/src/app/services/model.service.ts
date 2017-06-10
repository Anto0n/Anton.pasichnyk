import {Injectable, OnInit} from '@angular/core';
import {BagType, BagtypeConfig} from "../models/model";
import {RestService} from "./rest.service";
import {JsonConvert} from "json2typescript";
import {Observable} from "rxjs";


@Injectable()
export class ModelService {
  private bags : BagType[] = [];
  private  bagsloaded : boolean = false;

  constructor(private restService : RestService) { }

/*  public getbags() : Observable<BagType[]>  {
    let bags : BagType[] =[];
     this.restService.getData("./api/bag_type/list").subscribe((data: BagType[]) => {
        bags = data;
        for (var i = 0; i < bags.length; i++) {   //load script objects
          let jStr: string = JSON.parse(JSON.stringify(bags[i].script));
          let obj: BagtypeConfig = JsonConvert.deserializeString(jStr, BagtypeConfig);
          bags[i].script = new BagtypeConfig();
          bags[i].script = obj;
           console.log("BAGS list");
           console.log(obj);
           console.log(bags[i]);
          console.log("model service, bags");
          console.log( bags);
        }
      }
    );
    return Observable.of(bags);
  }*/

  private reloadBags() {
    return this.restService.getData("./api/bag_type/list").map((data: BagType[]) => {
      console.log("service start");
      let bags : BagType[] =[];
        bags = data;
        console.log( bags);
        for (var i = 0; i < bags.length; i++) {   //load script objects
          let jStr: string = JSON.parse(JSON.stringify(bags[i].script));
          let obj: BagtypeConfig = JsonConvert.deserializeString(jStr, BagtypeConfig);
          bags[i].script = new BagtypeConfig();
          bags[i].script = obj;
        }
      console.log("model serv111");
      console.log(bags);
      this.bags = bags;
          this.bagsloaded = true;
      }
    ).catch((error) => {
      console.log('error ' + error);
      throw error;
    });
  }

  getbagslocal() {
    if(!this.bagsloaded){
      return this.reloadBags();//.subscribe(_=> {return this.bags})
    } else
      return this.bags;
  }

  getBagByIdlocal(id : number) {
    if(!this.bagsloaded){
      this.reloadBags().subscribe(_=> { return this.bags.find(x => x.id == id)})
    } else
      return this.bags.find(x => x.id == id)
  }

}

/*
: Observable<any> {
  return this.http.get(restPath + (param ? param : ''),   {headers: this.headers})
    .map(res => res.json())
    .catch(this.handleError);
}*/
