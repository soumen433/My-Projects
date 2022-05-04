const express = require('express');
const { route } = require('express/lib/application');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const collegeController= require("../Controllers/collegeController")
const internController= require("../Controllers/internController")

router.post('/functionup/colleges', collegeController.createCollege)
router.post('/functionup/interns', internController.createIntern)


module.exports = router;