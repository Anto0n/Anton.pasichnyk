/**
 * Created by Anton on 18-Apr-17.
 */
import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'configurator',
  //templateUrl: './libs/webplayer.html?load=cotton_express.json'
  templateUrl:'./configurator.component.html',
  //templateUrl: `<iframe width="800" height="500" [src]="url" ></iframe>`
   styleUrls: ['./libs/webplayer.min.css']
})
export class ConfiguratorComponent {
   private URLwebplayer = require("./libs/webplayer.html");
   private URLjson = require("./libs/cotton_express.json");
   //private URLload = require("?load=");
  private URLall = require("./libs/webplayer.html?load=cotton_express.json");

  url: SafeResourceUrl;

  constructor(sanitizer: DomSanitizer) {
    this.url = sanitizer.bypassSecurityTrustResourceUrl("./src/app/configurator/libs/webplayer.html");

  }


 /* public url:SafeResourceUrl;
  constructor(private sanitizer:DomSanitizer) {
    this.url = sanitizer.bypassSecurityTrustResourceUrl('http://plnkr.co/img/plunker.png');
  }*/
}
