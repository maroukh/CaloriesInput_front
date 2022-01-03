import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit{

  user: any = {
    email: '',
    password: ''
  };
  confirmpassword:string = "";
  termsok:boolean = false;
  errorMessage:string = "";

  constructor(private router:Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.isSignIn()) {
      console.log("user Already connected");
      this.router.navigate(['/dashboard']);
    }
  }

  onSubmit():void {
    console.log(this.user);
    console.log(this.confirmpassword);
    console.log(this.termsok);
    //After being register, the user must be signing up automatically and redirected to dashboard
    this.authService.register(this.user.username, this.user.email, this.user.password).subscribe(
      data => {
        console.log("Auth OK DATA: " + JSON.stringify(data));
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.router.navigate(["/meals"]);
      },
      err => {
        this.errorMessage = err.error.message;
      });
  }

}
