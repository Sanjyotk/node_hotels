const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/PersonModel');

const bcrypt = require('bcrypt');

passport.use(new LocalStrategy(async (USERNAME,PASSWORD,done) => {
    try {
        console.log("recieved credentials:",USERNAME , PASSWORD);
        const user = await Person.findOne({username:USERNAME});
        if(!user){
            console.log("Not a valid Username");
            return done(null,false,{message:'not valid username'});
        }
        const isMatch = await bcrypt.compare(PASSWORD,user.password);
        if(isMatch){
            return done(null,user);
        }
        else{
            return done(null,false,{message:'not valid password'});
        }
    } 
    catch (error) {
        console.log("catch block executed");
        return done(error);
    }
}));

module.exports = passport;