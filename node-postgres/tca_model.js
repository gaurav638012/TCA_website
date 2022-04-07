const fs = require('fs');
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'doadmin',
    host: process.env.host,
    database: 'defaultdb',
    password: process.env.password,
    port: 25060,
    ssl: {
        ca: fs.readFileSync(__dirname+'/ca-certificate.crt'),
    }
});
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'tca',
//     password: 'gaurav@2001',
//     port: 5432,
// });
pool.connect((e,c,d)=>{
    if(e){
        throw e

    }
    else{
        console.log("ok")
    }
})
const query_get_slot = {
    text: `select * from slot_timings;`,
}
const get_slot = () => {
    return new Promise(function(resolve, reject) {
        pool.query(query_get_slot, (error, results) => {
            if(error)
            {
                console.log('CANNOT CONNTECT TO THE DATABASE 80 ')
                reject(error)
            }
            resolve(results);
        })
    })
}


const book_slot = (body) => {
    return new Promise(function(resolve, reject) {
        if(body=="8 PM"){
            pool.query('update slot_timings set slot1 = slot1-1;', (error, results) => {
                if(error)
                {
                    console.log('CANNOT CONNTECT TO THE DATABASE slot_timings1 ')
                    reject(error)
                }
                resolve(results);
            })
        }

        else if(body=="8:30 PM"){
            pool.query('update slot_timings set slot2 = slot2-1;', (error, results) => {
                if(error)
                {
                    console.log('CANNOT CONNTECT TO THE DATABASE slot_timings2 ')
                    reject(error)
                }
                resolve(results);
            })
        }

        else if(body=="9 PM"){
            pool.query('update slot_timings set slot3 = slot3-1;', (error, results) => {
                if(error)
                {
                    console.log('CANNOT CONNTECT TO THE DATABASE slot_timings3 ');
                    reject(error);
                }
                resolve(results);
            })
        }

        else if(body=="9:30 PM"){
            pool.query('update slot_timings set slot4 = slot4-1;', (error, results) => {
                if(error)
                {
                    console.log('CANNOT CONNTECT TO THE DATABASE slot_timings4 ');
                    reject(error);
                }
                resolve(results);
            })
        }

        else{
            //console.log(body);
            console.log("incorrect request body pls send");
        }
        
    })
}

const query_book_ticket = {
    text:'insert into event_booking values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13);'
}
const book_ticket = (body) => {
    return new Promise(function(resolve, reject) {
        //console.log(body);
        args = [body.token,body.fname,body.lname,body.mobile,body.department,body.rollnumber,
            body.email,body.subscribed,body.total_amount,body.contribution,body.extra_passes,body.slot,body.booking_time
        ]
        pool.query(query_book_ticket,args, (error, results) => {
            if(error)
            {
                console.log('CANNOT CONNTECT TO THE DATABASE 2 ');
                reject(error);
            }
            resolve(results);
        })
    });
}

const query_book_ticket_staff = {
    text:'insert into event_booking_staff values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11);'
}
const book_ticket_staff = (body) => {
    return new Promise(function(resolve, reject) {
       // console.log(body);
        console.log("step3")
        args = [body.token,body.name,body.mobile,body.department,body.email,body.subscribed,
            body.total_amount,body.contribution,body.extra_passes,body.slot,body.booking_time
        ]
        pool.query(query_book_ticket_staff,args, (error, results) => {
            if(error)
            {
                console.log('CANNOT CONNTECT TO THE DATABASE 10 ');
                reject(error);
            }
            resolve(results);
        })
    });
}

const query_get_data = {
    text: 'select * from event_booking where token = $1;'
}
const get_data = (token) => {
    return new Promise(function(resolve, reject) {
        pool.query(query_get_data,[token], (error, results) => {
            if(error)
            {
                console.log('CANNOT CONNTECT TO THE DATABASE 04 ')
                reject(error)
            }
            resolve(results);
        })
    })
}

const query_get_data_staff = {
    text: 'select * from event_booking_staff where token = $1;'
}
const get_data_staff = (token) => {
    return new Promise(function(resolve, reject) {
        pool.query(query_get_data_staff,[token], (error, results) => {
            if(error)
            {
                console.log('CANNOT CONNTECT TO THE DATABASE 20 ')
                reject(error)
            }
            resolve(results);
        })
    })
}

var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
        user: "wreckererode@gmail.com",
        pass: "hello@123"
    }
});

const sendMail = (body) =>{
    return new Promise(function(resolve, reject) {
        //console.log(body['email']);
        var mailOptions = {
            from: 'wreckererode@gmail.com',
            to: [body['email'],'tcaiitb@gmail.com'],
            subject: 'Reg Ticket Booking',
            text: `Congratulations for booking at TCA event.Pls visit the following url to get your ticket. Make sure you download it and keep it.  ${body['url']}\n\n\nThanking You,\nTCA
            `
          };
          console.log('sending mail tca done\n');
        transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log("bope didnt reach yet\n");
            console.log(error);
        } else {
            console.log("did it reach yet\n");
            console.log('Email sent: ' + info.response);
        }
        });
    });
}

module.exports = {
    book_slot,
    get_slot,
    book_ticket,
    book_ticket_staff,
    get_data,
    get_data_staff,
    sendMail,
    transporter,
}