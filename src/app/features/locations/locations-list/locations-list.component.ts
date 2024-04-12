import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-locations-list',
  templateUrl: './locations-list.component.html',
  styleUrls: ['./locations-list.component.css']
})
export class LocationsListComponent {

  constructor(private router :Router){}
onAdd() {
  this.router.navigateByUrl('/locations/edit/-1');

}

}
