import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-usersupdate',
  templateUrl: './usersupdate.component.html',
  styleUrls: ['./usersupdate.component.scss']
})
export class UsersupdateComponent implements OnInit {

  currentUser: User = new User('','','','',0,0,[]);

  submitted = false;
  isuser = false;
  ismanager = false;
  isadmin = false;
  message = '';
  caloriesPattern = /^[1-9][0-9]{1,5}$/;

  selectedFiles?: FileList;
  currentFile?: File;
  fileValue:any= "assets/images/faces/face1.jpg";
  uploadProgressValue:number = 0;

  constructor(private userService: UserService, private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.message = '';
    this.getUser(this.route.snapshot.params.id);
  }

  updateUser(): void {
    this.currentUser.roles = this.formatUserRoles();
    this.userService.update(this.currentUser.id, this.currentUser)
      .subscribe(
        response => {
          console.log(response);
          this.submitted = true;
          this.router.navigate(['/users']);
        },
        error => {
          console.log(error);
        });
  }

  formatUserRoles():any[] {
    let roles = [];
    if(this.isuser) roles.push('user');
    if(this.ismanager) roles.push('manager');
    if(this.isadmin) roles.push('admin');
    return roles;
  }

  getUser(id: string): void {
    this.userService.get(id)
      .subscribe(
        data => {
          this.currentUser = data;
          if(!this.currentUser.fileUrl) this.currentUser.fileUrl = this.fileValue;
          console.log(data);
          console.log(this.userService);
          this.currentUser.roles.forEach(role => {
            if(role.name == "admin") this.isadmin = true;
            if(role.name == "manager") this.ismanager = true;
            if(role.name == "user") this.isuser = true;
          });
          console.log(data);
          console.log(this.currentUser);
        },
        error => {
          console.log(error);
        });
  }

  selectFile(event: any): void {
    if (event.target.files && event.target.files[0]) {
    this.selectedFiles = event.target.files;
    this.fileValue = URL.createObjectURL(this.selectedFiles.item(0));
    }
     if (event.target.files && event.target.files[0]) {
       this.currentFile = event.target.files[0];
       this.currentUser.file = this.currentFile;
       const reader = new FileReader();
       reader.onload = e => this.currentUser.fileUrl = reader.result;
       reader.readAsDataURL(this.currentFile);
       this.updateUserImage();
   }
   }

   updateUserImage(): void {
   this.userService.updateUserImage(this.currentUser.id, this.currentFile)
      .subscribe(
        response => {
          console.log(response);
          this.uploadProgressValue += 20;
          if(response.body){
            if(response.status == 200){
              this.message = response.body.message;
              console.log(this.message);
              //this.router.navigate(['/meals']);
              setTimeout(() => {
                this.uploadProgressValue = 0;
              }, 1000);
            }else{
              this.message = response.body.message;
            }
          }
        },
        error => {
          console.log(error);
        });
  }
}


