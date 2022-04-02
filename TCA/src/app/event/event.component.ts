import { Component, NgZone, OnInit } from '@angular/core';
import {  Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ConnectService } from '../connect.service';
import { WindowRefService } from '../window-ref.service';
import { DomSanitizer } from '@angular/platform-browser';
import {GlobalConstants} from '../app.component';
declare var Razorpay:any;

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css'],
  providers: [WindowRefService]
})
export class EventComponent implements OnInit {

  base_cost = 310;
  event_cost = 310;
  total = this.base_cost;
  submitted = false;

  // private @Inject(DOCUMENT) document:any;
  public slot_tim: any;
  public checkoutUrl:any;
  public form = new FormGroup({
    additionalpasses: new FormControl('0', Validators.required),
    contribution: new FormControl('0', Validators.required),
    slot: new FormControl('', Validators.required),
  });

  constructor(private zone: NgZone,private router: Router, private service: ConnectService,private winRef: WindowRefService,private sanitizer: DomSanitizer) {
    let checkout = "https://checkout.razorpay.com/v1/checkout.js";
    this.checkoutUrl = sanitizer.bypassSecurityTrustUrl(checkout);
   }

  ngOnInit(): void {

    if (localStorage.getItem('ticket_stage') != "1" && localStorage.getItem('ticket_stage') != "1") {
      this.router.navigate(['/'+GlobalConstants.student_form_url_no]);
    }

    if (localStorage.getItem('ticket_stage') != "1" && localStorage.getItem('ticket_stage') == "1") {
      this.router.navigate(['/'+GlobalConstants.student_ticket_url_no]);
    }

    localStorage.setItem('interface_stage', "0");

    this.service.get_slots()
      .subscribe((data: any) => {
        this.slot_tim = data[0];
        //console.log(this.slot_tim);
      })

    this.total = this.base_cost + parseInt(this.f['contribution'].value) + parseInt(this.f['additionalpasses'].value) * this.event_cost;
  }

  get f() { return this.form.controls; }

  trigger_total() {
    this.total = this.base_cost + parseInt(this.f['contribution'].value) + parseInt(this.f['additionalpasses'].value) * this.event_cost;
  }

  Submit() {

    this.submitted = true;
    if (this.form.invalid) {
      return;
    }
    
    var random_token = Math.random().toString(28).substring(2);
    this.Pay(this.total,random_token);
    //this.Book(random_token)
    
  }

  get_time() {
    var now = new Date();
    return [
      now.getFullYear(),
      '-',
      now.getMonth() + 1,
      '-',
      now.getDate(),
      ' ',
      now.getHours(),
      ':',
      now.getMinutes(),
      ':',
      now.getSeconds()
    ].join('');
  }

  clear_local(){
    localStorage.clear();
  }

  generate_url(token:String){
    var CryptoJS = require("crypto-js");
    var encoded_str =  CryptoJS.AES.encrypt(token, GlobalConstants.secret_hash).toString();
    return encodeURIComponent(encoded_str);
  }

  Book(random_token:any):any{

    var info = {
      'token':random_token,
      'fname': localStorage.getItem('fname'), 'lname': localStorage.getItem('lname'),
      'mobile': localStorage.getItem('mobile'), 'department': localStorage.getItem('department'),
      'rollnumber': localStorage.getItem('rollnumber'), 'email': localStorage.getItem('email'),
      'subscribed': 'no', 'total_amount': this.total.toString(), 'contribution': this.f['contribution'].value,
      'extra_passes': this.f['additionalpasses'].value, 'slot': this.f['slot'].value, 'booking_time': this.get_time(),
    }

    this.service.book_ticket(info)
      .subscribe(data => {
        this.service.book_slot(this.f['slot'].value).subscribe(data =>{          
           console.log("booking finally done successfuly")
           var url = this.generate_url(random_token);  
           this.SendMail(localStorage.getItem('email'),document.location.origin+'/success/'+url); 
           this.zone.run(() => {
            this.router.navigate(['/success/'+url]);
        }
        );   
           
          },
         error =>{
          console.log("Payment succeeded slots unavailable booking failed");  
         })        
      },
      error =>{     
        console.log("Payment succeeded booking failed");
      })
  }

  //this.SendMail(localStorage.getItem('email'),'/success/'+url);
  SendMail(email:any,url:any){
    var body = {'email':email,'url':url}
    
    this.service.sendMail(body).subscribe(
      data =>{
        console.log("email sent successfully");
        
      },
      error =>{
        console.log("email failed");
        

      }
      
    )
  }

  Pay(amount:any,random_token:any):any{
    var body = {"amount":this.total*100,"currency":"INR"}
    //console.log( console.log(this.router.url))
    this.service.makePayment(body).subscribe(
      data=>{
        //console.log("order succeeded",data);
        this.Checkout(data,random_token)
      },
      error=>{
        this.Failure();
        
      }
    )
  }

  responseHandle(response:any){
    console.log(response)
  }
  Checkout(order:any,random_token:any){
    var options = {
      "key": GlobalConstants.key_id, 
      "amount": order["amount"], 
      "currency": "INR",
      "name": "Gaurav",
      "description": "Pay to have ur registration done",
      "order_id": order["id"],
      "handler": (res:any)=>{
        //console.log("hey",res)
        this.VerifyOrder(res,random_token)
      }
    } ;

    const rzp =  new Razorpay(options);
      rzp.on('payment.failed', function (response:any){    


        console.log(response.error.code);    
        console.log(response.error.description); 
        window.alert(response.error.description)   
        console.log(response.error.source);    
        console.log(response.error.step);    
        console.log(response.error.reason);    
        //console.log(response.error.metadata.order_id);    
        //console.log(response.error.metadata.payment_id);
        
    });
      rzp.open();
  
  }

  Failure(){
    this.clear_local();
    var failure_tok = Math.random().toString(18).substring(3);
    var url = this.generate_url(failure_tok);
    this.SendMail(localStorage.getItem('email'),'/success/'+url); 
    this.zone.run(() => {
      this.router.navigate(['/failure/'+url]);
    });     
  }

  VerifyOrder(body:any,random_token:any){
      //console.log("happy happy")
      let order_id = body['razorpay_order_id']
      let payment_id = body['razorpay_payment_id']
      let signature = body['razorpay_signature']

      const key_secret = GlobalConstants.secret_key;  
      var Crypto = require("crypto-js");   
      let generated_signature = Crypto.HmacSHA256(order_id + "|" + payment_id, key_secret).toString(Crypto.enc.Hex);

      //console.log(body)
      if(signature===generated_signature){
          //alert("payment verification was successful");
          this.Book(random_token);
      }
      else{
        alert("payment verification was failure whta the fuck")
        
        this.Failure();
      }
    }

  }
