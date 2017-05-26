export class IModel {
  "id": number;
  "userId": number;
  "bagTypeId": number;
  "materialId":number;
  "mname": string;
  "approved": ModelStatus;
  "modelCreate": number;
  "modelUpdate": number;
}


export interface CreateModel{
  //"id"?:number;
  "approved": ModelStatus;
  "bagTypeId": number;
  "mname": string;
  "userId": number;

}

// 0 1 2
export enum ModelStatus {
  NEW, APPROVED,  REJECTED
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
