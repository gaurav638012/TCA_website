import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FailureStaffComponent } from './failure-staff.component';

describe('FailureStaffComponent', () => {
  let component: FailureStaffComponent;
  let fixture: ComponentFixture<FailureStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FailureStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FailureStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
