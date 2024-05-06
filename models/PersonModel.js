const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// const { isMatch } = require('lodash');

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
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password: {
        type:String,
        required:true,
        unique:true
    }
});

personSchema.pre('save', async function(next){

    if(!this.isModified('password')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        const newPassword = await bcrypt.hash(this.password,salt);
        this.password = newPassword
        next();    

    } catch (error) {
        return next(error);
    }
});

//creating new model while inserting schema in model
const Person = mongoose.model('Person',personSchema);
module.exports = Person;