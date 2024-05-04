const mongoose = require('mongoose');

//defining schema of my hotels database
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age:{
        type: Number
    },
    work:{
        type: String,
        enum: ['chef','waiter','manager'],
        required: true
    },
    mobile_no:{
        type: String,
        unique: true
    },
    email:{
        type:String,
        required: true,
        unique: true
    },
    salary:{
        type:Number,
        required: true
    }
});

//creating new model while inserting schema in model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;