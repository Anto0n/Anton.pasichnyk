import {
  Component, OnInit, EventEmitter, HostListener, ElementRef, ViewChild, Renderer, OnDestroy, Input, Output,
} from "@angular/core";
import {IConfigurator} from "../configurator.model";
import {ModelConfig, Config2d, Config3d} from "../../models/modelConfig";
import {map} from "rxjs/operator/map";
import { Configurator2dService} from "../../services/configurator/configurator2d.service";
import {BagMaterial, BagType, IModel, CreateModel, ModelStatus, BagtypeConfig} from "../../models/model";
import {AlertService} from "../../services/alert.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {RestService} from "../../services/rest.service";
import {JsonConvert} from "json2typescript";
import {AuthenticationService} from "../../services/authentication.service";
import {debug} from "util";

@Component({
  selector: 'configurator-2d',
  templateUrl: './configurator2d.component.html',
  styleUrls:['./configurator2d.component.css'],
})

export class Configurator2DComponent implements IConfigurator, OnInit, OnDestroy  {
  activateViewDefaultMode() {
    throw new Error("Method not implemented.");
  }

  activateEditMode() {
  }
  @Input()
  inModelName : string;
  @Input()
  modelConfig : ModelConfig;
  @Output()
  onClearMname = new EventEmitter<string>();

   matUrl : string = "./materials/defMatTone.png";//= './materials/' + this.currentMaterial.image ;

  //private bags : BagType[] = [];
  @Input()
  currentBag : BagType ;
  @Input() set setMaterial(material : BagMaterial){
    if(material.image){
      console.log(material);
      this.matUrl =   './materials/' + material.image ;
      this.currentMaterial = material;
    }
  }
  private currentMaterial : BagMaterial ;

  @Input()
  viewMode : boolean = false;

  mousedrag ;
  changePos  = new EventEmitter();
  mouseup  = new EventEmitter();
  mousedown = new EventEmitter();
  mousemove = new EventEmitter();

  private boundary: any = {};
  private draggable: any;
  private isMouseDown = false;

  @ViewChild('elVarRef') el:ElementRef;
  //@ViewChild('container') private containerElement: ElementRef;


