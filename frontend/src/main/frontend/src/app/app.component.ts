import {
  Component, OnChanges, OnInit, DoCheck, EventEmitter,
} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements  OnInit, DoCheck {
public logoutEmiter;
  constructor(private authService: AuthenticationService) {
    this.logoutEmiter = new EventEmitter<{ islogin: boolean }>();
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
    this.logoutEmiter.emit(false);
    this.authService.logout();
  }


}


