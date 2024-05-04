const express = require('express');
const app = express();
const db = require('./db_connect');
require('dotenv').config();

//to read the data on client side and send to server
const bodyParser = require('body-parser');
app.use(bodyParser.json());

//GET PUT POST DELETE PATCH
app.get('/', function(req,res){
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