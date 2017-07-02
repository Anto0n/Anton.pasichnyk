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
import {ImageConfig} from "../models/image-config";

@Component({
  selector: 'configurator',
  templateUrl: './configurator.component.html'
})
export class ConfiguratorComponent implements OnInit {
  private isEditMode: boolean = false;
  private showImageScalor: boolean = false;
  private canUpload: boolean = false;
  private modelName: string;
  private selectedPanel: Panel;
  private selectedModel: IModel;
  private uploadedImage: string;
  private tempMaterials: string[] = [];
  private tempPanels: string[] = [];


  @ViewChild('config')
  configurator: IConfigurator;
  private modelPrice: number;
  private materialTypes: MaterialType[];
  materials: BagMaterial [] = [];
  begtypes: BagType[] = [];
  private defaultModels: IModel[];
  private modelId: number = 0;
  modelConfig: ModelConfig = null;
  imageConfig: ImageConfig = new ImageConfig();
  outBag: BagType = new BagType(); // for view mode only
  outMaterial: BagMaterial = new BagMaterial(); // for view mode only



  @Input()
  configuratorType: ConfiguratorType = ConfiguratorType.D3;

  @Input()
  viewMode: boolean = false;

  private imgForTest: string;

  @Input() set selectModelToConfig(model: IModel) { // for view mode only SELECT bagType, Material, and model config by click
    if (this.viewMode && model && model.id) {
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

    this.tempMaterials[0]="jeans-blue";
    this.tempMaterials[1]="jeans-blue";
    this.tempMaterials[2]="jeans-blue";
    this.tempPanels[0]="bag_body";
    this.tempPanels[1]="bag_body-top";
    this.tempPanels[2]="bag_front";

    this.restService.getData("./api/material/list").subscribe(data => {this.materials = data;
    console.log(data);
      this.restService.getData("./api/bag_type/list").subscribe((data: BagType[]) => {this.begtypes = data;
        this.modelPrice=this.begtypes[0].price+this.materials.find(p=>p.name==="jeans-blue").price;
        this.imageConfig = new ImageConfig();
        this.imageConfig.panels=this.begtypes[0].panels;
        this.imageConfig.image=new Array(this.begtypes[0].panels.length);
        // this.modelPrice=this.begtypes[0].price;
        // this.modelPrice=this.begtypes[0].price;

      });
    });

    this.restService.getData('./api/models/default').subscribe((data: IModel[]) => {
      this.defaultModels=data;

    });

    this.restService.getData("./api/material/types").subscribe((data: MaterialType[]) => this.materialTypes = data);

  }

  save(){
    this.configurator.save(this.modelConfig, this.imageConfig);
  }

  focusInput(){
    this.configurator.disableCamera();
  }
  focusOutInput(){
    this.configurator.enableCamera();
  }

  changeImage(){
    this.configurator.changeImage("asd");
  }

  countPrice(materialOld, material:BagMaterial, panel: string){
    console.log("materialOld");
    console.log(materialOld);
    console.log(panel);

    let other = this.tempPanels.filter(p=>p!==panel);
    let curr = this.tempPanels.find(p=>p===panel);
    console.log(other);
    console.log(curr);

    let oldPrice = this.modelPrice;
    console.log(oldPrice);
    let panelsTotal = this.modelPrice-this.begtypes[0].price;
    console.log(panelsTotal);
    let oldPanelPrice = this.materials.find(p=>p.name===materialOld).price*0.6;
    console.log(oldPanelPrice);


    if(panel==="bag_body"){
      let newBodyPrice = material.price*0.6;
      console.log(newBodyPrice);
      let price = panelsTotal-oldPanelPrice+newBodyPrice;
      console.log(price);
      this.modelPrice = price+ this.begtypes[0].price;
    }else {
      console.log("NO BAG BODY");
      let newBodyPrice = material.price*0.2;
      // let oldBodyPrice = panelsTotal*0.6;
      let price = panelsTotal-oldPanelPrice*0.2+newBodyPrice;
      this.modelPrice = price+ this.begtypes[0].price;
    }

  }

  imageUploaded(data: { src: string, pending: boolean, file: { name: string, size: number, type: string } }) {
    this.configurator.imageUploaded(data);
    console.log(this.imageConfig);
    let indx = this.imageConfig.panels.findIndex(p=>p.name===this.selectedPanel.name);
    this.imageConfig.image[indx]=data.src;
    this.showImageScalor = true;
    this.uploadedImage=data.src;

  }


  changeImageSize(value:number){
    this.imageConfig.scale[this.imageConfig.panels.findIndex(p=>p.name===this.selectedPanel.name)]=value;
    this.configurator.changeImageSize(value,this.uploadedImage,this.selectedPanel);
    console.log(value);
  }
  changeImageX(value:number){
    console.log(value);
  }
  changeImageY(value:number){
    console.log(value);
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
  imageRemoved(e:any){
    console.log(e);
    console.log("IMAGE REMOVED");
    console.log("IMAGE REMOVED");
  }
  resetModel(){
    this.configurator.stopAnimate();
    this.selectedPanel=null;
    this.canUpload=false;
    this.showImageScalor=false;
    this.configurator.resetModel();
  }
  onClearMname(newModelName: string) { //clear model name for both components
    this.modelName = newModelName;
  }

  selectMaterial(material: BagMaterial, panel?: string) {

    if(this.selectedPanel!=null){
      console.log("selectMaterial PARENT CONFIGURATOR");
      let tempMaterial = new BagMaterial();
      tempMaterial.id=material.id;
      tempMaterial.price=material.price;
      tempMaterial.image=material.image;
      tempMaterial.name=material.name;


      this.configurator.selectMaterial(tempMaterial, this.selectedPanel.name);
    }



  }

  onChangePrice(price: number){
    // this.modelPrice;
  }

  switchCreateView() {
    this.isEditMode = !this.isEditMode;
    this.showImageScalor=false;
    this.canUpload=false;
    document.getElementById("customizer2").hidden = !this.isEditMode;
    document.getElementById("model-selector").hidden = this.isEditMode;
    if(this.isEditMode){
      this.configurator.activateEditMode();
    }else {
      this.configurator.activateViewDefaultMode();
    }



  }

  handleSelectedPanelUpdated(pickedObject:any){
    if(pickedObject.name==="bag_body"){
      this.canUpload=false;
    }else {
      this.canUpload=true;
    }
    if(this.selectedPanel!==pickedObject){
      this.showImageScalor=false;
    }
    this.selectedPanel=pickedObject;
  }

  loadModel(model: IModel) {
    this.configurator.loadModel(model);
    this.selectedModel=model;
  };

  onModelSelect(model: IModel){
    this.selectedModel=model;
  }

}


export enum ConfiguratorType{
  D3 = 3,
  D2 = 2
}
