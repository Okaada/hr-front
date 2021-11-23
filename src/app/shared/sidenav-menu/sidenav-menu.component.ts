import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
    selector: 'sidenav-menu',
    templateUrl: './sidenav-menu.component.html',
    styleUrls: ['./sidenav-menu.component.css'],
  })
  export class SideNavComponent {
    @ViewChild('sidenav') sidenav?: MatSidenav;
    isExpanded = true;
    showSubmenu: boolean = false;
    isShowing = false;
    showSubSubMenu: boolean = false;
  
    constructor(private router: Router) { }
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

    goToPage(pageName:string){
      this.router.navigate([`${pageName}`]);
    }
  }