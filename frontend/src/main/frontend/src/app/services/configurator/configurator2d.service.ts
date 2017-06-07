import { Injectable } from '@angular/core';
import {Config2d, ModelConfig} from "../../models/modelConfig";

@Injectable()
export class Configurator2dService {
  private config : ModelConfig = new ModelConfig("./images/2dbase/2dBase1.png", []);

  constructor() {
    this.config.config2d = new Config2d();
  }

  getLocalConfig(){
    return this.config;
  }

  saveLocalConfig(conf : ModelConfig){

  }

  clearLocalConfig(){
    this.config  = new ModelConfig("./images/2dbase/2dBase1.png", []);
  }


}

