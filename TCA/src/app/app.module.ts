import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { TicketComponent } from './ticket/ticket.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { EventComponent } from './event/event.component';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { SuccessComponent } from './success/success.component';
import { FailureComponent } from './failure/failure.component';
import { ProfComponent } from './prof/prof.component';
import { TicketStaffComponent } from './ticket-staff/ticket-staff.component';
import { EventStaffComponent } from './event-staff/event-staff.component';
import { SubsricptionStaffComponent } from './subsricption-staff/subsricption-staff.component';
import { FailureStaffComponent } from './failure-staff/failure-staff.component';
import { SuccessStaffComponent } from './success-staff/success-staff.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    TicketComponent,
    SubscriptionComponent,
    EventComponent,
    SuccessComponent,
    FailureComponent,
    ProfComponent,
    TicketStaffComponent,
    EventStaffComponent,
    SubsricptionStaffComponent,
    FailureStaffComponent,
    SuccessStaffComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
