import {BagMaterial, BagType} from "./model";
/**
 * Created by Potaychuk Sviatoslav on 26.05.2017.
 * image - img url
 */
export class ModelConfig{
  image: string;
  rgb: string[];
  config2d : Config2d;
  constructor(image: string, rgb: string[]) {
    this.image = image;
    this.rgb = rgb;
  }
}

export class Config2d{
  topPos : number = 0;
  leftPos : number = -50;
  width : number = 500;
  height : number = 500;
  material: BagMaterial;
  bagtype: BagType;
}
