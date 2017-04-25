/**
 * Created by Anton on 18-Apr-17.
 */
import { Component } from '@angular/core';
import { SafeResourceUrl, DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'configurator',
  templateUrl:'./configurator.component.html'

})

export class ConfiguratorComponent {
/*
  headers = new Headers({
    'Access-Control-Allow-Origin': '*',
    'X-Frame-Options': 'SAMEORIGIN'
  });
*/

  /*constructor(private configService: ConfigService){

  }*/

  private URLcub = ('./assets/cub.html');
  private URLPlayerJson = ('./assets/libs/webplayer.html?load=cotton_express.json');//./assets/libs/webplayer.html?load=cotton_express.json
  private URLPlayerTemp= ('./assets/libs/temp/webplayer.html?load=cotton_express.json');
  // declare Aclass
  load(){

  }




}
