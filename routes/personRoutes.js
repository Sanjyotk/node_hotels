const express = require('express');
const router = express.Router();

const Person = require('./../models/PersonModel');

router.post('/', async (req,res)=>{
    //bodyparser saves in req.body
    try{
        const data = req.body;
        //below line can be mergered 
        const personInstance = new Person(data);
        const response = await personInstance.save();
        console.log("Person data entered");
        res.status(200).json(response);
    }
    catch(err){
        console.log(err + "/n ERROR:Person data not entered");
        res.status(500).json({error:"error"});
    }
});

router.get('/',async (req,res)=>{
    try{
        const persondata = await Person.find();
        console.log("person data fetched");
        // res.status(200).send(persondata);
        res.status(200).json(persondata);
    }
    catch(err){
        console.log(err + "/n ERROR:Person data not available ");
        res.status(500).json({error:"internal error"});
    }
});

router.put('/:id',async (req,res)=>{
    try{
        const personid = req.params.id;

        const persondata = req.body;
        const response = await Person.findByIdAndUpdate(personid,persondata,{
            new:true,
            runValidators:true
        });

        if(!response){
            return res.status(404).send("enter a valid personid");
        }
        console.log("person data updated by id");
        // res.status(200).send(persondata);
        res.status(200).json(persondata);
    }
    catch(err){
        console.log(err + "/n ERROR:Person ID data not available ");
        res.status(500).json({error:"internal error"});
    }
});

router.delete('/:id',async (req,res)=>{
    try{
        const personid = req.params.id;

        // const persondata = req.body;
        const response = await Person.findByIdAndDelete(personid);
        if(!response){
            return res.status(404).send("enter a valid personid");
        }
        console.log("person data updated by id");
        // res.status(200).send(persondata);
        res.status(200).json(response + "/n Deleted");
    }
    catch(err){
        console.log(err + "/n ERROR:Person ID data not available ");
        res.status(500).json({error:"internal error"});
    }
});

router.get('/work/:workType',async function(req,res){
    try{
        const workType = req.params.workType;
        if(workType=="chef"||workType=='manager'||workType=='waiter'){
            const response = await Person.find({work:workType});
            console.log("person worktype data fetched");
            res.status(200).json(response);
        }
        else{
            console.log("person worktype data not available");
            res.status(404).json({error:"enter valid param"});
        }
    }
    catch(err){
        console.log(err + "/n ERROR:Asked page not available ");
        res.status(500).json({error:"internal error"});
    }
});

router.get('/name/:personName',async function(req,res){
    try{
        const personName = req.params.personName;

        const people = await Person.find();

        // Extract names from each document and concatenate into a single string
        const allNames = people.map(x => x.name).join(', ');

        if(allNames.includes(personName)){
            const response = await Person.find({name:personName});
            console.log("person personName data fetched");
            res.status(200).json(response);
        }
        else{
            console.log("person personName data not available");
            res.status(404).json({error:"enter valid param"});
        }
    }
    catch(err){
        console.log(err + "/n ERROR:Asked page not available ");
        res.status(500).json({error:"internal error"});
    }
});


router.get('/salary/:personSalary',async function(req,res){
    try{
        const personSal = req.params.personSalary;

        const people = await Person.find();

        // Extract names from each document and concatenate into a single string
        const allSalary = people.map(x => x.salary).join(', ');

        if(allSalary.includes(personSal)){
            const response = await Person.find({salary:personSal});
            console.log("person salary data fetched");
            res.status(200).json(response);
        }
        else{
            console.log("person salary data not available");
            res.status(404).json({error:"enter valid salary"});
        }
    }
    catch(err){
        console.log(err + "/n ERROR:Asked page not available ");
        res.status(500).json({error:"internal error"});
    }
});



module.exports = router;