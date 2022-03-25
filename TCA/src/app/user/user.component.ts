import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes ,Router} from '@angular/router';
import { FormControl,FormBuilder, FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ConnectService } from '../connect.service';
import { GlobalConstants } from '../app.component';
const student_expression=/[1-2]{1}[0-9]{1}[BD0-9]{1}\d{6}/;
// 17D100001
const mobile_number = /^(\+\d{1,3}[- ]?)?\d{10}$/;
/**
 * This is the authentication code regular expression for professors
 */


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,) { }
  public form = this.formBuilder.group({
    fname: new FormControl('',Validators.required),
    lname: new FormControl('',Validators.required),
    mobile: new FormControl('',Validators.required),
    department: new FormControl('',Validators.required) ,
    rollnumber:new FormControl('',Validators.required) ,
    email: new FormControl('',Validators.required) ,
  });

  submitted = false;

  ngOnInit(): void {
    localStorage.clear();
    localStorage.setItem('user_stage',"0");
  }

  get f() { return this.form.controls; }

  Submit(){
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    let roll_no = this.f['rollnumber'].value;
    let num = this.f['mobile'].value;

    if(student_expression.test(roll_no)==false){
      window.alert("incorrect rollnumber format");
      return;
    }

    if(mobile_number.test(num)==false){
      window.alert("incorrect mobile number format");
      return;
    }

    localStorage.setItem('fname',this.f['fname'].value);
    localStorage.setItem('lname',this.f['lname'].value);
    localStorage.setItem('mobile',this.f['mobile'].value);
    localStorage.setItem('department',this.f['department'].value);
    localStorage.setItem('rollnumber',this.f['rollnumber'].value);
    localStorage.setItem('email',this.f['email'].value);

    localStorage.setItem('user_stage',"1");
    this.router.navigate(['/'+GlobalConstants.student_ticket_url_no]);
    
  }

}
