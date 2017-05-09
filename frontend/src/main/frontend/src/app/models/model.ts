export class IModel {
  "approved": ModelStatus;
  "id": number;
  "mname": string;
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
