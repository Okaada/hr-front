import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { AddBenefitDialogComponent } from './dialogs/add/add.dialog.component';
import { DeleteBenefitDialogComponent } from './dialogs/delete/delete.dialog.component';
import { EditBenefitDialogComponent } from './dialogs/edit/edit.dialog.component';
import { BenefitService } from './services/benefit-service';

@Component({
  selector: 'app-benefit-list',
  templateUrl: './benefit-list.component.html',
  styleUrls: ['./benefit-list.component.css'],
})
export class BenefitListComponent implements OnInit {
  displayedColumns = ['id', 'nome', 'actions'];
  exampleDatabase?: BenefitService | null;
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
    public dataService: BenefitService
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
    const dialogRef = this.dialogService.open(AddBenefitDialogComponent, {
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
    id: number,
    name: string
  ) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialogService.open(EditBenefitDialogComponent, {
      data: {
        id: id,
        name: name
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  deleteItem(i: number, id: number, name: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialogService.open(DeleteBenefitDialogComponent, {
      data: { id: id, name: name },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.refreshTable();
      }
    });
  }

  private refreshTable() {
    this.loadData();
  }

  public loadData() {
    this.dataSource = this.dataService.getBenefits().subscribe((result) => {
      this.result = result;
    });
  }
}
