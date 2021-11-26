import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import {Component, Inject} from '@angular/core';
import {DepartmentService} from '../../services/department.service';

@Component({
  selector: 'app-delete.dialog',
  templateUrl: '../../dialogs/delete/delete.dialog.html',
  styleUrls: ['../../dialogs/delete/delete.dialog.css']
})
export class DeleteDepartmentDialogComponent {

  constructor(public dialogRef: MatDialogRef<DeleteDepartmentDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any, public dataService: DepartmentService) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmDelete(): void {
    this.dataService.deleteDepartment(this.data.id).subscribe();
  }
}
