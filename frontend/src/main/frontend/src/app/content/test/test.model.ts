
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
//        "userDto": {
//        "login": "man2age2rD2a",
//        "email": "l2sd3ao@1D",
//        "firstname": "La22o1s",
//        "lastname": "Dz123is",
//        "role": {
//        "idRole": 4,
//        "name": "Factory",
//        "description": "Create products according to orders.",
//        "deleted": 0
//        },
//        "statusId": 1,
//        "deleted": 0
//        }
//    }
