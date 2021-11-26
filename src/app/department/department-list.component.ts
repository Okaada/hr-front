import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { AddDepartmentDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteDepartmentDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditDepartmentDialogComponent } from './dialogs/edit/edit.dialog.component';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.css'],
})
export class DepartmentListComponent implements OnInit {
  displayedColumns = ['id', 'employeeId', 'nome'];
  exampleDatabase?: DataService | null;
  index?: number;
  id?: number;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  result: any;
  dataSource?: any;

  constructor(
    public httpClient: HttpClient,
    public dialogService: MatDialog,
    public dataService: DataService
  ) {}

  @ViewChild('sidenav') sidenav?: MatSidenav;
  @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;

  ngOnInit() {
    this.loadData();
  }

  reload() {
    this.loadData();
  }

  mouseenter() {
    if (!this.isExpanded) {
      this.isShowing = true;
    }
  }

  mouseleave() {
    if (!this.isExpanded) {
      this.isShowing = false;
    }
  }

  openAddDialog() {
    const dialogRef = this.dialogService.open(AddDepartmentDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  startEdit(i: number, id: number, employeeId: string, name: string) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialogService.open(EditDepartmentDialogComponent, {
      data: {
        id: id,
        employeeId: employeeId,
        name: name,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        if (this.exampleDatabase) {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
            (x) => x.id === this.id
          );
          if (foundIndex) this.refreshTable();
        }
      }
    });
  }

  deleteItem(i: number, id: number, name: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialogService.open(DeleteDepartmentDialogComponent, {
      data: { id: id, name: name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.refreshTable();
    });
  }

  private refreshTable() {
    this.loadData();
  }

  public loadData() {
    this.dataSource = this.dataService.getDepartments().subscribe((result) => {
      this.result = result;
    });
  }
}
