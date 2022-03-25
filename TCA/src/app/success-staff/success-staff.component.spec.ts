import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessStaffComponent } from './success-staff.component';

describe('SuccessStaffComponent', () => {
  let component: SuccessStaffComponent;
  let fixture: ComponentFixture<SuccessStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
