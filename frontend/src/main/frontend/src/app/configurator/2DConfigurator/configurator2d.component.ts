import {
  Component, OnInit, EventEmitter, HostListener, ElementRef, ViewChild, Renderer, OnDestroy,
  NgZone, Input
} from "@angular/core";
import {IConfigurator} from "../configurator.model";
import {ModelConfig} from "../../models/modelConfig";
import {map} from "rxjs/operator/map";
import {Config2d, Configurator2dService} from "./configurator2d.service";
import {BagMaterial, BagType} from "../../models/model";
const containerSize: number = 320;

@Component({
  selector: 'configurator-2d',
  templateUrl: './configurator2d.component.html',
  styleUrls:['./configurator2d.component.css'],
})

export class Configurator2DComponent implements IConfigurator, OnInit, OnDestroy  {

  modelName : string;
  private conf2d : Config2d;




 //public currentPositions = {'top' : this.topPos + 'px', 'left' : this.leftPos  + 'px' };
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

  @HostListener('click', ['$event'])
  onClick(event) {
  this.changePos.emit(event);
  }


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
    this.mousedrag.subscribe({
      next: pos => {
        this.el.nativeElement.style.top = pos.top + 'px';
        this.el.nativeElement.style.left = pos.left + 'px';
        this.conf2d.topPos = pos.top;
        this.conf2d.leftPos = pos.left;
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


  constructor(private elementRef: ElementRef, private renderer: Renderer, private config2dService: Configurator2dService) {
    // this.elementRef.nativeElement.style.position = 'relative';
    //this.setImgPosition(this.topPos, this.leftPos);
     this.conf2d = this.config2dService.getLocalConfig();          // load from service
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



/*
  private isInsideBoundary(event: MouseEvent) {
    return event.clientX > this.boundary.left &&
      event.clientX < this.boundary.right &&
      event.clientY > this.boundary.top &&
      event.clientY < this.boundary.bottom;
  }*/

  changeImage(src: string) {
    console.log('Method not implemented.');
  }

  getModelConfig() {
  }

  resetModel() {
    this.config2dService.clearLocalConfig();
    this.conf2d = this.config2dService.getLocalConfig()

  }

  setColor(r: string, g: string, b: string) {
    console.log('Method not implemented.');
  }

  imageUploaded(data: { src: string; pending: boolean; file: any; }) {
    console.log('Method not implemented.');
  }

  save(modelConfig: ModelConfig) {
    //check material, bagtype, name
    console.log('Method not implemented.');
  }

  selectMaterial(material: BagMaterial) {
    console.log("method not implemented. material name - " + material.name)
  }

  selectBagType(bagtype : BagType){
    console.log("method not implemented. bagtype name - " + bagtype.name)
  }

   centerF(){
     this.conf2d.leftPos =0;
     this.conf2d.topPos =0;
     console.log("modelname " + this.modelName);
   }

  plusWH(){
    this.conf2d.width = this.conf2d.width + 50;
    this.conf2d.height = this.conf2d.height + 50;
  }

  minusWH(){
    this.conf2d.width = this.conf2d.width - 50;
    this.conf2d.height = this.conf2d.height - 50;
  }


  ngOnDestroy(): void {
    this.config2dService.saveLocalConfig(this.conf2d);
  }

 /*  private setImgPosition(top : number, left: number){
    this.topPos = top;
    this.leftPos = left;

   }*/

}

/*
  - move user model
  - fix bagground movment model
  - read x y position, save position to config
  -
  */
//http://lishman.io/angular-2-event-binding
// https://groups.google.com/forum/#!topic/angular/Ri_ZKuTPNfo input
