import { NgModule }     from '@angular/core';
import {  RouterModule, Routes} from '@angular/router';
import {HomeComponent} from "../content/home/home.component";
import {ProductsComponent} from "../content/products/products.component";
import {OrdersComponent} from "../content/orders/orders.component";
import {FAQsComponent} from "../content/FAQs/faqs.component";
import {ContactComponent} from "../content/contact/contact.component";
import {TestComponent} from "../content/test/test.component";
import {PageNotFoundComponent} from "app/routing/not-found.component";
import {TestformComponent} from "../content/testform/testform.component";
import {LoginComponent} from "../shared/login/login.component";
import {UserCreateComponent} from "../shared/register/user-create.component";
import {AuthGuard} from "../shared/guards/auth.guard";
import {AdminComponent} from "../content/admin/admin/admin.component";
import {ModeratorComponent} from "../content/moderator/moderator.component";
import {FactoryComponent} from "../content/factory/factory.component";
import {CreateNewsComponent} from "../content/admin/editnews/edit-news.component";
import {AdminGuard} from "../shared/guards/admin.guard";
import {CardViewComponent} from "../content/orders/card-view.component";
import {FactoryGuard} from "../shared/guards/factory.guard";
import {ModeratorGuard} from "../shared/guards/moderator.guard";
import {EditUsersComponent} from "../content/admin/edituser/editusers/editusers.component";


const appRoutes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'products', component: ProductsComponent},
  {path: 'orders', component: OrdersComponent, canActivate: [AuthGuard]},
  {path: 'faqs', component: FAQsComponent},
  {path: 'contact', component: ContactComponent},
  {path: 'configurator', component: TestComponent},
  {path: 'login', component: LoginComponent },
  {path: 'register', component: UserCreateComponent },
  {path: 'testform', component: TestformComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]},
  {path: 'admin', pathMatch: 'full',component: AdminComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]},
  {path: 'moderator',pathMatch: 'full', component: ModeratorComponent, canActivate: [ModeratorGuard], canLoad: [ModeratorGuard]},
  {path: 'factory',pathMatch: 'full', component: FactoryComponent, canActivate: [FactoryGuard], canLoad: [FactoryGuard]},
  {path: 'editnews', component: CreateNewsComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]},
  {path: 'editusers/:id', component: EditUsersComponent, canActivate: [AdminGuard], canLoad: [AdminGuard]},
  {path: 'cardview', component: CardViewComponent, canActivate: [AuthGuard]},
  {path: '',   redirectTo: '/home', pathMatch: 'full' },
  {path: '**', component: PageNotFoundComponent }
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




