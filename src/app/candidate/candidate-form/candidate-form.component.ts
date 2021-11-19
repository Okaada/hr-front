import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-candidate-form',
  templateUrl: './candidate-form.component.html',
  styleUrls: ['./candidate-form.component.css'],
})
export class CandidateFormComponent implements OnInit {
  isEdit: boolean = false;
  id: any = null;
  
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
    this.checkId();
  }

  checkId() {
    let id = this.route.snapshot.params['id'];
    if (id !== null && id !== undefined) {
      this.isEdit = true;
      setTimeout(() => {
        this.initializeCandidate(id);
      });
    }
  }

  initializeCandidate(id: any) {
    this.id = id;
    // let p = this.acaoService.findOne(id)
    //   .subscribe(data => {
    //     this.acaoForm.setValue({
    //       id: data.id,
    //       descricao: data.descricao
    //     });
    //   });
    // this.loader.Progress(p);
  }

  onSubmit(): void {
    if (this.id === null) {
      // CREATE
      // let p = this.acaoService.save(this.acaoForm.value)
      //   .subscribe(res => {
      //     this.notificationsService.success(notify.notifyTitleSuccess, notify.notifyMsgSuccess);
      //     this.router.navigate(['/adm/crud/action']);
      //   });
      // this.loader.Progress(p);
    } else {
      // UPDATE
      // let p = this.acaoService.update(this.id, this.acaoForm.value)
      //   .subscribe(res => {
      //     this.notificationsService.success(notify.notifyTitleSuccess, notify.notifyMsgSuccess);
      //     this.router.navigate(['/adm/crud/action']);
      //   });
      // this.loader.Progress(p);
    }
  }

  onCancel() {
    this.router.navigate(['/candidate']);
  }
}
