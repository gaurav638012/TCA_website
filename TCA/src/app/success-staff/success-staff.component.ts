import { Component, OnInit,ViewChild, ElementRef,AfterViewInit } from '@angular/core';
import { ConnectService } from '../connect.service';
import { RouterModule, Routes ,Router} from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { GlobalConstants } from '../app.component';

@Component({
  selector: 'app-success-staff',
  templateUrl: './success-staff.component.html',
  styleUrls: ['./success-staff.component.css']
})
export class SuccessStaffComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router,private service: ConnectService) { }

  public user_data:any;
  @ViewChild('canvas', { static: true }) canvas!: ElementRef<HTMLCanvasElement>;
  ctx:any;
  ngOnInit(): void {
    localStorage.clear();
    let decryptText = this.activatedRoute.snapshot.paramMap.get('id');
    var org_txt = this.validate_url(decryptText)
    if(org_txt==""){
      window.alert("incorrect access");

      this.router.navigate(['/'+GlobalConstants.staff_form_url_no]);
    }
   // console.log(org_txt);
    this.service.get_data_staff(org_txt)
      .subscribe((data: any) => {
        this.user_data = data[0];
        //console.log(this.user_data);
      })
    //console.log(this.activatedRoute.snapshot.url.join('/'));
    this.make_QR(document.URL);
  }

  make_QR(encoder:any){

    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.3,
      margin: 1,
      color: {
        dark:"#010599FF",
        light:"#FFBF60FF"
      },
      width: 200,
      height: 200
    }
    var QRCode = require('qrcode');
    QRCode.toCanvas(this.canvas.nativeElement, encoder,opts, function (error:any) {
      if (error) console.error(error)
      console.log('success!');
    })
  }

  gen_QR(encoder:any){
    var opts = {
      errorCorrectionLevel: 'H',
      type: 'image/jpeg',
      quality: 0.3,
      margin: 1,
      color: {
        dark:"#010599FF",
        light:"#FFBF60FF"
      },
      width: 200,
      height: 200
    }
    var QRCode = require('qrcode');
    let temp;
    QRCode.toString( encoder,opts, function (err:any, str:String) {
      if (err) console.error(err)
      temp = str;
     
    });
    return temp;
  }

  validate_url(encoder:any){
    var CryptoJS = require("crypto-js");
    var decoded_str = decodeURIComponent(encoder);
    var bytes  = CryptoJS.AES.decrypt(decoded_str, GlobalConstants.secret_hash);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    return originalText;

  }

  Printer(){
    window.print()
  }

}
