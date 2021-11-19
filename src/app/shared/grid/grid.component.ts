import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { GridDisable } from './GridDisable';

@Component({
  selector: 'app-grid',
  templateUrl: './grid.component.html',
  styleUrls: ['./grid.component.css']
})
export class GridComponent implements OnInit {

  @Input() dados: any[] | undefined[]= [];
  @Input() colunas?: any[];
  @Input() headers?: any[];
  @Input() keys?: any[];
  @Input() numberOfElements?: number;
  @Input() currentPage: number = 1;
  @Input() eventPagination?: string;
  @Input() disabledOption: boolean = false;
  @Input() disabledEdit: GridDisable[] = [];
  @Input() disabledDelete: GridDisable[] = [];

  @Output() pageClicked = new EventEmitter<number>();
  @Output() keysClicked = new EventEmitter<any[]>();

  closeResult?: string;

  constructor(private modalService: NgbModal) { }

  ngOnInit(): void {
  }

  ngOnChanges() {
    this.setItemsProperties();
  }

  setItemsProperties(){
    if(this.dados){

      this.defaultProperties();
      this.disableEditProperties();
      this.disableDeleteProperties();
    }
  }

  defaultProperties(){
    let url = "";
    this.dados.forEach(item => {
      url = "./edit/";

      item["disabledEdit"] = false;
      item["toolTipEdit"] = "Edit item";
      item["disabledDelete"] = false;
      item["toolTipDelete"] = "Delete item";

      this.keys?.forEach(key => {
        url.substring(url.length - 1) == "/" ? url += item[key] : url += "/" + item[key];
      });

      item["url"] = url;
    });
  }

  disableEditProperties(){
    if (this.disabledEdit) {
      this.disabledEdit.forEach(el => {
        let items = this.dados.filter(x=> x[el.key] == el.value);
        items.forEach(item => {
          item["disabledEdit"] = true;
          item["toolTipEdit"] = el.toolTip;
        });
      });
    }
  }

  disableDeleteProperties(){
    if (this.disabledDelete) {
      this.disabledDelete.forEach(el => {
        let items = this.dados.filter(x=> x[el.key] == el.value);
        items.forEach(item => {
          item["disabledDelete"] = true;
          item["toolTipDelete"] = el.toolTip;
        });
      });
    }
  }

  clicked(page: any) {
    this.pageClicked.emit(page);
  }

  clickedKey(item: any) {
    let result: any[] = [];
    this.keys?.forEach(key => {
      result.push(item[key]);
    });
    this.keysClicked.emit(result);
    this.modalService.dismissAll();
  }

  open(content: any) {
    this.modalService.open(content).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

}
