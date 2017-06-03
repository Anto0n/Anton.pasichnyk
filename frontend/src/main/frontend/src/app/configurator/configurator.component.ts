/**
 * Created by Anton on 18-Apr-17.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from "../services/rest.service";
import {ModelConfig} from "../models/modelConfig";
import {IConfigurator} from "./configurator.model";
import {UserRoleService} from "../services/user/user-role.service";

@Component({
  selector: 'configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css'],
})
export class ConfiguratorComponent{

  @ViewChild('config')
  configurator: IConfigurator;

  private configuratorType: ConfiguratorType = ConfiguratorType.D3;

  constructor(private userRoleService: UserRoleService){

  }

  imageUploaded(data: {src:string, pending: boolean, file: any}){

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

}

enum ConfiguratorType{
  D3 = 3,
  D2 = 2
}
