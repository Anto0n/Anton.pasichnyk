import {ModelConfig} from "../models/modelConfig";
export interface IConfigurator {

  /**
   *
   * @param src
   */
  changeImage(src: string);

  /**
   * Reset current model config to default
   */
  resetModel();

  setColor(r: number, g: number, b: number);

  /**
   * src - image base 64 (data.src)
   * Callback of image-upload component
   * @param data
   */
  imageUploaded(data: { src: string, pending: boolean, file: {type:string} });

  /**
   * save model setting to user account
   * @param modelConfig
   */
  save(modelConfig: ModelConfig);

  /**
   * jeans cotton leather from DB
   */
  selectMaterial(material: any);

}
