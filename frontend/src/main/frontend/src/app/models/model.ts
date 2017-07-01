import { JsonObject, JsonProperty } from "json2typescript";
import {ModelConfig} from "./modelConfig";
import {Panel} from "../configurator/3DConfigurator/panel.model";
import {UserDto} from "./user";
import {ImageConfig} from "./image-config";

export class IModel {
  "id": number;
  "user": UserDto;
  "bagTypeId": number;
  "materialId":number;
  "mname": string;
  "approved": ModelStatus;
  "modelCreate": number;
  "modelUpdate": number;
  "config"?: ModelConfig;
  "imageConfig"?: ImageConfig;
}


export class CreateModel{
  //"id"?:number;
  "approved": ModelStatus;
  "bagTypeId": number;
  "materialId": number;
  "mname": string;
  "userId": number;
  "config" : string;
  "imageConfig" : string;

  constructor(approved: ModelStatus, bagTypeId: number, materialId: number, mname: string, userId: number, config : string, imageConfig: string) {
    this.approved = approved;
    this.bagTypeId = bagTypeId;
    this.materialId = materialId;
    this.mname = mname;
    this.userId = userId;
    this.config = config;
    this.imageConfig = imageConfig;
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
  "panels": Panel[];
  constructor(){
    this.script = new BagtypeConfig();
  }
}

export class BagtypeConfig{
  "imgsrc" : string = undefined;
}

export class BagMaterial{
  "id": number;
  "name": string;
  "price": number;
  "image": string;
  "imageMin": string;
  constructor(){
  }
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
