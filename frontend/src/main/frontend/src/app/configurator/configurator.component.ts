/**
 * Created by Anton on 18-Apr-17.
 */
import {Component, OnInit, ViewChild} from '@angular/core';
import {RestService} from "../services/rest.service";
import {ModelConfig} from "../models/modelConfig";
import {IConfigurator} from "./configurator.model";

@Component({
  selector: 'configurator',
  templateUrl: './configurator.component.html',
  styleUrls: ['./configurator.component.css'],
})
export class ConfiguratorComponent{

  @ViewChild('config')
  configurator: IConfigurator;

  private is3D: boolean = false;

}
