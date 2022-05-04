//const mongoose = require('mongoose');
const collegeModel = require("../models/collegeModel");
const validator = require("../util/validator")


const createCollege = async function (req,res){
    try{
    let college = req.body;

    const{name , fullName , logoLinks} = college;
    
    if(!validator.isValid(name)){
        return res.status(400).send({status:false, message: "Name is require"});
    }

    if(!validator.isValid(fullName)){
        return res.status(400).send({status:false, message: "fullname is require"})
    }

    if(!validator.isValid(logoLinks)){
        return res.status(400).send({status:false, message: "logoLinks is required"})
    }



    let collegeCreated = await collegeModel.create(college)
    res.status(201).send({status:true, list:collegeCreated})
}
catch(err){
    res.status(500).send({status:false, message: err.message})
}
}


module.exports.createCollege = createCollege
