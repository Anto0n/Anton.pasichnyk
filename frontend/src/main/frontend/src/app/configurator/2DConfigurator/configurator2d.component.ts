import {Component} from "@angular/core";
import {IConfigurator} from "../configurator.model";
import {ModelConfig} from "../../models/modelConfig";
@Component({
  selector: 'configurator-2d',
  template: `text`
})
export class Configurator2DComponent implements IConfigurator {

  changeImage(src: string) {
    console.log('Method not implemented.');
  }

  resetModel() {
    console.log('Method not implemented.');
  }

  setColor(r: number, g: number, b: number) {
    console.log('Method not implemented.');
  }

  imageUploaded(data: { src: string; pending: boolean; file: any; }) {
    console.log('Method not implemented.');
  }

  save(modelConfig: ModelConfig) {
    console.log('Method not implemented.');
  }


}