  @HostListener('mouseup', ['$event']) //'document:mouseup', ['$event']
  onMouseup(event: MouseEvent) {
    this.mouseup.emit(event);
    //console.log(event);
  }
  //
  // @HostListener('click', ['$event'])
  // onClick(event) {
  // this.changePos.emit(event);
  // }


  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    this.mousedown.emit(event);
    //console.log(event);
    return false; // Call preventDefault() on the event
  }

   @HostListener('mousemove', ['$event'])
   onMousemove(event: MouseEvent) {
     this.mousemove.emit(event);
   }

  ngOnInit(): void {
    if(!this.viewMode) {  // creation mode
      map;
      this.mousedrag = this.mousedown.map((event: MouseEvent) => {
        event.preventDefault();
        //event.stopPropagation();
        //if (this.isInsideBoundary(event))  // new boundaries
        return {
          left: event.clientX - this.elementRef.nativeElement.getBoundingClientRect().left / 500,
          top: event.clientY - this.elementRef.nativeElement.getBoundingClientRect().top / 500
        };
      })
        .flatMap(imageOffset => this.mousemove.map((pos: any) => ({
            top: pos.clientY - imageOffset.top,
            left: pos.clientX - imageOffset.left
          }
        ))
          .takeUntil(this.mouseup));

      this.mousedrag.subscribe({
        next: pos => {
          //this.el.nativeElement.style.top = pos.top + 'px';
          //this.el.nativeElement.style.left = pos.left + 'px';
          this.modelConfig.config2d.topPos = pos.top;
          this.modelConfig.config2d.leftPos = pos.left;
        }
      });
      this.modelConfig = this.config2dService.getLocalConfig();
      this.currentMaterial =  this.config2dService.getCurrentMaterial();
      this.currentBag =  this.config2dService.getCurrentBag();
      this.matUrl = this.config2dService.getMatUrl();
    } else { //view mode
      this.modelConfig = new ModelConfig();
      this.modelConfig.image = "./images/2dtest1.jpg";
      this.modelConfig.config2d = new Config2d();
    }

   // this.reloadBags(); // Retrive bag  // Retrive material
  }


  constructor(private elementRef: ElementRef, private renderer: Renderer, private config2dService: Configurator2dService,  private alertService : AlertService,
              private userRoleService : UserRoleService, private restService : RestService, private authService : AuthenticationService) {
    // this.elementRef.nativeElement.style.position = 'relative';
    //this.setImgPosition(this.topPos, this.leftPos);
    this.modelConfig = this.config2dService.getLocalConfig();          // load from service
    this.elementRef.nativeElement.style.cursor = 'pointer';
  }

  // private reloadBags(){
  //   this.restService.getData("./api/bag_type/list").subscribe( (data : BagType[]) =>  //get bags
  //     {this.bags = data
  //       if(!this.config2dService.containData()){                               // set new currentBag for first entrense
  //         let jStr : string  = JSON.parse(JSON.stringify( this.bags[0].script  ));
  //         //let obj : BagtypeConfig =  JsonConvert.deserializeString(jStr, BagtypeConfig);
  //         let obj : BagtypeConfig = JSON.parse(jStr);
  //         this.currentBag = this.bags[0];
  //         this.currentBag.script = obj;
  //         //this.modelConfig.config2d.bagtype = this.bags[0]; // re ini to default bag
  //         console.log( this.currentBag.script.imgsrc);
  //       } else{ //restore state
  //         //this.currentBag = this.modelConfig.config2d.bagtype;
  //         console.log("Reload bag - NOT");
  //       }
  //     }
  //   );
  // }


  changeImage(src: string) {
    console.log('Method not implemented.');
  }

  getModelConfig() {
  }

  resetModel() {
    this.config2dService.clearLocalConfig();
    this.modelConfig = this.config2dService.getLocalConfig();
    this.currentBag = new BagType();
    this.currentMaterial = new BagMaterial();
    this.matUrl = "";
    this.onClearMname.emit("");        // send clear Emit modelNameMessage to parrent configurator.component
  }

  setColor(r: string, g: string, b: string) {
    console.log('Method not implemented.');
  }

  imageUploaded(data: { src: string; pending: boolean; file: any; }) {
    let filePath : string = "./images/" +this.userRoleService.getUserId()+"/"+data.file.name;
    this.modelConfig.image = filePath; // rewrite user pick
  }

  save(inModelConfig: ModelConfig) { //create new Model
    if(!this.authService.isAuthenticated()){
     this.alertService.error("Login to save models!");
     return;
    }
    if(this.validateModelToStore(this.modelConfig.config2d)){
      this.modelConfig.config3d = new Config3d(); // store for 3D
      //this.modelConfig.config3d.material = this.currentMaterial;
      let createModelT : CreateModel = new CreateModel(ModelStatus.NEW, this.currentBag.id, this.currentMaterial.id,
        this.inModelName, +this.userRoleService.getUserId(), JSON.stringify(this.modelConfig), "");
      console.log(this.modelConfig);
      this.restService.postJsonResp('./api/models/create', createModelT).subscribe(
        (data: IModel[]) => {
          this.resetModel();
          this.alertService.success("model " + this.inModelName + " created");
        }, error => console.log(error));    } else{  }
    //check material, bagtype, name
   // console.log('Method not implemented.');
  }

  selectMaterial(material: BagMaterial) {
    this.currentMaterial = material;
    this.matUrl =  './materials/' + material.image ;
    console.log(" material name - " +  this.matUrl);
    this.alertService.clearMeessage();
  }

  selectBagType(bagtype : BagType){
    this.currentBag = bagtype;
    if (typeof bagtype.script=== "string" ){ // parse at first entranse
      let jStr : string  = JSON.parse(JSON.stringify( bagtype.script  ));   // json to obj
      this.currentBag.script  =  JSON.parse(jStr);
    } else{       // if it is already object
      this.currentBag.script = bagtype.script;
    }
    this.alertService.clearMeessage();
  }

    centerF(){
     this.modelConfig.config2d.leftPos =0;
     this.modelConfig.config2d.topPos =0;
   }

  plusWH(){
    this.modelConfig.config2d.width = this.modelConfig.config2d.width + 50;
    this.modelConfig.config2d.height = this.modelConfig.config2d.height + 50;
  }

  minusWH(){
    this.modelConfig.config2d.width = this.modelConfig.config2d.width - 50;
    this.modelConfig.config2d.height = this.modelConfig.config2d.height - 50;
  }



  private  validateModelToStore(localConf : Config2d) : boolean{
    if  (this.currentMaterial.id == null ){
      this.alertService.error("Select material!", false)
      return false;
    } else if
    (this.currentBag.id == null ){
      this.alertService.error("Select bagtype!", false)
      return false;
    }else if
    (this.inModelName == null || this.inModelName ==="" || this.inModelName ===" " ){
      this.alertService.error("set model name", false)
      return false;
    }
    this.alertService.clearMeessage();
    return true;
  }

  loadModel(model: IModel): void {
    console.log(' loadModel - Method not implemented.');
  }


  ngOnDestroy(): void {
    if(!this.viewMode) {  // creation mode
      this.config2dService.saveLocalConfig(this.modelConfig);
      this.config2dService.setCurrentBag(this.currentBag);
      this.config2dService.setCurrentMaterial(this.currentMaterial);
      this.config2dService.setMatUrl(this.matUrl);
    } else { // VIEW mode
    }
  }

 /*  private setImgPosition(top : number, left: number){
    this.topPos = top;
    this.leftPos = left;

   }*/
/*
   private isInsideBoundary(event: MouseEvent) {
   return event.clientX > this.boundary.left &&
   event.clientX < this.boundary.right &&
   event.clientY > this.boundary.top &&
   event.clientY < this.boundary.bottom;
   }*/
}

//http://lishman.io/angular-2-event-binding
// https://groups.google.com/forum/#!topic/angular/Ri_ZKuTPNfo            input
