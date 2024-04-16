import {Component, OnInit} from '@angular/core';
import {AuthService} from 'src/app/services/auth/auth.service';
import {StorageService} from 'src/app/services/storage/storage.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})

export class SigninComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };

  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private storageService: StorageService, private router: Router) {
  }

  ngOnInit(): void {
   
  }

  onSubmit(): void {
    const {username, password} = this.form;
    this.authService.login(username, password).subscribe({
      next: data => {
        this.storageService.setAuthToken(data.accessToken);
        this.storageService.setAuthUser(data.user);

        this.errorMessage = '';
        this.isLoginFailed = false;
        this.router.navigate(['/customers']);
      },
      error: ({error}) => {
        console.log('err !!!', error)
        this.errorMessage = error;
        this.isLoginFailed = true;
      }
    });
  }

}
