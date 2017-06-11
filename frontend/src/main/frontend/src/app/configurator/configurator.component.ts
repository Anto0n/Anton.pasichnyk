/**
 * Created by Anton on 18-Apr-17.
 */
import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {RestService} from "../services/rest.service";
import {ModelConfig} from "../models/modelConfig";
import {IConfigurator} from "./configurator.model";
import {UserRoleService} from "../services/user/user-role.service";
import {BagMaterial, BagType} from "../models/model";
import {AuthenticationService} from "../services/authentication.service";
import {Configurator2dService} from "../services/configurator/configurator2d.service";

@Component({
  selector: 'configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css'],
})
export class ConfiguratorComponent implements OnInit{
  private modelName : string;

  @ViewChild('config')
  configurator: IConfigurator;

  private materials: BagMaterial [] = [];
  private begtypes: BagType;

  private configuratorType: ConfiguratorType = ConfiguratorType.D2;

  @Input() set selectModelId(modelId: number){
    this.modelId = modelId;
    this.restService.getData(`./api/models/config/${modelId}`).subscribe((data: ModelConfig) => {
      console.log(data);
      this.modelConfig = data;
    });
    //todo method reload data on configurator
    //this.configurator.
  }


  private modelId: number = 0;
  private modelConfig: ModelConfig = null;

  constructor(public userRoleService: UserRoleService,
              private restService: RestService,
              private config2dService : Configurator2dService,
              private authService : AuthenticationService){

  }

  ngOnInit(): void {
    this.restService.getData("./api/material/list").subscribe(data=>this.materials=data);
    this.restService.getData("./api/bag_type/list").subscribe(data=>this.begtypes=data);
  }

  imageUploaded(data: {src:string, pending: boolean, file: {name: string, size: number, type: string}}){
    this.configurator.imageUploaded(data);
  }

  private checkFile(imgFile : {type:string} ) : boolean {
    return true;
  }

  changeType(configuratorType: ConfiguratorType){
    switch (configuratorType){
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
