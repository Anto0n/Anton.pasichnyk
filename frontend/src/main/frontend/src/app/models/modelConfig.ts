import {BagMaterial, BagType} from "./model";
import { JsonObject, JsonProperty } from "json2typescript";

@JsonObject
export class ModelConfig{
  @JsonProperty("image" , String)
  image: string = undefined;

  @JsonProperty("rgb" , [String])
  rgb: string[] = undefined;

  @JsonProperty("config2d", Config2d)
  config2d : Config2d = undefined;

/*  constructor(image: string, rgb: string[]) { //constructors not allowd in jsno2obj
    this.image = image;
    this.rgb = rgb;
  }*/
}

@JsonObject
export class Config2d{
  @JsonProperty("topPos",Number)
  topPos : number = 0;

  @JsonProperty("leftPos",Number)
  leftPos : number = -50;

  @JsonProperty("width",Number)
  width : number = 500;

  @JsonProperty("height",Number)
  height : number = 500;

  @JsonProperty("material",BagMaterial) //only for local -temp usage
  material: BagMaterial;

  @JsonProperty("bagtype",BagType) // for local temp usage
  bagtype: BagType;
}





/**
 * Created by Potaychuk Sviatoslav on 26.05.2017.
 * image - img url
 */
