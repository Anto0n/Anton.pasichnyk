/**
 * Created by Potaychuk Sviatoslav on 26.05.2017.
 * image - img url
 */
export class ModelConfig{
  image: string;
  rgb: any;
  constructor(image: string, rgb: any) {
    this.image = image;
    this.rgb = rgb;
  }
}
