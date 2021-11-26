import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { CandidateModel } from '../../models/CandidateModel';

@Component({
  selector: 'app-baza.dialog',
  templateUrl: '../../dialogs/edit-candidate/edit.dialog.html',
  styleUrls: ['../../dialogs/edit-candidate/edit.dialog.css'],
})
export class EditCandidateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<EditCandidateDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CandidateModel,
    public dataService: DataService
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
    console.log(id, data)
    this.dataService.updateCandidate(id, data).subscribe();
  }
}
