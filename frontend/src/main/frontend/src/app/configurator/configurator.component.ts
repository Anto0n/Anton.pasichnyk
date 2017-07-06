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
  private modelPrice: number;

  @ViewChild('config')
  configurator: IConfigurator;

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

  //deprecated
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
    this.tempPanels[1]="bag_body_top";
    this.tempPanels[2]="bag_front";

    this.restService.getData("./api/material/list").subscribe((data:BagMaterial[]) => {
      this.materials = data;
      this.restService.getData("./api/bag_type/list").subscribe((bagTypes: BagType[]) => {
        this.begtypes = bagTypes;
        this.modelPrice=this.begtypes[0].price+data.find(p=>p.name=="jeans-blue").price;
        this.imageConfig = new ImageConfig();
        this.imageConfig.panels=this.begtypes[0].panels;
        this.imageConfig.image=new Array(this.begtypes[0].panels.length);

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

  // countPrice(materialOld, material:BagMaterial, panel: string){
  //   console.log("materialOld");
  //   console.log(materialOld);
  //   console.log(panel);
  //
  //   let other = this.tempPanels.filter(p=>p!==panel);
  //   let curr = this.tempPanels.find(p=>p===panel);
  //   console.log(other);
  //   console.log(curr);
  //
  //   let oldPrice = this.modelPrice;
  //   console.log(oldPrice);
  //   let panelsTotal = this.modelPrice-this.begtypes[0].price;
  //   console.log(panelsTotal);
  //   let oldPanelPrice = this.materials.find(p=>p.name===materialOld).price*0.6;
  //   console.log(oldPanelPrice);
  //
  //
  //   if(panel==="bag_body"){
  //     let newBodyPrice = material.price*0.6;
  //     console.log(newBodyPrice);
  //     let price = panelsTotal-oldPanelPrice+newBodyPrice;
  //     console.log(price);
  //     this.modelPrice = price+ this.begtypes[0].price;
  //   }else {
  //     console.log("NO BAG BODY");
  //     let newBodyPrice = material.price*0.2;
  //     // let oldBodyPrice = panelsTotal*0.6;
  //     let price = panelsTotal-oldPanelPrice*0.2+newBodyPrice;
  //     this.modelPrice = price+ this.begtypes[0].price;
  //   }
  //
  // }

  imageUploaded(data: { src: string, pending: boolean, file: { name: string, size: number, type: string } }) {
    this.configurator.imageUploaded(data);
    console.log(this.imageConfig);
    let indx = this.imageConfig.panels.findIndex(p=>p.name===this.selectedPanel.name);
    this.imageConfig.image[indx]=data.src;
    this.imageConfig.scale[indx]=5;
    this.imageConfig.posY[indx]=5;
    this.imageConfig.posX[indx]=5;
    this.showImageScalor = true;
    this.uploadedImage=data.src;

  }


  changeImageSize(value:number){
    let idx = this.imageConfig.panels.findIndex(p=>p.name===this.selectedPanel.name);
    this.imageConfig.scale[idx]=value;
    let x = this.imageConfig.posX[idx];
    let y = this.imageConfig.posY[idx];
    this.configurator.positionImage(value, x ,y, this.uploadedImage,this.selectedPanel);

  }
  changeImageX(value:number){
    let idx = this.imageConfig.panels.findIndex(p=>p.name===this.selectedPanel.name);
    this.imageConfig.posX[idx]=value;
    let scale = this.imageConfig.scale[idx];
    let y = this.imageConfig.posY[idx];
    this.configurator.positionImage(scale, value ,y, this.uploadedImage,this.selectedPanel);
  }
  changeImageY(value:number){
    let idx = this.imageConfig.panels.findIndex(p=>p.name===this.selectedPanel.name);
    this.imageConfig.posY[idx]=value;
    let x = this.imageConfig.posX[idx];
    let scale = this.imageConfig.scale[idx];
    this.configurator.positionImage(scale, x ,value, this.uploadedImage,this.selectedPanel);
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

  calculatePrice(material: BagMaterial, panel: string){

    let oldMaterialName= this.tempMaterials[this.tempPanels.findIndex(p=>p===this.selectedPanel.name)];
    this.tempMaterials[this.tempPanels.findIndex(p=>p===this.selectedPanel.name)]=material.name;
    let oldPrice= this.materials.find(m=>m.name===oldMaterialName).price;
    console.log(oldPrice);
    this.modelPrice =panel==="bag_body"?
      this.modelPrice-Math.round(oldPrice*0.6)+Math.round(0.6*this.materials.find(m=>m.name===material.name).price):
      this.modelPrice = this.modelPrice-Math.round(oldPrice*0.2)+Math.round(0.2*this.materials.find(m=>m.name===material.name).price);

  }

  selectMaterial(material: BagMaterial, panel?: string) {

    if(this.selectedPanel!=null){
      this.calculatePrice(material,panel);
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
      this.canUpload=pickedObject.name !== "bag_body";
    if(this.selectedPanel!==pickedObject){
      this.showImageScalor=false;
    }
    this.selectedPanel=pickedObject;
  }

  loadModel(model: IModel) {
    this.configurator.loadModel(model);
    this.selectedModel=model;
    this.selectedModel.config=JSON.parse(JSON.parse(JSON.stringify(model.config)));
  };

  onModelSelect(model: IModel){
    this.selectedModel=model;
  }

  resetPanel(panel:Panel){
    this.configurator.resetPanel(panel);
  }

}


export enum ConfiguratorType{
  D3 = 3,
  D2 = 2
}
