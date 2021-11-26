import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DataService} from '../../services/data.service';


@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete-candidate/delete.dialog.html',
  styleUrls: ['../../dialogs/delete-candidate/delete.dialog.css']
})
export class DeleteCandidateDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteCandidateDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DataService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteCandidate(this.data.id).subscribe();
  }
}
