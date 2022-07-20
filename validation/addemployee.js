const Validator = require("validator");
const isEmpty = require("is-empty");

module.exports = function validateInsertInput(data) {
  let errors = {};

  // Convert empty fields to an empty string so we can use validator functions
  data.firstname = !isEmpty(data.firstname) ? data.firstname : "";
  data.lastname = !isEmpty(data.lastname) ? data.lastname : "";  
  data.email = !isEmpty(data.email) ? data.email : "";
  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.dept = !isEmpty(data.dept) ? data.dept : "";
  data.Status = !isEmpty(data.Status) ? data.Status : "";
  data.Designation = !isEmpty(data.Designation) ? data.Designation: "";
  

  // Name checks
  if (Validator.isEmpty(data.firstname)) {
    errors.firstname = "First Name field is required";
  }
  else if(!isNaN(data.firstname)){
    errors.firstname = "First Name should be a string"
  }
  
  if (Validator.isEmpty(data.lastname)) {
    errors.lastname = "Last Name field is required";
  }
  else if(!isNaN(data.lastname)){
    errors.lastname = "Last Name should be a string"
  }

  
  // Email checks
  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }
  

  //Phone checks
  if (Validator.isEmpty(data.phone)) {
    errors.phone = "Phone Number is required";
  }
  else if(isNaN(data.phone)){
    errors.phone = "Phone Number cannot be a string"
  }


  //Department Checks
  if (Validator.isEmpty(data.dept)) {
    errors.dept = "Department is required";
  }
  else if(!isNaN(data.dept))
  {
    errors.dept = "Department should be a string"
  }


  //Desingation Checks
  if (Validator.isEmpty(data.Designation)) {
    errors.Designation = "Designation is required";
  }
  else if(!isNaN(data.Designation)){
    errors.Desingation = "Desingation should be a string"
  }


  //Status Checks
  if (Validator.isEmpty(data.Status)) {
    errors.Status = "Status is required";
  }
  else if(!isNaN(data.Status))
  {
    errors.Status = "Status should be a string"
  }


  return {
    errors,
    isValid: isEmpty(errors)
  };
};
