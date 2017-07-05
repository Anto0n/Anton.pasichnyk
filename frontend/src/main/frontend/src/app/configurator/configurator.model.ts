import {ModelConfig} from "../models/modelConfig";
import {BagMaterial, BagType, IModel} from "../models/model";
import {ImageConfig} from "../models/image-config";
import {Panel} from "./3DConfigurator/panel.model";
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
  imageUploaded(data: { src: string, pending: boolean, file: {type:string} }, size?: number);

  /**
   * save model setting to user account (Create Model)
   * @param modelConfig
   */
  save(modelConfig: ModelConfig, imageConfig: ImageConfig);

  resetModel();

  /**
   * jeans cotton leather from DB
   */
  selectMaterial(material: BagMaterial, panel?:string);

  enableCamera();
  disableCamera();

  /**
   *  select predefined bagtype from database
   * @param bagtype
   */
  selectBagType(bagtype : BagType);

  getModelConfig();

  loadModel(model: IModel): void;

  activateEditMode();
  activateViewDefaultMode();
  changeImageSize(value:number, src: string, panel: any);
  changeImageX(value:number, src: string, panel: any);
  changeImageY(value:number, src: string, panel: any);
  stopAnimate(): void;
  positionImage(size, x, y, src: string, panel: Panel): void;

}
