import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BenefitListComponent } from './benefit-list.component';

describe('BenefitListComponent', () => {
  let component: BenefitListComponent;
  let fixture: ComponentFixture<BenefitListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BenefitListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BenefitListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
