export class IModel {
  "id": number;
  "userId": number;
  "bagTypeId": number;
  "mname": string;
  "approved": ModelStatus;
  "modelCreate": number;
  "modelUpdate": number;
}
// 0 1 2
 enum ModelStatus {
  NEW, APPROVED,  REJECTED
}

export interface CreateModel{
  "approved": ModelStatus;
  "bagTypeId": number;
  "mname": string;
  "userId": number;

}


