/**
 * Created by Anton on 18-Apr-17.
 */
import {Component, OnInit, ViewChild, Input} from '@angular/core';
import {RestService} from "../services/rest.service";
import {ModelConfig} from "../models/modelConfig";
import {IConfigurator} from "./configurator.model";
import {UserRoleService} from "../services/user/user-role.service";
import {BagMaterial, BagType, IModel} from "../models/model";
import {AuthenticationService} from "../services/authentication.service";
import {Configurator2dService} from "../services/configurator/configurator2d.service";
import {MaterialType} from "../models/material-type.model";
import {Panel} from "./3DConfigurator/panel.model";

@Component({
  selector: 'configurator',
  templateUrl: './configurator.component.html'
})
export class ConfiguratorComponent implements OnInit {
  private isEditMode: boolean = false;
  private modelName: string;
  private selectedPanel: Panel;


  @ViewChild('config')
  configurator: IConfigurator;

  private materialTypes: MaterialType[];
  materials: BagMaterial [] = [];
  begtypes: BagType[] = [];
  private defaultModels: IModel[];
  private modelId: number = 0;
  modelConfig: ModelConfig = null;
  outBag: BagType = new BagType(); // for view mode only
  outMaterial: BagMaterial = new BagMaterial(); // for view mode only


  functioninTypeScript(image:any) {
    console.log("image");
    console.log(image);
    console.log(this.imgForTest);
    image.src=this.imgForTest;
  }


  @Input()
  configuratorType: ConfiguratorType = ConfiguratorType.D3;

  @Input()
  viewMode: boolean = false;

  private imgForTest: string;

  @Input() set selectModelToConfig(model: IModel) { // for view mode only SELECT bagType, Material, and model config by click
    if (this.viewMode && model && model.id) {
      console.log(model.id);
      this.modelId = model.id;
      this.restService.getData(`./api/models/config/${model.id}`).subscribe((data: ModelConfig) => {
        this.configurator.loadModel(model);
        this.modelConfig = data;
      });
      this.restService.getData(`./api/bag_type/${model.bagTypeId}`).subscribe((data: BagType) => {
        this.outBag = data;
        let jStr: string = JSON.parse(JSON.stringify(data.script));
        this.outBag.script = JSON.parse(jStr);
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


  ngOnInit() {

    console.log("view mode - false");
    this.restService.getData("./api/material/list").subscribe(data => this.materials = data);
    this.restService.getData("./api/bag_type/list").subscribe(data => this.begtypes = data);
    this.restService.getData('./api/models/default').subscribe((data: IModel[]) => {
      this.defaultModels=data;

    });
    this.restService.getData("./api/material/types").subscribe((data: MaterialType[]) => this.materialTypes = data);

    this.restService.getDataAny("/api/material/base64/cotton_2048_blue_preview").subscribe((data: string) => {
      this.imgForTest = data;
      console.log(data)
    }, (data) => console.log("cant receive leather"));



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

  selectMaterial(material: BagMaterial, panel?: string) {
    let panelLocal=panel;
    if(this.selectedPanel!=null){
      panelLocal=this.selectedPanel.name;
      this.configurator.selectMaterial(material, panel);
     console.log("SELECTED PANLE NOT NULL");
    }else {
      console.log("SELECTED PANLE IS NULL");
      this.configurator.selectMaterial(material);
    }

  }

  // switchCreateView() {
  //   this.isEditMode = !this.isEditMode;
  //   this.restService.getData('./api/models/default').subscribe((data: IModel[]) => {
  //     this.defaultModels = data;
  //   });
  //   // document.getElementById("customizer").hidden = !this.isEditMode;
  //   document.getElementById("customizer2").hidden = !this.isEditMode;
  //   document.getElementById("model-selector").hidden = this.isEditMode;
  //
  // }
  switchCreateView() {
    this.isEditMode = !this.isEditMode;
    this.configurator.activateEditMode();
    // this.restService.getData('./api/models/default').subscribe((data: IModel[]) => {
    //   this.defaultModels = data;
    // });
    // document.getElementById("customizer").hidden = !this.isEditMode;
    document.getElementById("customizer2").hidden = !this.isEditMode;
    document.getElementById("model-selector").hidden = this.isEditMode;

  }

  handleSelectedPanelUpdated(pickedObject:any){
    console.log("PARENT COMPONENT GET: ")
    console.log(pickedObject);
    this.selectedPanel=pickedObject;
    console.log(this.selectedPanel);


  }
  loadModel(model: IModel) {
    this.configurator.loadModel(model);
  };
}


export enum ConfiguratorType{
  D3 = 3,
  D2 = 2
}
