import {Component, OnInit, OnDestroy} from '@angular/core';
import {Subscription} from "rxjs";
import {RestService} from "../../../services/rest.service";
import {UserRoleService} from "../../../services/user/user-role.service";
import {AuthenticationService} from "../../../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styles: []
})
export class AdminComponent implements OnInit, OnDestroy {
  subscriptionAdmin: Subscription;
  private roleAdmin:boolean = false;

  constructor(private restService: RestService, private roleService: UserRoleService, private authService : AuthenticationService, private router: Router) {
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

  ngOnDestroy(): void {
    this.subscriptionAdmin.unsubscribe();
  }
}
