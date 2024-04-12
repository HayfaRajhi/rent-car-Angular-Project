import { Component } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
  isSidebarOpen: boolean = false;

  // Function to toggle the state of the sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
}

}