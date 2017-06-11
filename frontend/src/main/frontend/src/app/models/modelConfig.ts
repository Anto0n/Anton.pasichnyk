import {BagMaterial, BagType} from "./model";

export class Config2d{
  topPos : number = 0;

  leftPos : number = -50;

  width : number = 500;

  height : number = 500;

  material: BagMaterial;

  bagtype: BagType;
}


export class Config3d{

  material: BagMaterial;

}


/**
 * Created by Potaychuk Sviatoslav on 26.05.2017.
 * image - img url
 */


export class ModelConfig{
  image: string = undefined;

  config2d : Config2d = undefined;

  config3d : Config3d = undefined;
/*  constructor(image: string, rgb: string[]) { //constructors not allowd in jsno2obj
    this.image = image;
    this.rgb = rgb;
  }*/
}

