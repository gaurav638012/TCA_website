import { Component, OnInit } from '@angular/core';
import { RouterModule, Routes ,Router} from '@angular/router';
import { GlobalConstants } from '../app.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {

    
  }

  Student(){
    this.router.navigate(['/'+GlobalConstants.student_form_url_no]);
  }
  Professor(){
    this.router.navigate(['/'+GlobalConstants.staff_form_url_no]);
  }

}
