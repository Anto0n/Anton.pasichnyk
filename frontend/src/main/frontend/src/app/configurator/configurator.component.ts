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
import {Http, Response} from "@angular/http";

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
    debugger;
    this.modelId = modelId
    console.log(modelId);
    this.http.get('./images/data.json').subscribe((data: Response) => {
      //ModelConfig
      console.log(data);
      //this.modelConfig = data;
      //console.log(data);
      //console.log(JSON.parse(data));
      //this.modelConfig = JSON.parse(data._body);
      //console.log(this.modelConfig);
    });
    //todo method reload data on configurator
    //this.configurator.
  }

  private modelId: number = 0;
  private modelConfig: ModelConfig = null;

  constructor(public userRoleService: UserRoleService,
              private http: Http,
              private restService: RestService,
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
