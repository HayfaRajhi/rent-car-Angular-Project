import { Component, EventEmitter, Inject, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})
export class ConfirmationDialogComponent {


    @Output() confirmed = new EventEmitter<boolean>();

    confirm() {
      this.confirmed.emit(true);
      console.log('hey')
    }
  
    closeModal() {
      this.confirmed.emit(false);
      console.log('heyd')
    }
  }

