import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {BenefitService} from '../../services/benefit-service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteBenefitDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteBenefitDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: BenefitService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteBenefit(this.data.id).subscribe();
  }
}
