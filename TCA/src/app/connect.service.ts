import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ConnectService {

  constructor(private http:HttpClient) { }
  get_data(skip: any){
    return this.http.get('http://localhost:3001/get_data/'+String(skip));
  }
  get_data_staff(skip: any){
    //console.log("reached step 1")
    return this.http.get('http://localhost:3001/get_data_staff/'+String(skip));
  }
  book_slot(slot:any){
    return this.http.get('http://localhost:3001/book_slot/'+String(slot));
  }
  book_ticket(ticket_info:any){
    return this.http.post('http://localhost:3001/book_ticket', ticket_info);
  }
  book_ticket_staff(ticket_info:any){
    //console.log("reached step1")
    return this.http.post('http://localhost:3001/book_ticket_staff', ticket_info);
  }
  get_slots(){
    return this.http.get('http://localhost:3001/get_slot');
  }
  sendMail(body:any){
    //console.log('sending mail reach done\n');
    return this.http.post('http://localhost:3001/sendmail', body);
  }
  makePayment(body:any){
    //console.log('starting to make an order to razorpay');
    return this.http.post('http://localhost:3001/makePayment', body);
  }
}
