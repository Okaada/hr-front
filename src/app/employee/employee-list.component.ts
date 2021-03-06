// import { DataSource } from '@angular/cdk/collections';
// import { HttpClient } from '@angular/common/http';
// import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { MatDialog } from '@angular/material/dialog';
// import { MatPaginator } from '@angular/material/paginator';
// import { MatSidenav } from '@angular/material/sidenav';
// import { MatSort } from '@angular/material/sort';
// import { ActivatedRoute, Router } from '@angular/router';
// import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
// import { map } from 'rxjs/operators';
// import { AddEmployeeDialogComponent } from './dialogs/add/add.dialog.component';
// import { DeleteEmployeeDialogComponent } from './dialogs/delete/delete.dialog.component';
// import { EditEmployeeDialogComponent } from './dialogs/edit/edit.dialog.component';
// import { Issue } from './models/EmployeeModel';
// import { DataService } from './services/data.service';

// @Component({
//   selector: 'app-employee-list',
//   templateUrl: './employee-list.component.html',
//   styleUrls: ['./employee-list.component.css'],
// })
// export class EmployeeListComponent implements OnInit {
//   displayedColumns = ['id', 'nome', 'area_interesse', 'telefone'];
//   exampleDatabase?: DataService | null;
//   dataSource?: ExampleDataSource | any;
//   index?: number;
//   id?: number;
//   isExpanded = true;
//   showSubmenu: boolean = false;
//   isShowing = false;
//   showSubSubMenu: boolean = false;

//   constructor(
//     public httpClient: HttpClient,
//     public dialogService: MatDialog,
//     public dataService: DataService
//   ) {}

//   @ViewChild('sidenav') sidenav?: MatSidenav;
//   @ViewChild(MatPaginator, { static: true }) paginator?: MatPaginator;
//   @ViewChild(MatSort, { static: true }) sort?: MatSort;
//   @ViewChild('filter', { static: true }) filter?: ElementRef;

//   ngOnInit() {
//     this.loadData();
//   }

//   reload() {
//     this.loadData();
//   }

//   mouseenter() {
//     if (!this.isExpanded) {
//       this.isShowing = true;
//     }
//   }

//   mouseleave() {
//     if (!this.isExpanded) {
//       this.isShowing = false;
//     }
//   }

