const mongoose = require('mongoose');
const collegeModel = require('../models/collegeModel');
const internModel = require("../models/internModel");
const validator = require("../util/validator")

const route = require("../models/internModel");


const createIntern = async function(req,res){
    let intern = req.body

    const{email , mobile, name ,  collegeName} = intern;

    if(!validator.isValid(name)){
        return res.status(400).send({status:false, message: "Name is require"});
    }


    if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        res.status(400).send({status: false,message: `Email should be a valid email address`});
        return;
      }


      const isEmailAlredyUsed = await internModel.findOne({ email });
      if (isEmailAlredyUsed) {
        return res
          .status(400)
          .send({
            status: false,
            message: `${email} email address is already registered`,
          });
      }


      if(intern.mobile.length !== 10){
          return res.send({status:false , message: "mobile number is required 10 digit"})
      }
      
      let mob = await internModel.findOne({mobile: intern.mobile })

      if(mob !== null){
          return res.status(400).send({status:false, Message:`${mobile} mobile already use`})
      }
     // if (intern.collegeId.length !== 24){
      //  return res.status(400).send({status:false, message:"invalid college Id"})
      if(!validator.isValid(collegeName)){
        return res.status(400).send({status:false, message: " College Name is require"});
    }
   // }
   //if(!collegeName) return res.status(400).send({status:false,message:"College Name Must Require"})

      let iscollegeId  = await collegeModel.findOne({name: intern.collegeName}).select({_id:1})
      if(! iscollegeId){
        return res.status(400).send({status:false, message: "college name not exist"})
    }

      let id=iscollegeId._id.toString()
     intern.collegeId=id
     delete intern.collegeName
     // console.log(intern)


   let internCreate = await internModel.create(intern)
    res.status(201).send({status:true, intern:internCreate})
}

module.exports.createIntern = createIntern;