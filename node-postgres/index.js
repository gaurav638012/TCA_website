const express = require('express')
const alert = require('alert'); 
require("dotenv").config();
const app = express()
const port = 3001

const tca_model = require('./tca_model')
console.log(process.env.password)

app.use(express.json())
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers');
  next();
});



app.get('/get_slot', (req, res) => {
    tca_model.get_slot()
    .then(response => {

      //res.status(200).send(tempo(response));
      res.status(200).send(response.rows);
    })
    .catch(error => {
      res.status(500).send(error);
    })
})

app.get('/get_data/:skip', (req, res) => {
  tca_model.get_data(req.params.skip)
  .then(response => {

    //res.status(200).send(tempo(response));
    res.status(200).send(response.rows);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/get_data_staff/:skip', (req, res) => {
  //console.log('reached step 2')
  tca_model.get_data_staff(req.params.skip)
  .then(response => {

    res.status(200).send(response.rows);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.get('/book_slot/:slot', (req, res) => {
  tca_model.book_slot(req.params.slot)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/book_ticket', (req, res) => {
  tca_model.book_ticket(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/book_ticket_staff', (req, res) => {
  //console.log(req.body);
  //console.log('tep 2')
  tca_model.book_ticket_staff(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

app.post('/sendmail', (req, res) => {
  //console.log(req.body);
  //console.log('sending mail two done\n',req.body);
  
  tca_model.sendMail(req.body)
  .then(response => {
    res.status(200).send(response);
  })
  .catch(error => {
    res.status(500).send(error);
  })
})

const Razorpay = require('razorpay'); 
const razorpayInstance = new Razorpay({

    key_id: process.env.key_id,
    key_secret: process.env.key_secret

});

async function payment_handle(req,res){

  //console.log("reached post",req.body);
  const {amount,currency}  = req.body;
  
 // const payment_capture = 1; 
  try{
    //order = await razorpayInstance.orders.create({amount,currency,payment_capture});
    order = await razorpayInstance.orders.create({
      amount:amount,
      currency: currency,
      receipt: 'rcptid_11',
      payment: {
        capture : 'automatic',
        capture_options : {
          automatic_expiry_period : 12,
          manual_expiry_period : 7200,
          refund_speed : 'optimum'
        }  
      }
    })
  //  console.log("bye bye",order);
    //make_checkout(order);
    res.json(order);
    //make_checkout(order);
  }
  catch(error){
    console.log(error);
  }
 
}
app.post('/makePayment',payment_handle);
// app.post('/makePayment', (req, res)=>{ 
  
     
        


// function make_checkout(order)
// { 
//   //const z = require("https://checkout.razorpay.com/v1/checkout.js");
//   var options = {
//   "key_id": "rzp_live_YQ0GSqCCHsyUfO", 
//   "key_secret": "C6tlxOqT5RbLrcC4nmOfr9qv",
//   "amount": order["amount"], 
//   "currency": order["currency"],
//   "name": "Gaurav",
//   "description": "Pay to have ur registration done",
//   "order_id": order["id"]} ;
//   instance.orders.create({
//   amount:50000,
//   currency: 'INR',
//   receipt: 'rcptid_11',
//   payment: {
//     capture : 'automatic',
//     capture_options : {
//       automatic_expiry_period : 12,
//       manual_expiry_period : 7200,
//       refund_speed : 'optimum'
//     }  
//   }
// })
  
//   var razorpayObject = new Razorpay(options);
//   //console.log(razorpayObject);
//   // razorpayObject.on('payment.failed', function (response){
//   //     console.log(response);
//   //     alert("This step of Payment Failed");
//   // });

//   razorpayObject.open();
// }

// var razorpayObject = new Razorpay(options);
// console.log(razorpayObject);
// razorpayObject.on('payment.failed', function (response){
//     console.log(response);
//     alert("This step of Payment Failed");
// });



app.listen(port, () => {
    
    console.log(`App running on port ${port}`)
})