//   openAddDialog() {
//     const dialogRef = this.dialogService.open(AddEmployeeDialogComponent, {
//       data: { issue: {} },
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result === 1) {
//         // After dialog is closed we're doing frontend updates
//         // For add we're just pushing a new row inside DataService
//         this.exampleDatabase?.dataChange.value.push(
//           this.dataService.getDialogData()
//         );
//         this.refreshTable();
//       }
//     });
//   }

//   startEdit(
//     i: number,
//     id: number,
//     nome: string,
//     area_interesse: string,
//     telefone: string
//   ) {
//     this.id = id;
//     // index row is used just for debugging proposes and can be removed
//     this.index = i;
//     console.log(this.index);
//     const dialogRef = this.dialogService.open(EditEmployeeDialogComponent, {
//       data: {
//         id: id,
//         nome: nome,
//         area_interesse: area_interesse,
//         telefone: telefone,
//       },
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result === 1) {
//         if (this.exampleDatabase) {
//           // When using an edit things are little different, firstly we find record inside DataService by id
//           const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
//             (x) => x.id === this.id
//           );
//           // Then you update that record using data from dialogData (values you enetered)
//           if (foundIndex)
//             this.exampleDatabase.dataChange.value[foundIndex] =
//               this.dataService.getDialogData();
//           // And lastly refresh table
//           this.refreshTable();
//         }
//       }
//     });
//   }

//   deleteItem(i: number, id: number, title: string, state: string, url: string) {
//     this.index = i;
//     this.id = id;
//     const dialogRef = this.dialogService.open(DeleteEmployeeDialogComponent, {
//       data: { id: id, title: title, state: state, url: url },
//     });

//     dialogRef.afterClosed().subscribe((result) => {
//       if (result === 1) {
//         if (this.exampleDatabase) {
//           const foundIndex = this.exampleDatabase.dataChange.value.findIndex(
//             (x) => x.id === this.id
//           );
//           // for delete we use splice in order to remove single object from DataService
//           this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
//           this.refreshTable();
//         }
//       }
//     });
//   }

//   private refreshTable() {
//     this.paginator?._changePageSize(this.paginator.pageSize);
//   }

//   public loadData() {
//     this.exampleDatabase = new DataService(this.httpClient);
    
//     if (this.paginator && this.sort)
//       this.dataSource = new ExampleDataSource(
//         this.exampleDatabase,
//         this.paginator,
//         this.sort
//       );
//     fromEvent(this.filter?.nativeElement, 'keyup')
//       // .debounceTime(150)
//       // .distinctUntilChanged()
//       .subscribe(() => {
//         if (!this.dataSource) {
//           return;
//         }
//         this.dataSource.filter = this.filter?.nativeElement.value;
//       });
//   }
// }

// //n??o ser?? mais necess??rio quando estiver consumindo backend
// export class ExampleDataSource extends DataSource<Issue> {
//   _filterChange = new BehaviorSubject('');

//   get filter(): string {
//     return this._filterChange.value;
//   }

//   set filter(filter: string) {
//     this._filterChange.next(filter);
//   }

//   filteredData: Issue[] = [];
//   renderedData: Issue[] = [];

//   constructor(
//     public _exampleDatabase: DataService,
//     public _paginator: MatPaginator,
//     public _sort: MatSort
//   ) {
//     super();
//     // Reset to the first page when the user changes the filter.
//     this._filterChange.subscribe(() => (this._paginator.pageIndex = 0));
//   }

//   /** Connect function called by the table to retrieve one stream containing the data to render. */
//   connect(): Observable<Issue[]> {
//     // Listen for any changes in the base data, sorting, filtering, or pagination
//     const displayDataChanges = [
//       this._exampleDatabase.dataChange,
//       this._sort.sortChange,
//       this._filterChange,
//       this._paginator.page,
//     ];

//     this._exampleDatabase.getAllIssues();

//     return merge(...displayDataChanges).pipe(
//       map(() => {
//         // Filter data
//         this.filteredData = this._exampleDatabase.data
//           .slice()
//           .filter((issue: Issue) => {
//             const searchStr = (
//               issue.id +
//               issue.nome +
//               issue.area_interesse +
//               issue.telefone
//             ).toLowerCase();
//             return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
//           });

//         // Sort filtered data
//         const sortedData = this.sortData(this.filteredData.slice());

//         // Grab the page's slice of the filtered sorted data.
//         const startIndex = this._paginator.pageIndex * this._paginator.pageSize;
//         this.renderedData = sortedData.splice(
//           startIndex,
//           this._paginator.pageSize
//         );
//         return this.renderedData;
//       })
//     );
//   }

//   disconnect() {}

//   /** Returns a sorted copy of the database data. */
//   sortData(data: Issue[]): Issue[] {
//     if (!this._sort.active || this._sort.direction === '') {
//       return data;
//     }

//     return data.sort((a, b) => {
//       let propertyA: number | string = '';
//       let propertyB: number | string = '';

//       switch (this._sort.active) {
//         case 'id':
//           [propertyA, propertyB] = [a.id, b.id];
//           break;
//         case 'nome':
//           [propertyA, propertyB] = [a.nome, b.nome];
//           break;
//         case 'area_interesse':
//           [propertyA, propertyB] = [a.area_interesse, b.area_interesse];
//           break;
//         case 'telefone':
//           [propertyA, propertyB] = [a.telefone, b.telefone];
//           break;
//       }

//       const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
//       const valueB = isNaN(+propertyB) ? propertyB : +propertyB;

//       return (
//         (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
//       );
//     });
//   }
// }
