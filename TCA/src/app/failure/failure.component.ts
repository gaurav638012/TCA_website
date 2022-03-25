import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes ,Router} from '@angular/router';
import { GlobalConstants } from '../app.component';
@Component({
  selector: 'app-failure',
  templateUrl: './failure.component.html',
  styleUrls: ['./failure.component.css']
})
export class FailureComponent implements OnInit {

  constructor(private activatedRoute:ActivatedRoute,private router:Router) { }

  ngOnInit(): void {
    console.log("step 2 f");
    let decryptText = this.activatedRoute.snapshot.paramMap.get('id');
    if(!this.validate_url(decryptText)){
      console.log("step 2 ff");
      //window.alert("incorrect access");
      this.router.navigate(['/'+GlobalConstants.student_form_url_no]);
    }
    console.log("step 3 f");

  }

  validate_url(encoder:any){
    //var tempo = "U2FsdGVkX1+9UPimcb0f2aDt/4ZDHBErBdtkoOCiczw"
    var CryptoJS = require("crypto-js");
    //var ciphertext = CryptoJS.AES.encrypt(encoder, GlobalConstants.secret_hash).toString();
    // console.log("what ra")
    // console.log(ciphertext);
    var decoded_str = decodeURIComponent(encoder);
    var bytes  = CryptoJS.AES.decrypt(decoded_str, GlobalConstants.secret_hash);
    var originalText = bytes.toString(CryptoJS.enc.Utf8);
    //console.log(originalText);
    if(originalText!=""){
      console.log("success");
      return true;
    }
    else{return false}

  }

}
