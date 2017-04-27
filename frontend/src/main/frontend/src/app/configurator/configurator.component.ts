/**
 * Created by Anton on 18-Apr-17.
 */
import { Component } from '@angular/core';
import {RestService} from "../shared/services/rest.service";

@Component({
  selector: 'configurator',
  templateUrl:'./configurator.component.html'

})
export class ConfiguratorComponent {

  private URLcub = ('./assets/cub.html');
  private URLPlayerJson = ('./assets/libs/webplayer.html?load=cotton_express.json');//./assets/libs/webplayer.html?load=cotton_express.json
  private jsonString: any;
  constructor(private restService: RestService) { }

  getBag(){
    this.restService.getData('/bag_type/getJson/1')
      .subscribe((data: any) => {
        this.jsonString=data;
        console.log(data);
      }, ()=>console.log('err'));
  }

}
