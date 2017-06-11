/**
 * Created by Anton on 18-Apr-17.
 */
import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {RestService} from "../services/rest.service";
import {ModelConfig} from "../models/modelConfig";
import {IConfigurator} from "./configurator.model";
import {UserRoleService} from "../services/user/user-role.service";
import {BagMaterial, BagType, IModel, BagtypeConfig} from "../models/model";
import {AuthenticationService} from "../services/authentication.service";
import {Configurator2dService} from "../services/configurator/configurator2d.service";

@Component({
  selector: 'configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css'],
})
export class ConfiguratorComponent implements OnInit {
  private modelName: string;
  @ViewChild('config')
  configurator: IConfigurator;
   materials: BagMaterial [] = [];
   begtypes: BagType[] = [];
  private modelId: number = 0;
  private modelConfig: ModelConfig = null;
  outBag : BagType = new BagType(); // for view mode only
  outMaterial : BagMaterial = new BagMaterial(); // for view mode only

  private configuratorType: ConfiguratorType = ConfiguratorType.D2;

  @Input()
  viewMode: boolean = false;

  @Input() set selectModelToConfig(model: IModel) { // for view mode only
    if (this.viewMode && model && model.id ) {
      console.log(model.id);
      this.modelId = model.id;
      this.restService.getData(`./api/models/config/${model.id}`).subscribe((data: ModelConfig) => {
        this.modelConfig = data;
      });
        this.restService.getData(`./api/bag_type/${model.bagTypeId}`).subscribe((data: BagType) => {
          this.outBag = data;
          let jStr : string  = JSON.parse(JSON.stringify( data.script  ));
          let obj : BagtypeConfig = JSON.parse(jStr);
          this.outBag.script = obj;
        });
         this.restService.getData(`./api/material/${model.materialId}`).subscribe((data: BagMaterial) => {
         console.log(data);
         this.outMaterial = data;
         });

    }

    //todo method reload data on configurator
    //this.configurator.
  }

  constructor(public userRoleService: UserRoleService,
              private restService: RestService,
              private config2dService: Configurator2dService,
              private authService: AuthenticationService) {

  }

  ngOnInit(): void {
    if (!this.viewMode) {
      console.log("view mode - false")
      this.restService.getData("./api/material/list").subscribe(data => this.materials = data);
      this.restService.getData("./api/bag_type/list").subscribe(data => this.begtypes = data);
    }
  }

  imageUploaded(data: { src: string, pending: boolean, file: { name: string, size: number, type: string } }) {
    this.configurator.imageUploaded(data);
  }

  private checkFile(imgFile: { type: string }): boolean {
    return true;
  }

  changeType(configuratorType: ConfiguratorType) {
    switch (configuratorType) {
      case ConfiguratorType.D3:
        this.configuratorType = ConfiguratorType.D2;
        break;
      case ConfiguratorType.D2:
        this.configuratorType = ConfiguratorType.D3;
        break;
    }
  }

  onClearMname(newModelName: string) { //clear model name for both components
    this.modelName = newModelName;
  }

}


enum ConfiguratorType{
  D3 = 3,
  D2 = 2
}
