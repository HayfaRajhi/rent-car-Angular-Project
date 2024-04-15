import { Component, Inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VehicleService } from 'src/app/services/vehicule/vehicle.service';
import { Vehicle } from 'src/app/shared/models/vehicle';

@Component({
  selector: 'app-vehicles-edit',
  templateUrl: './vehicles-edit.component.html',
  styleUrls: ['./vehicles-edit.component.css']
})
export class VehiclesEditComponent {
  vehicle: Vehicle;



  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private vehicleService: VehicleService,
    @Inject("BaseURL") public baseURL
  ) { }


  idVehicle: any;
  ngOnInit(): void {
    //  this.getVehicleDetail();
    this.route.paramMap.subscribe(res => {
      this.idVehicle = parseInt(res.get("id"));
    });
    // this.customer=this.customerService.getCustomerById(this.idCustomer);
    if (!isNaN(this.idVehicle)) {

      this.vehicleService.getVehicleById(this.idVehicle).subscribe(vehicle => { this.vehicle = vehicle; })
      // this.customerService.getCustomerById(this.idCustomer).subscribe((cutomer)=>this.customer=cutomer);
    }
  }



  /* toggleEdit(): void {
     if (this.editing) {
       // Save changes
       // You can send updated data to the server here if needed
       this.vehicleService.updateVehicle(this.vehicle.id,this.VehicleForm.value)
         .subscribe((vehicle) => {
           this.editing = false;
             console.log({vehicle});
             console.log('Successfully updated new vehicle', vehicle);


           // Optionally, you can navigate to a different route or show a success message
         }, error => {
           console.error('Error updating vehicle:', error);
           // Optionally, you can display an error message to the user
         });
     } else {
       // Enable editing
       this.editing = true;
     }
   }*/


  getVehicleDetail(): void {
    /*  this.route.paramMap.subscribe(result =>{
        let id =parseInt(result.get('id'));
        this.vehicleService.getVehicleById(id)
       .subscribe(vehicle=> {this.vehicle=vehicle;})
      })
  */
    const id = this.route.snapshot.paramMap.get('id');
    this.vehicleService.getVehicleById(id)
        .subscribe(vehicle => this.vehicle = vehicle);
    console.log(this.vehicle)
    /*
      this.route.paramMap.subscribe(result =>{
        let id =parseInt(result.get('id'));
      });
      if (!isNaN(this.id)) {

       this.vehicleService.getVehicleById(this.id)
       .subscribe(vehicle=> {this.vehicle=vehicle;})
     }}*/
  }





  goBack(): void {
    this.router.navigate(['/vehicles']);
  }

  confirmDelete(): void {
    if (confirm('Are you sure you want to delete this vehicle?')) {
      this.vehicleService.deleteVehicle(this.vehicle.id)
        .subscribe(() => {
          // Optionally, you can navigate to a different route or show a success message
          this.router.navigate(['/vehicles']);
        });
    }
  }
}
