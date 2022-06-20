# api
npm Install in the api folder directory
Run npm start to start the server

Create a .env file in the root foler filling in the DataBase connection strings for MongoDB, and JWT token. 

+ MONGO =  '<conectionString>'
+ JWT = '<JWT TOKEN'





Hotel Management API
========================
The hotel management API endpoints for the actions below:
+ Create, get, delete, Update Hotels. 
+ Create, get, delete, and update rooms in Hotels. 
+ Register/Logout as a user. 
+ Update a user login details. 
+ Get a count of Hotels.
+ Get a count of rooms in specific hotel. 

EndPoint restrictions
===========================
A **verifyAdmin** function is mounted on the following routes to prevent CRUD operations by a regular user: 
+ Hotel, User, and room



