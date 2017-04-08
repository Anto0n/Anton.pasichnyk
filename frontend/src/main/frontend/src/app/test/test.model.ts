
export interface IUser{
  "login": string,
  "email": string,
  "firstname": string,
  "lastname": string,
  "role": IRole;
  "statusId": number,
  "userCreate": number,
  "userUpdate": number,
  "deleted": number

}

export interface IRole{
  "idRole": number,
  "name": string,
  "description": string,
  "deleted": number
}
