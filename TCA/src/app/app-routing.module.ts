import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EventComponent } from './event/event.component';
import { UserComponent } from './user/user.component';
import { TicketComponent } from './ticket/ticket.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { ProfComponent } from './prof/prof.component';
import { TicketStaffComponent } from './ticket-staff/ticket-staff.component';
import { SubsricptionStaffComponent } from './subsricption-staff/subsricption-staff.component';
import { SuccessStaffComponent } from './success-staff/success-staff.component';
import { FailureStaffComponent } from './failure-staff/failure-staff.component';
import { EventStaffComponent } from './event-staff/event-staff.component';
import { GlobalConstants } from './app.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  
  {path: GlobalConstants.student_form_url_no,component: UserComponent},
  {path: GlobalConstants.staff_form_url_no,component: ProfComponent},
  {path: GlobalConstants.staff_ticket_url_no,component:TicketStaffComponent},
  {path: GlobalConstants.student_ticket_url_no,component:TicketComponent},
  {path:GlobalConstants.student_sub_url_no,component:SubscriptionComponent},
  {path:GlobalConstants.staff_sub_url_no,component:SubsricptionStaffComponent},
  {path:"success/:id",component:SuccessComponent},
  {path:"success_staff/:id",component:SuccessStaffComponent},
  {path:"failure/:id",component:FailureComponent},
  {path:"failure_staff/:id",component:FailureStaffComponent},
  {path:GlobalConstants.student_event_url_no,component:EventComponent},
  {path:GlobalConstants.staff_event_url_no,component:EventStaffComponent},
  {path:"**",component:HomeComponent}
  // {path:"failure",component:FailureComponent},
  // {path:"success",component:SuccessComponent},  
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



