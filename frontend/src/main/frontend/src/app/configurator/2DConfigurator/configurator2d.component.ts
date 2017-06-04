import {Component} from "@angular/core";
import {IConfigurator} from "../configurator.model";
import {ModelConfig} from "../../models/modelConfig";
@Component({
  selector: 'configurator-2d',
  template: `
    <img class='bag' src="http://www.iconskid.com/images/339/school-bag-icon-256x256-png-pictures-339971.png">
    <img class='user-image' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcREnW2A_-FFLnC88TzBMdNiM0CjygRtuKyDS7H0aYrI7rLUaHzy"/>
  
`,
  styles: [

    `
.bag{
background-attachment: fixed;
position: relative;
z-index: 100;
}

.user-image{
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10;
}

`,''

  ]
})
export class Configurator2DComponent implements IConfigurator {
  setColor(r: string, g: string, b: string) {
  }
  getModelConfig() {
    throw new Error('Method not implemented.');
  }


  selectMaterial(material: any) {
  }

  changeImage(src: string) {
    console.log('Method not implemented.');
  }

  resetModel() {
    console.log('Method not implemented.');
  }

   imageUploaded(data: { src: string; pending: boolean; file: any; }) {
    console.log('Method not implemented.');
  }

  save(modelConfig: ModelConfig) {
    console.log('Method not implemented.');
  }


}

/*
  - move user model
  - fix bagground movment model
  - read x y position, save position to config
  -
  */
