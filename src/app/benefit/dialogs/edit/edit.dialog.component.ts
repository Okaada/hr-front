import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { BenefitService } from '../../services/benefit-service';
import { FormControl, Validators } from '@angular/forms';
import { BenefitModel } from '../../models/benefit';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit/edit.dialog.html',
  styleUrls: ['../../dialogs/edit/edit.dialog.css'],
})
export class EditBenefitDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditBenefitDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BenefitModel,
    public dataService: BenefitService
  ) {}

  formControl = new FormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  submit() {
    // emppty stuff
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  stopEdit(id: any, data: any): void {
    this.dataService.updateBenefit(id, data).subscribe();
  }
}
