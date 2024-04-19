import {Component} from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import {AuthService} from './services/auth/auth.service';
import {StorageService} from './services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  public layoutOption: string;
  showHeader:boolean = true;
  showFooter:boolean = true;
  isAuth: boolean;
  private roles: string[] = [];
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  username?: string;

  constructor(private storageService: StorageService, private authService: AuthService, private router: Router) {

    // Removing Sidebar, Navbar, Footer for Documentation, Error and Auth pages
    router.events.forEach((event) => {
      if(event instanceof NavigationStart) {
        if(
          (event['url'] == '/signin') ||
          (event['url'] == '/general-pages/signup') ||
          (event['url'] == '/general-pages/page-404')
        ) {
          this.showHeader = false;
          this.showFooter = false;
        } else {
          this.showHeader = true;
          this.showFooter = true;
        }

        if(window.matchMedia('(max-width: 991px)').matches) {
          document.querySelector('body').classList.remove('az-header-menu-show');
        }
      }
    });
  }

  ngOnInit(): void {
    this.isLoggedIn = false;

    // navbar backdrop for mobile only
    const navbarBackdrop = document.createElement('div');
    navbarBackdrop.classList.add('az-navbar-backdrop');
    document.querySelector('body').appendChild(navbarBackdrop);

    if (this.isLoggedIn) {
      this.isAuth = true;
      // const user = this.storageService.getUser();
      // this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MODERATOR');

      //this.username = user.username;
    }
  }

  /*
  logout(): void {
    this.authService.logout().subscribe({
      next: res => {
        console.log(res);
        this.storageService.clean();

        window.location.reload();
      },
      error: err => {
        console.log(err);
      }
    });
  }*/


  /*ngOnInit(): void {
    console.log(this.isSidebarOpen)

      this.authService.authSubject.subscribe(
        (isAuth:boolean)=>{this.isAuth=isAuth;}

      */

  title = 'rent-car-project';
  isSidebarOpen = false;

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
    console.log(this.isSidebarOpen)
  }


}
