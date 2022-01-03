import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule, ThemeService } from 'ng2-charts';

import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodoComponent } from './apps/todo-list/todo/todo.component';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { ContentAnimateDirective } from './shared/directives/content-animate.directive';
import { TodoListComponent } from './apps/todo-list/todo-list.component';
import { LoginComponent } from './components/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { RegisterComponent } from './components/register/register.component';
import { MealslistComponent } from './components/meals/mealslist/mealslist.component';
import { MealsaddComponent } from './components/meals/mealsadd/mealsadd.component';
import { MealsupdateComponent } from './components/meals/mealsupdate/mealsupdate.component';
import { authInterceptorProviders } from './helpers/auth.interceptor';
import { MealsdetailComponent } from './components/meals/mealsdetail/mealsdetail.component';
import { UserslistComponent } from './components/users/userslist/userslist.component';
import { UsersupdateComponent } from './components/users/usersupdate/usersupdate.component';
import { UsersdetailsComponent } from './components/users/usersdetails/usersdetails.component';
import { AuthGuard } from './Guards/auth-guard.service';
import { ManagerGuard } from './Guards/manger-guard.service';
import { AdminGuard } from './Guards/admin-guard.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SidebarComponent,
    FooterComponent,
    DashboardComponent,
    TodoListComponent,
    TodoComponent,
    SpinnerComponent,
    ContentAnimateDirective,
    LoginComponent,
    RegisterComponent,
    MealslistComponent,
    MealsaddComponent,
    MealsupdateComponent,
    MealsdetailComponent,
    UserslistComponent,
    UsersupdateComponent,
    UsersdetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ChartsModule,
    HttpClientModule
    
  ],
  providers: [
    ThemeService,
    authInterceptorProviders,
    AuthGuard,
    ManagerGuard,
    AdminGuard,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
