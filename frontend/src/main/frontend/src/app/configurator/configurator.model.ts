import {ModelConfig} from "../models/modelConfig";
export interface IConfigurator {

  changeImage(src: string);

  /**
   * Reset current model config
   */
  resetModel();

  setColor(r: number, g: number, b: number);

  /**
   * Callback of image-upload component
   * @param data
   */
  imageUploaded(data: { src: string, pending: boolean, file: any });

  save(modelConfig: ModelConfig);

}
