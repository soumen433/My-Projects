//const mongoose = require('mongoose');
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
const validator = require("../util/validator")


const createCollege = async function (req, res) {
    try {
        let college = req.body;

        const { name, fullName, logoLink } = college;

        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, message: "Name is require" });
        }

        if (!validator.isValid(fullName)) {
            return res.status(400).send({ status: false, message: "fullname is require" })
        }

        if (!validator.isValid(logoLink)) {
            return res.status(400).send({ status: false, message: "logoLinks is required" })
        }



        let collegeCreated = await collegeModel.create(college)
        res.status(201).send({ status: true, list: collegeCreated })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
const getcollegeDetails = async function (req, res) {

    let data = req.query.collegeName 
    if(!data) return res.send({msg:"query must require"})
    let collegeId = await collegeModel.findOne({ name: data ,isDeleted:false}).select({ _id: 1 })
    if (collegeId == null) return res.send({ msg: "college name not exist" })
    let clgId = collegeId._id
    //let collegeDetails=await collegeModel.findOne({name:data}).select({_id:0})
    let allInterns = await internModel.find({ collegeId: clgId,isDeleted:false }).select({ collegeId: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })
    if (allInterns.length == 0) allInterns = "no intern"
    let collegeDetails = await collegeModel.findOne({ name: data ,isDeleted:false}).select({ _id: 0 })
   
    res.send({
        status: true,
        data: {
            "name": collegeDetails.name,
            "fullName": collegeDetails.fullName,
            "logoLink": collegeDetails.logoLink,
            "interests": allInterns
        }
    })

}

module.exports.createCollege = createCollege
module.exports.getcollegeDetails = getcollegeDetails

