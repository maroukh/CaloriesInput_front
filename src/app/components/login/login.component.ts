import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: any = {
    email: '',
    password: ''
  };
  errorMessage:string;

  constructor(private router:Router,private authService: AuthService, private tokenStorage: TokenStorageService) { }

  ngOnInit(): void {
    if (this.tokenStorage.isSignIn()) {
      console.log("user Already connected");
      this.router.navigate(['/meals']);
    }
  }

  onSubmit():void {
    console.log(this.user);
    this.authService.login(this.user.email, this.user.password).subscribe(
      data => {
        console.log("Auth OK DATA: " + JSON.stringify(data));
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.router.navigate(["/meals"]);
      },
      err => {
        this.errorMessage = err.error.message;
      }
    );
  }
  

}
