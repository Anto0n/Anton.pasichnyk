import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {IUser, IRole} from "../../../../models/iuser.model";
import {RestService} from "../../../../services/rest.service";
import {AuthenticationService} from "../../../../services/authentication.service";
import {UserRoleService} from "../../../../services/user/user-role.service";
import {AlertService} from "../../../../services/alert.service";

@Component({
  selector: 'app-editusers',
  templateUrl: './editusers.component.html',
  styleUrls: ['./editusers.component.css']
})
export class EditUsersComponent implements OnInit, OnDestroy {
  private uid: number;
  private sub: any;
  private user: IUser;
  private roles: IRole[] = [];


  constructor(private restService: RestService, private roleService: UserRoleService, private authService: AuthenticationService,
              private route: ActivatedRoute, private alertService: AlertService) {
  }

  ngOnInit() {
    this.reloadUser();
    this.restService.getData("./api/user/roles").subscribe(//init user Role
      (data: IRole[]) => {
        this.roles = data;
      }, error => {
        console.log(error)
        this.alertService.error("init error");
      }
    )
  }

  changeRole(r : IRole){
    if(this.user.role.name ==="Administrator"){
      this.alertService.error("You cant edit administrator role!")
      return;
    }
    this.alertService.clearMeessage();
    this.restService.putData(`./api/admin/edituser`+`/${this.uid}`, r).subscribe(
      () => {
        this.alertService.success("new role: " + r.name);
      }, error => {
        console.log(error)
        this.alertService.error("role change error");
      }
    )
    this.reloadUser(); //reload esyr entity
  }


  private reloadUser(){
    this.sub = this.route.params.subscribe(params => {
      this.uid = +params['id']; // (+) converts string 'id' to a number
      this.restService.getData(`./api/user` + `/${this.uid}`).subscribe( // init user
        (data: IUser) => {
          this.user = data;
        }, error => {
          console.log(error)
          this.alertService.error("init error");
        }
      )
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }


}

/*
 https://angular-2-training-book.rangle.io/handout/routing/routeparams.html*/
