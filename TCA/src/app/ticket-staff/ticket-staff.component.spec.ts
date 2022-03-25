import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TicketStaffComponent } from './ticket-staff.component';

describe('TicketStaffComponent', () => {
  let component: TicketStaffComponent;
  let fixture: ComponentFixture<TicketStaffComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TicketStaffComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TicketStaffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
