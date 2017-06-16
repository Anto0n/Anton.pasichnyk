import { Injectable } from '@angular/core';
import {Config2d, ModelConfig} from "../../models/modelConfig";
import {BagType, BagMaterial} from "../../models/model";

@Injectable()
export class Configurator2dService {
  //private config : ModelConfig = new ModelConfig("./images/2dtest1.jpg", []);
  private config : ModelConfig = new ModelConfig();

  private inData : boolean  =false;
  private  _currentBag : BagType ;
  private _currentMaterial : BagMaterial ;
  private _matUrl : string;

  constructor() {
    this.config.image = "./images/2dtest1.jpg";
    this.config.config2d = new Config2d();
    this._currentBag = new BagType();
    this._currentMaterial = new BagMaterial();
    //this.config.config2d.bagtype = new BagType();
  }

  getLocalConfig(){
    return this.config;
  }

  saveLocalConfig(conf : ModelConfig){
    this.inData = true;
  }

  clearLocalConfig(){
    this.inData = false;
    this.config  = new ModelConfig();
    this.config.image = "./images/2dtest1.jpg";
    this.config.config2d = new Config2d();
    this._currentBag = new BagType();
    this._currentMaterial = new BagMaterial();
    this._matUrl="";

    //this.config.config2d.bagtype = new BagType();
  }

  containData():boolean{
    return this.inData;
  }


  getCurrentBag(): BagType {
    return this._currentBag;
  }

  setCurrentBag(value: BagType) {
    this._currentBag = value;
  }

  getCurrentMaterial(): BagMaterial {
    return this._currentMaterial;
  }

  setCurrentMaterial(value: BagMaterial) {
    this._currentMaterial = value;
  }


  getMatUrl(): string {
    return this._matUrl;
  }

  setMatUrl(value: string) {
    this._matUrl = value;
  }
}

// ./images/2dtest1.jpg
