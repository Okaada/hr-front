import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-page',
  templateUrl: './initial-page.component.html',
  styleUrls: ['./initial-page.component.css'],
})
export class InitialPageComponent implements OnInit {
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {}

  scroll(el: HTMLElement) {
    el.scrollIntoView();
  }

  goToPage(pageName:string){
    this.router.navigate([`${pageName}`]);
  }
}
