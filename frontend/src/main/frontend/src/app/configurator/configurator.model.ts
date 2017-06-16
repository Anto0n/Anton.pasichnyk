import {ModelConfig} from "../models/modelConfig";
import {BagMaterial, BagType, IModel} from "../models/model";
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

  setColor(r: string, g: string, b: string);

  /**
   * src - image base 64 (data.src)
   * Callback of image-upload component
   * @param data
   */
  imageUploaded(data: { src: string, pending: boolean, file: {type:string} });

  /**
   * save model setting to user account (Create Model)
   * @param modelConfig
   */
  save(modelConfig: ModelConfig);

  /**
   * jeans cotton leather from DB
   */
  selectMaterial(material: BagMaterial, panel?:string);

  /**
   *  select predefined bagtype from database
   * @param bagtype
   */
  selectBagType(bagtype : BagType);

  getModelConfig();

  loadModel(model: IModel): void;

}
