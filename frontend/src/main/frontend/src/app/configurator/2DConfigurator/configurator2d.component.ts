import {Component, OnInit, EventEmitter, HostListener, ElementRef, ViewChild, Renderer, OnDestroy} from "@angular/core";
import {IConfigurator} from "../configurator.model";
import {ModelConfig} from "../../models/modelConfig";
import {map} from "rxjs/operator/map";
import {Config2d, Configurator2dService} from "./configurator2d.service";
@Component({
  selector: 'configurator-2d',
  templateUrl: './configurator2d.component.html',
  styleUrls:['./configurator2d.component.css'],
})

export class Configurator2DComponent implements IConfigurator, OnInit, OnDestroy  {



  getModelConfig() {
  }
  private conf2d : Config2d;

 //public currentPositions = {'top' : this.topPos + 'px', 'left' : this.leftPos  + 'px' };
  mousedrag ;
  //changePos  = new EventEmitter();
  mouseup  = new EventEmitter();
  mousedown = new EventEmitter();
  mousemove = new EventEmitter();
  @ViewChild('elVarRef') el:ElementRef;


  @HostListener('document:mouseup', ['$event'])
  onMouseup(event: MouseEvent) {
    this.mouseup.emit(event);
    //console.log(event);
  }
 /* @HostListener('click', ['$event'])
  onClick(event) {
  console.log("Event Target" + event.target);
  this.changePos.emit(event);
  }*/


  @HostListener('mousedown', ['$event'])
  onMousedown(event: MouseEvent) {
    this.mousedown.emit(event);
    //console.log(event);
    return false; // Call preventDefault() on the event
  }

   @HostListener('document:mousemove', ['$event'])
   onMousemove(event: MouseEvent) {
     this.mousemove.emit(event);
     //console.log(event);
   }

  selectMaterial(material: any) {
  }

  changeImage(src: string) {
    console.log('Method not implemented.');
  }

  resetModel() {
    console.log('Method not implemented.');
  }

  setColor(r: string, g: string, b: string) {
    console.log('Method not implemented.');
  }

  imageUploaded(data: { src: string; pending: boolean; file: any; }) {
    console.log('Method not implemented.');
  }

  save(modelConfig: ModelConfig) {
    console.log('Method not implemented.');
  }

   ngOnInit(): void {
     console.log('INIT');
     this.mousedrag.subscribe({
       next: pos => {
         this.el.nativeElement.style.top = pos.top + 'px';
         this.el.nativeElement.style.left = pos.left + 'px';
         this.conf2d.topPos = pos.top;
         this.conf2d.leftPos = pos.left;
        }
     });
   }

   constructor(private elementRef: ElementRef, private renderer: Renderer, private config2dService: Configurator2dService) {
    // this.elementRef.nativeElement.style.position = 'relative';
     //this.setImgPosition(this.topPos, this.leftPos);
    this.conf2d = this.config2dService.getLocalConfig();          // load from service
     this.elementRef.nativeElement.style.cursor = 'pointer';

     map;
     this.mousedrag = this.mousedown.map((event: MouseEvent) =>{
       event.preventDefault();
       return {
         left: event.clientX - this.elementRef.nativeElement.getBoundingClientRect().left,
         top: event.clientY - this.elementRef.nativeElement.getBoundingClientRect().top
       };
     })
       .flatMap(imageOffset => this.mousemove.map((pos : any) => ({
         top:  pos.clientY - imageOffset.top,
         left: pos.clientX - imageOffset.left
       }))
         .takeUntil(this.mouseup));
   }

   centerF(){ //save coordinates
    // this.setImgPosition(0, 0);
     this.config2dService.saveLocalConfig(this.conf2d);
     //console.log(this.topPos + "left" + this.leftPos);
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
