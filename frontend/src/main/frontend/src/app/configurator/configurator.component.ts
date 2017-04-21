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

  private URLcub = ('./assets/cub.html');
  private URLPlayer = ('./assets/libs/webplayer.html?load=cotton_express.json');//./assets/libs/webplayer.html?load=cotton_express.json


}
