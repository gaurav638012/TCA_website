# TCA_website

## FRONT-END
- Firstly there is a file in TCA/src/app called app.component.ts which exports **GlobalConstants class**. Now this class contains all constants needed.
  **key_id**: refers to key of razor-pay <br />
  **secret_key**: refers to secret_key given by razor-pay <br />
  **secret_hash**: used to decode success_page url <br />
  **backend_base**: This contains the base url on which the backend runs. Currently it would be "http://localhost:3001" since port is taken as 3001
  Other constants refer to constants associated to url of each component 

- Note that amount in razorpay is in **Paise** hence 100 factor is multiplied at each case. Also in razorpay popup the name appearing on top is name of the business name assoiated with **razorpay account**

- Separate components were created for each of **student** pages and **staff** pages. Note that there is a failure page which is called when there is booking done or smth like on razorpay that but then registration fails on **backend database**. If this is the case either backend failed or some issue in booking data or razorpay issue either ways need to be looked immediately

- **Local Storage** is being used for storing initial data till subscription or event page. This could have been done better by using multi-page form given by **angular**

## BACK-END

- The main file is **index.js** which runs express module and responds to various get/post calls from front-end.There is another helper file **tca_model.js** which contains functions that perform sql logic. 
- Note the database used is **postgres** and the login details are set in index.js. Also the **key_id** and **secret_key** needed for razorpay are set in index.js so set it accordingly
- There is a file **tca.ddl** which removes existing database and creates three new tables and adds max no of slots to each slot. If needed change it there.Also if u want to have lesser slots set slot value to zero. But having different slots will then involve also changing in front-end also. 
- One table is booking info of **student** and one info is info of **staff** and another table tracks no of slots left. Note that if we want subscribed students list or anything like that we can just query from the database with the fields. Just look into that also

## OVERALL
- So a new user will firstly have to change key_id and secret_key if they are using different razorpay account. If they want to change text message in razorpay popup go to individual component and there in order call set the text message
- They should also similarly change backend_base based on what the hosting website leads on to and also change login details if using postgres
- **NOTE: This was written to support postgres I mean the queries**



  

