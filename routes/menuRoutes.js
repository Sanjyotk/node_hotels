const express = require('express');
const router = express.Router();

router.get('/', function(req,res){
    var menu = {name : "Sk" , age : 21 , gadgets : ["headphones","buds","phone","laptop"], stocks : true};
    res.send(menu);
});

module.exports = router;