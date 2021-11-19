import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import { ActivatedRoute, Router } from '@angular/router';
import PagingQueryResult from 'src/app/shared/pagination/pagination.model';

@Component({
  selector: 'app-candidate-list',
  templateUrl: './candidate-list.component.html',
  styleUrls: ['./candidate-list.component.css'],
})
export class CandidateListComponent implements OnInit {
  @ViewChild('sidenav') sidenav?: MatSidenav;
  isExpanded = true;
  showSubmenu: boolean = false;
  isShowing = false;
  showSubSubMenu: boolean = false;
  pesq?: boolean;
  // candidateFilter: CandidateFilter;
  // candidate: Candidate;
  result: PagingQueryResult = new PagingQueryResult();
  currentPage?: number;
  numberOfElements?: number;
  candidateForm: FormGroup = this.formBuilder.group({
    id: [null],
    descricao: [null, Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.inicializarFormulario();
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
  
  inicializarFormulario(): void {
    this.pesq = false;
    this.currentPage = 1;
    this.numberOfElements = 0;

    this.candidateForm = this.formBuilder.group({
      descricao: [null],
    });
  }

  consultar(): void {
    this.pesq = true;
    // this.result.content = null;

    // this.acaoFiltro = {
    //   ...this.acaoFiltro,
    //   ...this.acaoForm.value
    // }

    // let filtro = new AcaoFiltro();
    // filtro = {
    //   ...filtro,
    //   ...this.acaoFiltro
    // }

    // let p = this.acaoService.consultar(filtro).subscribe(result => {
    //   this.result = result;
    //   this.numberOfElements = result.numberOfElements;
    // });
    // this.loader.Progress(p);
  }

  limpar(): void {
    this.pesq = false;
    // this.acaoForm.reset();
    // this.result = new PagingQueryResult();
  }

  deletar(id: any): void {
    if (id !== null) {
      // let p = this.acaoService.delete(id)
      //   .subscribe(res => {
      //     this.notificationsService.success(notify.notifyTitleSuccess, notify.notifyMsgSuccess);
      //     this.consultar();
      //   });
      // this.loader.Progress(p);
    }
  }

  getGridOrder(ordenacao: any): void {
    // this.acaoFiltro.direction = ordenacao.order;
    // this.acaoFiltro.orderBy = ordenacao.sort;
    this.consultar();
  }

  onPageClicked(page: any) {
    // this.acaoFiltro.currentPage = page;
    this.consultar();
  }

  onKeyClicked(keys: any) {
    this.deletar(keys);
  }
}
