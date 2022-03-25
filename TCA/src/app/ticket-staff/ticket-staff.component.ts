import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes ,Router} from '@angular/router';
import { FormControl,FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { GlobalConstants } from '../app.component';

@Component({
  selector: 'app-ticket-staff',
  templateUrl: './ticket-staff.component.html',
  styleUrls: ['./ticket-staff.component.css']
})
export class TicketStaffComponent implements OnInit {

  form = new FormGroup({
    mode: new FormControl('', Validators.required)
  });

  constructor(private router: Router,) { }

  ngOnInit(): void {

    if(localStorage.getItem("staff_stage")!="1"){
      this.router.navigate(['/'+GlobalConstants.staff_form_url_no]);
    }

    localStorage.setItem('ticket_stage',"0");
  }
  
  
  get f(){
    return this.form.controls;
  }
  
  Submit(){
    localStorage.setItem('mode',this.f['mode'].value);
    localStorage.setItem('ticket_stage',"1");
    //console.log(this.form.value);

    if(this.f['mode'].value == 'subscribe'){
      this.router.navigate(['/'+GlobalConstants.staff_sub_url_no]);
    }

    else{
      this.router.navigate(['/'+GlobalConstants.staff_event_url_no]);
    }
    
  }

  switch(event:any){
    // this.f['mode'].value = event.target.value;
  }
}

