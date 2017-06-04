/**
 * Created by Potaychuk Sviatoslav on 26.05.2017.
 * image - img url
 */
export class ModelConfig{
  image: string;
  rgb: string[];
  constructor(image: string, rgb: string[]) {
    this.image = image;
    this.rgb = rgb;
  }
}
