import {
  Component, OnChanges, OnInit, DoCheck,
} from '@angular/core';
import {AuthenticationService} from "./services/authentication.service";



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent implements  OnInit, DoCheck {

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


