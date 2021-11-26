import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { DataService } from '../../services/data.service';
import { FormControl, Validators } from '@angular/forms';
import { CandidateModel } from '../../models/CandidateModel';

@Component({
  selector: 'app-add.dialog',
  templateUrl: '../../dialogs/add-candidate/add.dialog.html',
  styleUrls: ['../../dialogs/add-candidate/add.dialog.css'],
})
export class AddCandidateDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<AddCandidateDialogComponent>,
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

  public confirmAdd(data: any): void {
    this.dataService.addCandidate(data).subscribe();
  }
}
