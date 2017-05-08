import {
  Component, OnChanges, OnInit, SimpleChanges, EventEmitter, AfterContentInit, DoCheck, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy
} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {MenuComponent} from "./menu/menu.component";
import {UserRoleService} from "./services/user-role.service";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements  OnInit, DoCheck {
  private  loadMenu :boolean = false;

  constructor(private authService: AuthenticationService) {
  }

 ngDoCheck(): void {
 }

  ngAfterContentInit() {
    // Component content has been initialized
  }


  ngOnInit(): void {
  }

  isAuth() {
    return this.authService.isAuthenticated();
  }

  onLogout() {
    this.authService.logout();
  }


}


