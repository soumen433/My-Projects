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


const getCollege = async function(req,res){

    const cName = req.query.collegeName


    const college = await collegeModel.find({cName})
    if(!cName){
        return res.status(400).send({status:false , message: " college Data are not Pesent"})
    }

    let collegewithintern = await collegeModel.find().populate('intern')
    res.status(200).send({data : college})
}


module.exports.createCollege = createCollege
module.exports.getCollege = getCollege
