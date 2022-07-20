const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EmployeeSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  resetToken:String,
  expireToken:Date,
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = LoginEmp = mongoose.model("loginemps", EmployeeSchema);
