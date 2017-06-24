/**
 * Created by frontend on 6/24/17.
 */
import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[displayed-on-scene]'
})
export class SelectDirective{

  constructor(private elementRef: ElementRef){

    this.elementRef.nativeElement.style.font_color = "red";
  }
}
