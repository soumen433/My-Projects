const mongoose = require('mongoose');
const collegeModel = require('../models/collegeModel');
const internModel = require("../models/internModel");
const validator = require("../util/validator")

const route = require("../models/internModel");


const createIntern = async function (req, res) {
  let intern = req.body

  const { email, mobile, name, collegeName } = intern;

  if (!validator.isValid(name)) {
    return res.status(400).send({ status: false, message: "invalid name" });
  }

  if (!validator.isValid(mobile)) return res.status(400).send({ status: false, msg: "mobile number require" })

  let validMob = /^[6-9]\d{9}$/
  if (!validMob.test(mobile)) {
    return res.status(400).send({ status: false, message: "invalid mobile number" })
  }

  let mob = await internModel.findOne({ mobile: intern.mobile })

  if (mob !== null) {
    return res.status(400).send({ status: false, Message: `${mobile} mobile already used` })
  }

  if (!validator.isValid(email)) {
    return res.status(400).send({ status: false, message: "Email must require" });
  }

  let validEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/

  if (!validEmail.test(email)) {
    res.status(400).send({ status: false, message: `Email should be a valid email address` });
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

  if (!validator.isValid(collegeName)) return req.status(400).send({ status: false, msg: "college name require" })

  let iscollegeId = await collegeModel.findOne({ name: intern.collegeName }).select({ _id: 1 })

  if (!iscollegeId)  return res.status(400).send({ status: false, message: "college name not exist" })
  
  let id = iscollegeId._id
  intern.collegeId = id
  delete intern.collegeName
  
  let internCreate = await internModel.create(intern)
  res.status(201).send({ status: true, data: internCreate })
}

module.exports.createIntern = createIntern;