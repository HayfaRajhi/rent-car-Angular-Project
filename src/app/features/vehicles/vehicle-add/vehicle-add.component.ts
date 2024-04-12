import { HttpEventType, HttpResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FileUploadService } from 'src/app/services/file-upload.service';
import { VehicleService } from 'src/app/services/vehicle.service';
import { Vehicle } from 'src/app/shared/models/vehicle';
@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit{

  //vehicleForm:FormGroup;
  vehicle:Vehicle= {
    id :null,
    registration: null,
    brand: null,
    model: null,
    //year: null,
    pricePerDay: null,
   // images: [],
   image:null,
    status: null,
    dateOfRegistration: null,
    color:null,
    type:null
  };
  selectedImages: File[] = [];
  imageUrls: string[] = []; // Array to store object URLs
  today: string;
  showConfirmationModal = false;
  carForm:FormGroup
     /* upload file*/
     selectedFiles?: FileList;
     currentFile?: File;
     progress = 0;
     message = '';
   

onVehicles() {
  this.router.navigateByUrl('/vehicles')
  }


   constructor(private formBuilder:FormBuilder,
              private router:Router,
              private vehicleService:VehicleService,
              private route:ActivatedRoute,
              private fileUploadService: FileUploadService,
     @Inject("BaseURL") public baseURL
  ) {
    const date = new Date();
    // Set today's date in the format "YYYY-MM-DD"
    this.today = date.toISOString().split('T')[0];
  }

  ngOnInit(): void {
  this.initializeForm();
  this.route.paramMap.subscribe(result=>{
    let id =result.get('id');
    console.log(id)

    if(id != "-1" )this.initVehicle(id);
    });
  }

  initVehicle(id){
    this.vehicleService.getVehicleById(id).subscribe(vehicle=>{
      this.vehicle=vehicle;
      console.log(vehicle)

      this.carForm.patchValue({
        registration: vehicle.registration,
        model: vehicle.model,
       // year:vehicle.year,
        pricePerDay: vehicle.pricePerDay ,// Assuming you want to update the price

        brand: vehicle.brand,
        status:vehicle.status,
        dateOfRegistration: vehicle.dateOfRegistration, // You can set the date value if needed
        color:vehicle.color,
        image:vehicle.image
       // images:vehicle.images.slice()
            });
    //  this.imageUrls = vehicle.images.slice(); // Use slice to create a new copy
      //console.log(this.imageUrls)
      console.log(this.vehicle);
    });
  }

  initializeForm():void{
      // Initialize the form with form controls and validation rules
      this.carForm =this.formBuilder.group({
        registration :['', Validators.required],
        model: ['', Validators.required], // New field: model
        status: ['', Validators.required] ,// New field: status
        color:['',Validators.required],
        brand: ['', Validators.required],
        dateOfRegistration: ['', Validators.required], // You can add additional validation for date if needed
        pricePerDay: ['', [Validators.required, Validators.min(0)]],
        //images: ['', Validators.required] // You can add custom validation for file upload
        type: ['', Validators.required],

      });

  }
  // Convenience getters for easy access to form controls
  get registration() { return this.carForm.get('registration'); }
  get brand() { return this.carForm.get('brand'); }
  get dateOfRegistration() { return this.carForm.get('dateOfRegistration'); }
  get pricePerDay() { return this.carForm.get('pricePerDay'); }
  get images() { return this.carForm.get('images'); }



  
  // Method to open the confirmation modal
  openConfirmationModal() {
    event.preventDefault(); // Prevent default form submission

    this.showConfirmationModal = true;
    console.log(this.showConfirmationModal)
  }

  // Method to handle confirmation result from the modal
  handleConfirmation(confirmed: boolean) {
    
    if (confirmed) {
      // Perform the action (e.g., add new vehicle)
      this.addNewVehicle();
      

    }
    // Close the modal regardless of confirmation result
    this.showConfirmationModal = false;
    console.log(this.showConfirmationModal)

  }

   // Method to handle form submission
   onSubmit() {
    // If form is valid, proceed with form submission
    /*if (this.carForm.valid) {
      
      // Perform submission logic here
      console.log('Form submitted successfully');
    } else {
      // Mark all fields as touched to display validation messages
      this.carForm.markAllAsTouched();
    }*/


    if (this.vehicle.id ==null){
      this.addNewVehicle();
    }
    else {
      this.updateVehicle();
    }
  }

  // Method to add new vehicle
  addNewVehicle() :void{
    this.vehicleService.createVehicle(this.carForm.value).subscribe(
      (vehicle:Vehicle) =>{
        this.upload(vehicle.id);

        console.log('Vehicle added successfully');
        this.router.navigate(['/vehicles/'+vehicle.id]);

      }
    )
  }


  updateVehicle():void{
    const formData = { ...this.carForm.value, images: this.imageUrls };

    this.vehicleService.updateVehicle(this.vehicle.id,formData)
    .subscribe(
      vehicle =>{
        console.log({vehicle});
        console.log('Successfully updated  vehicle', vehicle);
        this.router.navigate(['/vehicles/'+vehicle.id])

      }
    )
  }

  onSelectImages(event): void {
    // Extract the files from the event object
    const files: FileList = event.target.files;
    // Iterate over the files and push them to selectedImages array
    for (let i = 0; i < files.length; i++) {
      this.selectedImages.push(files[i]);
      this.imageUrls.push(this.createObjectURL(files[i])); // Generate object URL for each image

    }
    console.log(this.selectedImages)
    console.log("**********************"+this.selectedImages[0])
  }


  onAddMoreImages(): void {
    // Clear the file input after selecting files
    const fileInput = document.getElementById('image') as HTMLInputElement;
    fileInput.value = null;
  }


  onDeleteImage(index: number): void {
    this.selectedImages.splice(index, 1);
    this.imageUrls.splice(index, 1); // Remove object URL from array
  }
 // Function to generate object URL
  private createObjectURL(file: File): string {
  return window.URL.createObjectURL(file);
}
   /*upload file*/
   selectFile(event: any): void {
    this.selectedFiles = event.target.files;
  }

  upload(id: number): void {
    console.log("in the upload id is :" +id)
    this.progress = 0;

    if (this.selectedFiles) {
      const file: File | null = this.selectedFiles.item(0);

      if (file) {
        this.currentFile = file;

        this.fileUploadService.upload(this.currentFile,id,"Vehicle").subscribe({
          next: (event: any) => {  
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total); 
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              this.router.navigateByUrl('/vehicles/' +id);
            }
          },
          error: (err: any) => {
            console.log(err);
            this.progress = 0;

            if (err.error && err.error.message) {
              this.message = err.error.message;
            } else {
              this.message = 'Could not upload the file!';
            }

            this.currentFile = undefined;
          }
        });
      }

      this.selectedFiles = undefined;
    }
  }
}

