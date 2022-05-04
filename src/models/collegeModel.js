const mongoose = require('mongoose');
//const {links} = require("express/lib/response");
//const ObjectId = mongoose.Schema.Types.ObjectId

const collegeSchema = new mongoose.Schema( {
    name: { type : String, required: true, unique: true}, 
    fullName: {type: String, required:true}, 
    logoLink: {type: String, required:true, },      //ref:links
    isDeleted: {type:Boolean, default: false}
},{ timestamps: true });

module.exports = mongoose.model("college", collegeSchema)