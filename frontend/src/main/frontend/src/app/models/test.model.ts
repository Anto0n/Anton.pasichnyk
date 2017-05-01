
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



//create new user UserDtoAndPassword :
//    {
//        "password": "asd13212dss",
//        "login": "man2age2rD2a",
//        "email": "l2sd3ao@1D",
//        "firstname": "La22o1s",
//        "lastname": "Dz123is"
//        }
//    }
