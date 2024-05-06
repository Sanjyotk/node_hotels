//ALL APP.USE() FUNCTIONS ARE MIDDLE WARE FUNCTIONS
//aunthetication:Total types of members allowed to enter 
//authorisation: Funtionalities accessable to each member
const express = require('express');
const app = express();
const db = require('./db_connect');
require('dotenv').config();

//for aunthentication of users using usernames and passwords
const passport = require('./auth');
app.use(passport.initialize());
const passportAuthentication = passport.authenticate('local', {session:false});

//to read the data on client side and send to server
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//middleware functions: TO ADD MORE FUNCTIONALITY BETWEEN REQ AND RES:LIKE AUNTHENTICATION,LOGGING,MODIFING DATA
function logRequest(req,res,next){
    console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
    next(); //to go to server page
}

app.use(logRequest);

//GET PUT POST DELETE PATCH
app.get('/', passportAuthentication, function(req,res){
    res.send('Hello World');
});

const personRoutes = require('./routes/personRoutes');
app.use('/person',personRoutes);

const menuRoutes = require('./routes/menuRoutes');
app.use('/menu',menuRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT,(err)=>{
    if(err){console.log(err);}
    console.log("listening on part 3000");
});