import { Component, EventEmitter, Output, Renderer2 } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  isSidebarVisible = false;
  constructor(private renderer: Renderer2,
              private authService: AuthService

  ) { }

 /* toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    if (this.isSidebarVisible) {
      this.renderer.addClass(document.body, 'sidebar-open');
      console.log("work")
    } else {
      this.renderer.removeClass(document.body, 'sidebar-open');
    }
  }*/
  @Output() sidebarToggled = new EventEmitter<void>();

  toggleSidebar() {
    this.sidebarToggled.emit();
    console.log("xs")
  }
signOut() {
throw new Error('Method not implemented.');
}
  isAuth:boolean;
  ngOnInit(): void {
      /*this.authService.authSubject.subscribe(
        (isAuth:boolean)=>{this.isAuth=isAuth;}
              )*/
}

}