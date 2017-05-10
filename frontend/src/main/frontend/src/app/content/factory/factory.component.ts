import { Component, OnInit } from '@angular/core';
import {IModel, ModelStatus} from "../../models/model";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";

@Component({
  selector: 'app-manager',
  templateUrl: './factory.component.html',
  styles: []
})
export class FactoryComponent implements OnInit {
  private uModels: IModel[] = [];
  private selectedModel:IModel;
  private approved : string;

  constructor(private restService: RestService, private roleService: UserRoleService,) { }

  ngOnInit() {
    this.getModelsByApproved(ModelStatus.APPROVED);
  }


  getModelsByApproved(mStatus : ModelStatus) {
    this.approved = ModelStatus[mStatus];     // !!! Trick with enum
    this.restService.getData(`./api/models/list/${this.approved}`)
      .subscribe((data: IModel[]) => {
        this.uModels = data;
      }, () => console.log('err'));
  }

}
