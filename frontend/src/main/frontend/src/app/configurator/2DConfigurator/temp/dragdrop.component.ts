import { Component, ViewChild, ElementRef, Renderer, OnInit } from '@angular/core';



@Component({
  selector: 'drag-drop',
  template: `
        <h1>Drag 'n Drop</h1>
        <div #container 
             class="container"
             (mousemove)="onMouseMove($event)" [ngStyle]="{'width' : containerSize + 'px', 'height' : containerSize + 'px'}">
           
            <div #draggable 
                 class="draggable"
                 (mousedown)="onMouseButton($event)"
                 (mouseup)="onMouseButton($event)"
                 [ngStyle]="{'height' : draggableHeight + 'px', 'left' : draggableWidth  + 'px'}">
            </div>
        </div>`,
  styles: [`
        .container {           
            background-color: LightGray;
        }
        .draggable {            
            background-color: Green;
            height: 50px;
            width: 100px;
            position: absolute;
            cursor: move;
        }
    `]
})

export class DragDropComponent implements OnInit {
  containerSize: number = 320;
  draggableHeight: number = 50;
  draggableWidth: number = 100;

  @ViewChild('container') private containerElement: ElementRef;
  @ViewChild('draggable') private draggableElement: ElementRef;

  private boundary: any = {};
  private draggable: any;
  private isMouseDown = false;

  constructor(private renderer: Renderer) {}

  ngOnInit() {
    this.draggable = this.draggableElement.nativeElement;

    const container = this.containerElement.nativeElement;
    this.boundary = {
      left : container.offsetLeft + (this.draggableWidth / 2),
      right : container.clientWidth + container.offsetLeft - (this.draggableWidth / 2),
      top : container.offsetTop + (this.draggableHeight / 2),
      bottom : container.clientWidth + container.offsetTop - (this.draggableHeight / 2),
    }
  }

  private onMouseButton(event: MouseEvent): void {
    this.isMouseDown = event.buttons === 1;
  }

  private onMouseMove(event: MouseEvent): void {
    if (this.isMouseDown && this.isInsideBoundary(event)) {
      this.renderer.setElementStyle(this.draggable, 'left', event.clientX - (this.draggableWidth / 2) + "px");
      this.renderer.setElementStyle(this.draggable, 'top', event.clientY - (this.draggableHeight / 2) + "px");
    }
  }

  private isInsideBoundary(event: MouseEvent) {
    return event.clientX > this.boundary.left &&
      event.clientX < this.boundary.right &&
      event.clientY > this.boundary.top &&
      event.clientY < this.boundary.bottom;
  }
}
