import { Component, OnInit } from '@angular/core';
import {IModel, ModelStatus} from "../../models/model";
import {RestService} from "../../services/rest.service";
import {UserRoleService} from "../../services/user/user-role.service";

@Component({
  selector: 'app-moderator',
  templateUrl: './moderator.component.html',
  styles: []
})
export class ModeratorComponent implements OnInit {
  private uModels: IModel[] = [];
  private selectedModel:IModel;
  private approved : string;

  constructor(private restService: RestService, private roleService: UserRoleService,) { }

  ngOnInit() {
    this.getModelsByApproved(ModelStatus.NEW);
  }


  getModelsByApproved(mStatus : ModelStatus) {
    this.approved = ModelStatus[mStatus];     // !!! Trick with enum
    this.restService.getData(`./api/models/list/${this.approved}`)
      .subscribe((data: IModel[]) => {
        this.uModels = data;
      }, () => console.log('err'));
  }

  approveModel(model: IModel, mStatus : ModelStatus ){
    let id:number = model.id;
     let approved :string = ModelStatus[mStatus];
    this.restService.getData('./api/models/approve', `/${id}?approved=${approved}`)
      .subscribe(
        () => {
          this.uModels = this.uModels.filter(m => m !== model);
          if (this.selectedModel === model) {
            this.selectedModel = null;
          }
        }
      );
  }

}
