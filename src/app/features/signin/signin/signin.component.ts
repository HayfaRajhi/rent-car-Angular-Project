import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth/auth.service';
import { StorageService } from 'src/app/services/storage/storage.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

/*
Login Component also uses AuthService
to work with Observable object.
Besides that, it calls StorageService methods
to check loggedIn status and save User info
 to Session Storage.
*/
export class SigninComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];
  constructor(private authService: AuthService, private storageService: StorageService) { }
  ngOnInit(): void {
    if (this.storageService.isLoggedIn()) {
      this.isLoggedIn = true;
      this.roles = this.storageService.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.storageService.getUser().roles;
        this.reloadPage();
      },
      error: err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });
  }

  reloadPage(): void {
    window.location.reload();
  }




}
/*
  constructor(private authService: AuthService){}

   isAuth:boolean=false;

ngOnInit(): void {
      this.isAuth=this.authService.isAuth;
  }
  onSignIn():void{
   this.isAuth= this.authService.signIn();
  }
  onSignOut():void{
    this.isAuth=this.authService.signOut();
  }

}

*/
