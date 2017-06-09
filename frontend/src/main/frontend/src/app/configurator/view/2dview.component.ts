import {Component, OnInit, Input} from '@angular/core';
import {BagType, IModel, BagtypeConfig} from "../../models/model";
import {ModelConfig} from "../../models/modelConfig";

@Component({
  selector: 'app-view2d',
  templateUrl: './2dview.component.html',
  styleUrls: ['./2dview.component.css']
})
export class View2dComponent implements OnInit {
  @Input()  inBag : BagType;
  @Input()  inModel : IModel = new IModel();
  @Input() instr : string;
  private modelConfig : ModelConfig ;

  constructor() {
    this.inBag = new BagType();
    this.inBag.script = new BagtypeConfig();
    console.log("2dview INPUT");
    console.log(this.inBag);
    console.log(this.inModel);
    console.log(this.instr);
  }

  ngOnInit() {

  }

}
//https://stackoverflow.com/questions/41169281/angular-2-passing-data-to-child-component-after-parent-initialisation
