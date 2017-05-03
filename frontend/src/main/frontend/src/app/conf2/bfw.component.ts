import { Component, OnInit } from '@angular/core';
import {SafePipe} from "../shared/safe.pipe.spec.";

@Component({
  selector: 'app-bfw',
  templateUrl: './bfw.component.html',
  styleUrls: ['./bfw.component.css']
})
export class BfwComponent implements OnInit {
  private  scriptUrl = this.safepipe.transformAll('./assets/libs/webplayer.min.js?v=17.02.1', 'script');
  constructor(private safepipe: SafePipe) { }

  ngOnInit() {
     //('./assets/libs/webplayer.min.js');
    //console.log( this.scriptUr);
  }

}
