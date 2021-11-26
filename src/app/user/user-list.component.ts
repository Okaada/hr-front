import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { AddUserDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteUserDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditUserDialogComponent } from './dialogs/edit/edit.dialog.component';
import { UserService } from './services/user.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  displayedColumns = ['id', 'email',];
  exampleDatabase?: UserService | null;
  index?: number;
  id?: string;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  result: any;
  dataSource?: any;

  constructor(
    public httpClient: HttpClient,
    public dialogService: MatDialog,
    public dataService: UserService
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
    const dialogRef = this.dialogService.open(AddUserDialogComponent, {
      data: {},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  startEdit(
    i: number,
    id: string,
    name: string
  ) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialogService.open(EditUserDialogComponent, {
      data: {
        id: id,
        name: name
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        if (this.exampleDatabase) {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
            (x) => x.id === this.id
          );
          if (foundIndex)
            this.refreshTable();
        }
      }
    });
  }

  deleteItem(i: number, id: string, name: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialogService.open(DeleteUserDialogComponent, {
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
    this.dataSource = this.dataService.getUsers().subscribe((result) => {
      this.result = result;
    });
  } 
}