import { Injectable } from '@angular/core';
import {Config2d, ModelConfig} from "../../models/modelConfig";

@Injectable()
export class Configurator2dService {
  private config : ModelConfig = new ModelConfig("./images/2dtest1.jpg", []);
  private inData : boolean  =false;

  constructor() {
    this.config.config2d = new Config2d();
  }

  getLocalConfig(){
    return this.config;
  }

  saveLocalConfig(conf : ModelConfig){
    this.inData = true;
  }

  clearLocalConfig(){
    this.inData = false;
    this.config  = new ModelConfig("./images/2dtest1.jpg", []);
    this.config.config2d = new Config2d();
  }

  containData():boolean{
    return this.inData;
  }

}

// ./images/2dtest1.jpg
