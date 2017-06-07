import {
  Component, OnInit, EventEmitter, HostListener, ElementRef, ViewChild, Renderer, OnDestroy, Input, Output,
} from "@angular/core";
import {IConfigurator} from "../configurator.model";
import {ModelConfig, Config2d} from "../../models/modelConfig";
import {map} from "rxjs/operator/map";
import { Configurator2dService} from "../../services/configurator/configurator2d.service";
import {BagMaterial, BagType, IModel, CreateModel, ModelStatus} from "../../models/model";
import {AlertService} from "../../services/alert.service";
import {UserRoleService} from "../../services/user/user-role.service";
import {RestService} from "../../services/rest.service";
const containerSize: number = 320;

@Component({
  selector: 'configurator-2d',
  templateUrl: './configurator2d.component.html',
  styleUrls:['./configurator2d.component.css'],
})

export class Configurator2DComponent implements IConfigurator, OnInit, OnDestroy  {
  @Input() inModelName : string;
  private modelConfig : ModelConfig;

  @Output() onClearMname = new EventEmitter<string>();

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
     //console.log(event);
   }


  ngOnInit(): void {
    this.modelConfig = this.config2dService.getLocalConfig();
    this.mousedrag.subscribe({
      next: pos => {
        this.el.nativeElement.style.top = pos.top + 'px';
        this.el.nativeElement.style.left = pos.left + 'px';
        this.modelConfig.config2d.topPos = pos.top;
        this.modelConfig.config2d.leftPos = pos.left;
      }
    });
  /*  const container = this.containerElement.nativeElement; // new

    this.boundary = { //new
      left : container.offsetLeft + (this.conf2d.width / 2),
      right : container.clientWidth + container.offsetLeft - (this.conf2d.width / 2),
      top : container.offsetTop + (this.conf2d.height / 2),
      bottom : container.clientWidth + container.offsetTop - (this.conf2d.height / 2),
    }*/
  }


  constructor(private elementRef: ElementRef, private renderer: Renderer, private config2dService: Configurator2dService,  private alertService : AlertService,
              private userRoleService : UserRoleService, private restService : RestService  ) {
    // this.elementRef.nativeElement.style.position = 'relative';
    //this.setImgPosition(this.topPos, this.leftPos);
     this.modelConfig = this.config2dService.getLocalConfig();          // load from service
    this.elementRef.nativeElement.style.cursor = 'pointer';
    map;
      this.mousedrag = this.mousedown.map((event: MouseEvent) => {
        event.preventDefault();
        event.stopPropagation();
        //if (this.isInsideBoundary(event))  // new boundaries
          return {
          left: event.clientX - this.elementRef.nativeElement.getBoundingClientRect().left,
          top: event.clientY - this.elementRef.nativeElement.getBoundingClientRect().top
        };
      })
        .flatMap(imageOffset => this.mousemove.map((pos: any) => ({
          top: pos.clientY - imageOffset.top,
          left: pos.clientX - imageOffset.left
        }))
          .takeUntil(this.mouseup));
  }

  changeImage(src: string) {
    console.log('Method not implemented.');
  }

  getModelConfig() {
  }

  resetModel() {
    this.config2dService.clearLocalConfig();
    this.modelConfig = this.config2dService.getLocalConfig();
    this.onClearMname.emit("");        // send clear Emit modelNameMessage to parrent configurator.component
  }

  setColor(r: string, g: string, b: string) {
    console.log('Method not implemented.');
  }

  imageUploaded(data: { src: string; pending: boolean; file: any; }) {
    console.log('Method not implemented.');
  }

  save(inModelConfig: ModelConfig) { //create new Model
    if(this.validateModelToStore(this.modelConfig.config2d)){
      let createModelT : CreateModel = new CreateModel(ModelStatus.NEW, this.modelConfig.config2d.bagtype.id,this.modelConfig.config2d.material.id, this.inModelName, +this.userRoleService.getUserId(), JSON.stringify(this.modelConfig));
      console.log(this.modelConfig);
      this.restService.postJsonResp('./api/models/create', createModelT).subscribe(
        (data: IModel[]) => {
          this.alertService.success("model " + this.inModelName + " created");
        }, () => console.log('err'));    } else{  }
    //check material, bagtype, name
    console.log('Method not implemented.');
  }

  selectMaterial(material: BagMaterial) {
    console.log(" material name - " + material.name)
    this.modelConfig.config2d.material = material;
    this.alertService.clearMeessage();
  }

  selectBagType(bagtype : BagType){
    console.log("bagtype name - " + bagtype.name)
    this.modelConfig.config2d.bagtype = bagtype;
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
    if  (localConf.material == null ){
      this.alertService.error("Select material!", false)
      return false;
    } else if
    (localConf.bagtype == null ){
      this.alertService.error("Select bagtype!", false)
      return false;
    }else if
    (this.inModelName == null || this.inModelName ==="" ){
      this.alertService.error("set model name", false)
      return false;
    }
    this.alertService.clearMeessage();
    return true;
  }

  ngOnDestroy(): void {
    this.config2dService.saveLocalConfig(this.modelConfig);
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

/*
  - move user model
  - fix bagground movment model
  - read x y position, save position to config
  -
  */
//http://lishman.io/angular-2-event-binding
// https://groups.google.com/forum/#!topic/angular/Ri_ZKuTPNfo            input
