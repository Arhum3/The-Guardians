const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const EmpSchema = new Schema({
  firstname: {
    type: String,
    required: true
  },
  lastname: {
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
  phone: {
    type: String,
    required: true
  },
  Designation: {
      type: String,
      required: true
  },
  Status: {
    type: String,
    required: true
  },
  doj: {
    type: String,
    required: true
  },
  dor: {
    type: String,
    required: true
  },
  Gender: {
    type: String,
    required: true
  },
  DependentCount: {
    type: String,
    required: true
  },
  HighQualification: {
    type: String,
    required: true
  },
  BasicQualification: {
    type: String,
    required: true
  },
  PrimaryQualification: {
    type: String,
    required: true
  },
  Master: {
    type: String,
    required: true
  },
  dept: {
    type: String,
    required: true
  },
  Leaves:{
    type: String,
    required: true
  },
  LeaveRequested:{
    type: String,
    required: true
  },
  accflag:{
    type: String,
    required: true
  },
  iflag:{
    type: String,
    required: true
  },
  ClearanceRequested:{
    type: String,
    required: true
  }

});

module.exports = Employee = mongoose.model("employees", EmpSchema);
