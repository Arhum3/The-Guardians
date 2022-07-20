const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateLeaveData(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";  
  data.dept = !isEmpty(data.dept) ? data.dept : "";
  data.Designation = !isEmpty(data.Designation) ? data.Designation: "";
  data.doj = !isEmpty(data.doj) ? data.doj:""
  data.LeaveReason = !isEmpty(data.LeaveReason) ? data.LeaveReason:""
  data.From = !isEmpty(data.From) ? data.From:""
  data.To = !isEmpty(data.To) ? data.To:""
  
  // Name checks
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First Name field is required";
  }
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last Name field is required";
  }
  


  //Department Checks
  if (Validator.isEmpty(data.dept)) {
    errors.dept = "Department is required";
  }

  //Designation Checks
  if (Validator.isEmpty(data.Designation)) {
    errors.Designation = "Designation is required";
  }


  //Leave Reason check
  if (Validator.isEmpty(data.LeaveReason)) {
    errors.LeaveReason = "Reason is Required";
  }

  //To check
  if (Validator.isEmpty(data.To)) {
    errors.To = "This field is required";
  }

  //From check
  if (Validator.isEmpty(data.From)) {
    errors.From = "This field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
