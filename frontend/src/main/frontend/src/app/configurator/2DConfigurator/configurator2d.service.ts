import { Injectable } from '@angular/core';

@Injectable()
export class Configurator2dService {
  private config2d : Config2d = new Config2d();

  constructor() { }

  getLocalConfig(){
    return this.config2d;
  }

  saveLocalConfig(conf : Config2d){

  }

  clearLocalConfig(){
    this.config2d  = new Config2d();
  }


}

export class Config2d{
   topPos : number = 0;
   leftPos : number = -50;
}
