import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubsricptionStaffComponent } from './subsricption-staff.component';

describe('SubsricptionStaffComponent', () => {
  let component: SubsricptionStaffComponent;
  let fixture: ComponentFixture<SubsricptionStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SubsricptionStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SubsricptionStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
