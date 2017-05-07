import { NgModule }     from '@angular/core';
import {
  RouterModule, Routes,
} from '@angular/router';
import {HomeComponent} from "../content/home/home.component";
import {NewComponent} from "../content/new/new.component";
import {OrdersComponent} from "../content/orders/orders.component";
import {AboutComponent} from "../content/about/about.component";
import {HelpComponent} from "../content/help/help.component";
import {TestComponent} from "../content/test/test.component";
import {PageNotFoundComponent} from "app/routing/not-found.component";
import {TestformComponent} from "../content/testform/testform.component";
import {LoginComponent} from "../shared/login/login.component";
import {RegisterComponent} from "../shared/register/register.component";
import {UserCreateComponent} from "../shared/register/user-create.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {AdminComponent} from "../content/admin/admin/admin.component";
import {ModeratorComponent} from "../content/moderator/moderator.component";
import {FactoryComponent} from "../content/factory/factory.component";

/*import { ComposeMessageComponent } from './compose-message.component';
import { PageNotFoundComponent }   from './not-found.component';
import { CanDeactivateGuard }      from './can-deactivate-guard.service';
import { AuthGuard }               from './auth-guard.service';*/
//, canActivate: [AuthGuard]
const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'new', component: NewComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'help', component: HelpComponent},
  {path: 'test', component: TestComponent},
  { path: 'login', component: LoginComponent },
  { path: 'register', component: UserCreateComponent },
  {path: 'testform', component: TestformComponent},
  {path: 'admin', pathMatch: 'full',component: AdminComponent},
  {path: 'moderator',pathMatch: 'full', component: ModeratorComponent},
  {path: 'factory',pathMatch: 'full', component: FactoryComponent},
  { path: '',   redirectTo: '/home', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent }
  //{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
];
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes, { useHash: true }
    )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {}


/*
@NgModule({
  imports: [
    RouterModule.forRoot(
      appRoutes
    )
  ],
  exports: [
    RouterModule
  ],
  providers: [
    CanDeactivateGuard
  ]
})

 {
 path: 'compose',
 component: ComposeMessageComponent,
 outlet: 'popup'
 },
 {
 path: 'admin',
 loadChildren: 'app/admin/admin.module#AdminModule',
 canLoad: [AuthGuard]
 },
 {
 path: 'crisis-center',
 loadChildren: 'app/crisis-center/crisis-center.module#CrisisCenterModule'
 },
 { path: '',   redirectTo: '/heroes', pathMatch: 'full' },
 { path: '**', component: PageNotFoundComponent }


*/
// ActivatedRouteSnapshot

