

const mongoose = require('mongoose');
const validator = require("validator");

const userContacted = mongoose.Schema({
    username:{
      type:String,
      required:[true, "name is required"],
      // unique:true,
    },
    email:{
      type:String,
      // required:[true, "email is required"],
      validate:[validator.isEmail, "email is invalid"]
    },
    mobile:{
      type: String,
      minLength: [10, "no should have minimum 10 digits"],
      maxLength: [10, "no should have maximum 10 digits"],
      match: [/\d{10}/, "no should only have digits"]
    },
    eventname: String,
    message: String,
    submissionDate: { type: Date, default: Date.now },
})

module.exports = mongoose.model("userContacted" , userContacted)
