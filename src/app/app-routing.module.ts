import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { MealsaddComponent } from './components/meals/mealsadd/mealsadd.component';
import { MealsdetailComponent } from './components/meals/mealsdetail/mealsdetail.component';
import { MealslistComponent } from './components/meals/mealslist/mealslist.component';
import { MealsupdateComponent } from './components/meals/mealsupdate/mealsupdate.component';
import { RegisterComponent } from './components/register/register.component';
import { UsersdetailsComponent } from './components/users/usersdetails/usersdetails.component';
import { UserslistComponent } from './components/users/userslist/userslist.component';
import { UsersupdateComponent } from './components/users/usersupdate/usersupdate.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminGuard } from './Guards/admin-guard.service';
import { AuthGuard } from './Guards/auth-guard.service';
import { ManagerGuard } from './Guards/manger-guard.service';


const routes: Routes = [
  { path: '', canActivate: [AuthGuard,ManagerGuard,AdminGuard], redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', canActivate: [AuthGuard,ManagerGuard,AdminGuard], component: DashboardComponent },
  { path: 'basic-ui', loadChildren: () => import('./basic-ui/basic-ui.module').then(m => m.BasicUiModule) },
  { path: 'charts', loadChildren: () => import('./charts/charts.module').then(m => m.ChartsDemoModule) },
  { path: 'forms', loadChildren: () => import('./forms/form.module').then(m => m.FormModule) },
  { path: 'tables', loadChildren: () => import('./tables/tables.module').then(m => m.TablesModule) },
  { path: 'icons', loadChildren: () => import('./icons/icons.module').then(m => m.IconsModule) },
  { path: 'general-pages', loadChildren: () => import('./general-pages/general-pages.module').then(m => m.GeneralPagesModule) },
  { path: 'apps', loadChildren: () => import('./apps/apps.module').then(m => m.AppsModule) },
  { path: 'user-pages', loadChildren: () => import('./user-pages/user-pages.module').then(m => m.UserPagesModule) },
  { path: 'error-pages', loadChildren: () => import('./error-pages/error-pages.module').then(m => m.ErrorPagesModule) },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'meals', canActivate: [AuthGuard], component: MealslistComponent },
  { path: 'meals/add', canActivate: [AuthGuard], component: MealsaddComponent },
  { path: 'meals/:id', canActivate: [AuthGuard], component: MealslistComponent },
  { path: 'meals/update/:id', canActivate: [AuthGuard], component: MealsupdateComponent },
  { path: 'meals/details/:id', canActivate: [AuthGuard], component: MealsdetailComponent },
  { path: 'users', canActivate: [AuthGuard,ManagerGuard], component: UserslistComponent },
  { path: 'users/:id', canActivate: [AuthGuard,ManagerGuard],component: UsersupdateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
