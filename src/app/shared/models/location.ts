import { Customer } from "./customer";
import { Vehicle } from "./vehicle";

export interface RentalLocation {
    id: number; // Unique identifier for the location
    startDate: Date; // Date when the rental starts
    endDate: Date; // Date when the rental ends
    customer: Customer; // Details of the client associated with the rental
    vehicle: Vehicle; // Details of the vehicle rented
    guaranteeType: string; // Type of guarantee for the rental
    rentalFee: number; // Fees associated with the rental
    totalPrice: number;

  }