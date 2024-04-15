import {HttpEventType, HttpResponse} from '@angular/common/http';
import {Component, Inject, OnInit} from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {FileUploadService} from 'src/app/services/file-upload.service';
import {VehicleService} from 'src/app/services/vehicule/vehicle.service';
import {Vehicle} from 'src/app/shared/models/vehicle';

@Component({
  selector: 'app-vehicle-add',
  templateUrl: './vehicle-add.component.html',
  styleUrls: ['./vehicle-add.component.css']
})
export class VehicleAddComponent implements OnInit {

  id: string = null;

  //vehicleForm:FormGroup;
  vehicle: Vehicle = {
    id: null,
    registration: null,
    brand: null,
    model: null,
    //year: null,
    pricePerDay: null,
    // images: [],
    image: null,
    status: null,
    dateOfRegistration: null,
    color: null,
    type: null
  };
  selectedImages: File[] = [];
  imageUrls: string[] = []; // Array to store object URLs
  today: string;
  showConfirmationModal = false;
  carForm: FormGroup
  /* upload file*/
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';


  onVehicles() {
    this.router.navigateByUrl('/vehicles')
  }

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  constructor(
    private _formBuilder: FormBuilder,
    private formBuilder: FormBuilder,
    private router: Router,
    private vehicleService: VehicleService,
    private route: ActivatedRoute,
    private fileUploadService: FileUploadService,
    @Inject("BaseURL") public baseURL
  ) {
    const date = new Date();
    // Set today's date in the format "YYYY-MM-DD"
    this.today = date.toISOString().split('T')[0];
    this.route.paramMap.subscribe(result => {
      this.id = result.get('id');
      if (!this.id) {
        return
      }
      this.initVehicle();
    });
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initVehicle() {
    this.vehicleService
      .getVehicleById(this.id)
      .subscribe(vehicle => {
        this.carForm.patchValue({
          registration: vehicle.registration,
          model: vehicle.model,
          // year:vehicle.year,
          pricePerDay: vehicle.pricePerDay,// Assuming you want to update the price

          brand: vehicle.brand,
          status: vehicle.status,
          dateOfRegistration: vehicle.dateOfRegistration, // You can set the date value if needed
          color: vehicle.color,
          image: vehicle.image
          // images:vehicle.images.slice()
        });
      });
  }

  initializeForm(): void {
    // Initialize the form with form controls and validation rules
    this.carForm = this.formBuilder.group({
      registration: ['1212', Validators.required],
      model: ['Toyota', Validators.required], // New field: model
      status: ['Available', Validators.required],// New field: status
      color: ['red', Validators.required],
      brand: ['Toyota', Validators.required],
      dateOfRegistration: ['2024-04-24T23:00:00.000Z', Validators.required], // You can add additional validation for date if needed
      pricePerDay: ['234', [Validators.required, Validators.min(0)]],
      //images: ['', Validators.required] // You can add custom validation for file upload
      type: ['Luxury Cars', Validators.required],
    });

  }

  // Method to handle form submission
  onSubmit() {if (this.router.isActive('/vehicles/add', true)) {
      this.addNewVehicle();
    } else {
      this.updateVehicle();
    }
  }

  // Method to add new vehicle
  addNewVehicle(): void {
    this.vehicleService.createVehicle(this.carForm.value).subscribe(
      (vehicle: Vehicle) => {
        this.upload(vehicle.id);
        // this.router.navigate(['/vehicles/' + vehicle.id]);
      }
    )
  }

  updateVehicle(): void {
    const formData = {...this.carForm.value, images: this.imageUrls};
    this.vehicleService.updateVehicle(this.vehicle.id, formData)
      .subscribe(
        vehicle => {
          console.log({vehicle});
          console.log('Successfully updated  vehicle', vehicle);
          //this.router.navigate(['/vehicles/' + vehicle.id])

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
    console.log("**********************" + this.selectedImages[0])
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

  upload(id: number): void {
    console.log("in the upload id is :" + id)
    this.progress = 0;

    if (this.selectedImages.length) {
      const file: File | null = this.selectedImages[0];

      if (!!file) {
        this.currentFile = file;

        this.fileUploadService.upload(this.currentFile, id, "Vehicle").subscribe({
          next: (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progress = Math.round(100 * event.loaded / event.total);
            } else if (event instanceof HttpResponse) {
              this.message = event.body.message;
              //this.router.navigateByUrl('/vehicles/' + id);
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

