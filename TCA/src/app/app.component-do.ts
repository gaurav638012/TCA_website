import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TCA';
}

export class GlobalConstants {
  public static key_id: string = "rzp_live_ftSZvpFtRuiAtx";
  public static backend_base: string = "https://tca-website-ki3sf.ondigitalocean.app"
    
  public static secret_key: string = "P3MjdtSoUNFMEUPDvLyQFlMa";

  public static secret_hash: string = 'tca application gp';

  public static student_form_url_no: string = "Stus";
  public static staff_form_url_no: string = "usfac";

  public static student_ticket_url_no: string = "2689";
  public static staff_ticket_url_no: string = "1389";

  public static student_event_url_no: string = "0602";
  public static staff_event_url_no: string = "0606";

  public static student_sub_url_no: string = "1501";
  public static staff_sub_url_no: string = "0701";
}
