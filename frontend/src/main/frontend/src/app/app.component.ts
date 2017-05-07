import {
  Component, OnChanges, OnInit, SimpleChanges, EventEmitter, AfterContentInit, DoCheck, AfterContentChecked,
  AfterViewInit, AfterViewChecked, OnDestroy
} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";
import {MenuComponent} from "./menu/menu.component";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements  OnInit, DoCheck {

  ngDoCheck(): void {
    if (localStorage.getItem('currentUser')) {
      console.log("1");
      let user = localStorage.getItem('currentUser');
      // let role1: any = user[0];
      console.log(user);
      this.authService.roleEmiter.emit(user);
    } else {
      console.log("2");
      this.authService.roleEmiter.emit("Guest");
    }
  }

  constructor(private authService: AuthenticationService) {
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


