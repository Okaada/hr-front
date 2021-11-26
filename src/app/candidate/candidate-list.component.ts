import { DataSource } from '@angular/cdk/collections';
import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSidenav } from '@angular/material/sidenav';
import { MatSort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddCandidateDialogComponent } from './dialogs/add-candidate/add.dialog.component';
import { DeleteCandidateDialogComponent } from './dialogs/delete-candidate/delete.dialog.component';
import { EditCandidateDialogComponent } from './dialogs/edit-candidate/edit.dialog.component';
import { CandidateModel } from './models/CandidateModel';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidateListComponent implements OnInit {
  displayedColumns = ['id', 'nome', 'CEP', 'city', 'email', 'endereco', 'telefone', 'actions'];
  exampleDatabase?: DataService | null;
  dataSource?: any;
  index?: number;
  id?: string;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  result: any;

  constructor(
    public httpClient: HttpClient,
    public dialogService: MatDialog,
    public dataService: DataService
  ) { }

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
    const dialogRef = this.dialogService.open(AddCandidateDialogComponent, {
      data: { },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // this.dataService.getCandidatesById()
        this.refreshTable();
      }
    });
  }

  startEdit(
    i: number,
    id: string,
    name: string,
    adress: string,
    cep: string,
    city: string,
    email: string,
    phone: string,
  ) {
    this.id = id;
    this.index = i;
    const dialogRef = this.dialogService.open(EditCandidateDialogComponent, {
      data: {
        id: id,
        name: name,
        adress: adress,
        cep: cep,
        phone: phone,
        city: city,
        email: email,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        if (this.exampleDatabase) {
          const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
            (x) => x.id === this.id
          );
          if (foundIndex)
            //this.exampleDatabase.dataChange.value[foundIndex] =
            //this.dataService.getDialogData();
            this.refreshTable();
        }
      }
    });
  }

  deleteItem(i: number, id: string, name: string) {
    this.index = i;
    this.id = id;
    const dialogRef = this.dialogService.open(DeleteCandidateDialogComponent, {
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
    this.dataSource = this.dataService.getCandidates().subscribe(result => {
      this.result = result;
    });
  }
}
