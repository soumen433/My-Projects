
const collegeModel = require("../models/collegeModel");
const internModel = require("../models/internModel")
const validator = require("../util/validator")


const createCollege = async function (req, res) {
    try {
        let college = req.body;

        const { name, fullName, logoLink } = college;

        if (!validator.isValid(name)) {
            return res.status(400).send({ status: false, message: "invalid name" });
        }

        let validName = await collegeModel.findOne({ name })

        if (validName !== null) {
            return res.status(400).send({ status: false, message: "name already exist" })
        }

        if (!validator.isValid(fullName)) {
            return res.status(400).send({ status: false, message: "invalid fullname" })
        }

        let validfullName = await collegeModel.findOne({ fullName })

        if (validfullName !== null) {
            return res.status(400).send({ status: false, messege: "fullName already exist" })
        }

        if (!validator.isValid(logoLink)) {
            return res.status(400).send({ status: false, message: "logoLink is required" })
        }

        if (!(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%.\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%\+.~#?&//=]*)/.test(college.logoLink))) {
            return res.status(400).send({ status: false, message: 'Please provide valid URL' })
        }

        let collegeCreated = await collegeModel.create(college)

        res.status(201).send({ status: true, data: collegeCreated })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}


const getcollegeDetails = async function (req, res) {
    try {
        let data = req.query.collegeName

        if (!data) return res.status(400).send({ status: false, msg: "query must require" })

        let collegeId = await collegeModel.findOne({ name: data, isDeleted: false }).select({ _id: 1 })

        if (collegeId == null) return res.status(400).send({ status: false, msg: "college name not exist" })

        let clgId = collegeId._id

        let allInterns = await internModel.find({ collegeId: clgId, isDeleted: false }).select({ collegeId: 0, isDeleted: 0, createdAt: 0, updatedAt: 0, __v: 0 })

        if (allInterns.length == 0) allInterns = "no intern"

        let collegeDetails = await collegeModel.findOne({ name: data, isDeleted: false }).select({ _id: 0 })

        res.status(200).send({
            status: true,
            data: {
                "name": collegeDetails.name,
                "fullName": collegeDetails.fullName,
                "logoLink": collegeDetails.logoLink,
                "interests": allInterns
            }
        })
    }
    catch (error) {
        res.status(500).send({ status: false, msg: error.message })
    }
}



module.exports.createCollege = createCollege
module.exports.getcollegeDetails = getcollegeDetails

