import { JsonObject, JsonProperty } from "json2typescript";

export class IModel {
  "id": number;
  "userId": number;
  "bagTypeId": number;
  "materialId":number;
  "mname": string;
  "approved": ModelStatus;
  "modelCreate": number;
  "modelUpdate": number;
  "config" : string;
}


export class CreateModel{
  //"id"?:number;
  "approved": ModelStatus;
  "bagTypeId": number;
  "materialId": number;
  "mname": string;
  "userId": number;
  "config" : string;

  constructor(approved: ModelStatus, bagTypeId: number, materialId: number, mname: string, userId: number, config : string) {
    this.approved = approved;
    this.bagTypeId = bagTypeId;
    this.materialId = materialId;
    this.mname = mname;
    this.userId = userId;
    this.config = config;
  }
}

// 0 1 2
export enum ModelStatus {
  NEW, APPROVED,  REJECTED
}

//GET ./api/bag_type/list
export  class BagType{
  "id": number;
  "name": string;
  "script": BagtypeConfig;
  "price": number;
  constructor(){
    this.script = new BagtypeConfig();
  }
}

@JsonObject
export class BagtypeConfig{
 // constructor(public imgsrc : string ){}
  //@JsonProperty('first-line')
  @JsonProperty("imgsrc" , String)
  "imgsrc" : string = undefined;
}

export class BagMaterial{
  "id": number;
  "name": string;
  "price": number;
}


/*
{ Enum in javascript
  0: "Green"
  1: "Red"
  2: "Blue"
  "Blue": 2
  "Green": 0
  "Red": 1
}*/
