import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {RestService} from "../../../services/rest.service";
import {UserRoleService} from "../../../services/user/user-role.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";
import {IUser} from "../../../models/iuser.model";
import {AlertService} from "../../../services/alert.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {
  subscriptionAdmin: Subscription;
  private roleAdmin:boolean = false;

  showListUsers : boolean = false;
  private users : IUser[] = [];

  constructor(private restService: RestService, private roleService: UserRoleService, private authService : AuthenticationService,
              private router: Router, private alertService: AlertService) {

    this.subscriptionAdmin = this.authService.getAdminStatus().subscribe(
      roleAdmin => {this.roleAdmin = roleAdmin});

    if(this.roleService.isAdmin()){
      this.roleAdmin = true;
    }
  }

  ngOnInit() {
  }

  editNewsRedir(){
    this.router.navigate(['./editnews']);
  }

  listUsers(){
  this.restService.getData("./api/user/list").subscribe(
    (data : IUser[]) =>{
      this.users = data;
      this.showListUsers = true;
    }, error =>{
      this.alertService.error("error happened")
      console.log(error);
    }
  )

  }
  ngOnDestroy(): void {
    this.subscriptionAdmin.unsubscribe();
  }
}
