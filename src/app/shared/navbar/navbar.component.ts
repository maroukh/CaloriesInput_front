import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbDropdownConfig } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/models/user.model';
import { TokenStorageService } from 'src/app/services/token-storage.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  providers: [NgbDropdownConfig]
})
export class NavbarComponent implements OnInit {
  public iconOnlyToggled = false;
  public sidebarToggled = false;
  currentUser: any;
  

  constructor(config: NgbDropdownConfig, private tokenStorage: TokenStorageService, private router:Router) {
    config.placement = 'bottom-right';
  }

  ngOnInit() {
    this.currentUser = this.tokenStorage.getUser();
    if (!this.currentUser.fileUrl) this.currentUser.fileUrl = "assets/images/faces/face1.jpg";
  }
  isAdmin(){
    return this.currentUser.roles.includes('ROLE_ADMIN');
  }
  isManager(){
    return this.currentUser.roles.includes('ROLE_ADMIN')||this.currentUser.roles.includes('ROLE_MANAGER');
  }
  logout() {
    this.tokenStorage.signOut();
    this.router.navigate(['/login']);
  }

  // toggle sidebar in small devices
  toggleOffcanvas() {
    document.querySelector('.sidebar-offcanvas').classList.toggle('active');
  }

  // toggle sidebar
  toggleSidebar() {
    debugger;
    let body = document.querySelector('body');
    if ((!body.classList.contains('sidebar-toggle-display')) && (!body.classList.contains('sidebar-absolute'))) {
      this.iconOnlyToggled = !this.iconOnlyToggled;
      if (this.iconOnlyToggled) {
        body.classList.add('sidebar-icon-only');
        Array.from(document.getElementsByClassName('filterElem') as HTMLCollectionOf<HTMLElement>).forEach(elem=>{
          elem.style.visibility='hidden';
        });
      } else {
        body.classList.remove('sidebar-icon-only');
        Array.from(document.getElementsByClassName('filterElem') as HTMLCollectionOf<HTMLElement>).forEach(elem=>{
          elem.style.visibility='visible';
        });
      }
    } else {
      this.sidebarToggled = !this.sidebarToggled;
      if (this.sidebarToggled) {
        body.classList.add('sidebar-hidden');
        Array.from(document.getElementsByClassName('filterElem') as HTMLCollectionOf<HTMLElement>).forEach(elem=>{
          elem.style.visibility='visible';
        });
      } else {
        body.classList.remove('sidebar-hidden');
        Array.from(document.getElementsByClassName('filterElem') as HTMLCollectionOf<HTMLElement>).forEach(elem=>{
          elem.style.visibility='visible';
        });
      }
    }
  }

  // toggle right sidebar
  // toggleRightSidebar() {
  //   document.querySelector('#right-sidebar').classList.toggle('open');
  // }

}
