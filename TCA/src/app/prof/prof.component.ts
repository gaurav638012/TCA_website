import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes ,Router} from '@angular/router';
import { FormControl,FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ConnectService } from '../connect.service';
import { GlobalConstants } from '../app.component';
// 17D100001
const mobile_number = /^(\+\d{1,3}[- ]?)?\d{10}$/;
/**
 * This is the authentication code regular expression for professors
 */

@Component({
  selector: 'app-prof',
  templateUrl: './prof.component.html',
  styleUrls: ['./prof.component.css']
})
export class ProfComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,) { }
  public form = this.formBuilder.group({
    name: new FormControl('',Validators.required),
    mobile: new FormControl('',Validators.required),
    department: new FormControl('',Validators.required) ,
    email: new FormControl('',Validators.required) ,
  });

  submitted = false;

  ngOnInit(): void {
    localStorage.clear();
    localStorage.setItem('staff_stage',"0");
  }

  get f() { return this.form.controls; }

  Submit(){
    //console.log("hello")
    this.submitted = true;
    if (this.form.invalid) {
     // console.log("issue")
      
      return;
    }

    let num = this.f['mobile'].value;

    if(mobile_number.test(num)==false){
      window.alert("incorrect mobile number format");
      return;
    }

    localStorage.setItem('name',this.f['name'].value);
    localStorage.setItem('mobile',this.f['mobile'].value);
    localStorage.setItem('department',this.f['department'].value);
    localStorage.setItem('email',this.f['email'].value);

    localStorage.setItem('staff_stage',"1");
    this.router.navigate(['/'+GlobalConstants.staff_ticket_url_no]);
    
  }

}

