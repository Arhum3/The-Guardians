const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../../config/keys");
const passport = require("passport");
//const { spawn } = require('child_process')
// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");
const sendMail = require("../../validation/forgotpass");
const resetpassword = require("../../validation/resetPass")
const resetpasswordEmp = require("../../validation/resetPassEmp")
const validateInsertInput = require("../../validation/addemployee")
const validateLeaveData = require("../../validation/leaveemployee")

// Loading required models
const User = require("../../models/User");
const Employee = require("../../models/Employee");
const LoginEmp = require("../../models/LoginEmp");
//const LoginEmp = require("../../client/src/");

let storedEmail = " "
let empStoredEmail = " "
let usermail = " "
let empflag = false
let cflag = false

let accflag = false
let iflag = false
let leavemail=""
let leaveTo=""
let leaveFrom=""
let leaveReason=""
let leaveFlag=false
let LeaveRequested = "No"
let ClearanceRequested = "No"
let currentEmail = " "
// Register as an HR
router.post("/register", (req, res) => {
  // Form validation

  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});

//display table api
router.post("/displayData", async (req, res) => {
  resultArray = []
  resultArray = await Employee.find();
  res.json({
    resultArray
  })
})

//notification on HR side
router.post('/notification',(req, res) =>{
  noti = {}
  if(usermail === " " && cflag === false)
  {
    noti["msg"] = "N"
    res.json({
      noti
    })
  }
  else if(usermail !== " " && cflag === true)
  {
    Employee.findOne({email:usermail}).then(emp => {
  
      if(!emp)
      {
        console.log("employee not found")
        
      }
      else{
        noti["msg"] = emp.firstname
        res.json({
          noti
        })
      }    
    })
  }
   
})

//notification on accounts side
router.post('/accNotification', (req, res)=>{
  
  accnoti = {}
  if(usermail === " " && accflag === false)
  {
    accnoti["msg"] = "N"
    res.json({
      accnoti
    })
  }
  else if(usermail !== " " && accflag === true)
  {
    email = usermail
    Employee.findOne({ email}).then(emp => {
  
      if(!emp)
      {
        console.log("employee not found")
        
      }
      else{
        accnoti["msg"] = emp.firstname
        res.json({
          accnoti
        })
      }    
    })
  }
})

//Update API
router.post('/updateEmployee', async(req, res)=>{
  
  const { errors, isValid } = validateInsertInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  let employee = await Employee.findById(req.body._id);
  employee.firstname = req.body.firstname;
  employee.lastname = req.body.lastname;
  employee.fathername = req.body.fathername;
  employee.email = req.body.email;
  employee.Designation = req.body.Designation;
  employee.phone = req.body.phone;
  employee.Status = req.body.Status;
  employee.doj = req.body.doj;
  employee.DependentCount = req.body.DependentCount;
  employee.HighQualification = req.body.HighQualification;
  employee.BasicQualification = req.body.BasicQualification;
  employee.PrimaryQualification = req.body.PrimaryQualification;
  employee.Master = req.body.Master;
  employee.Gender = req.body.Gender;
  employee.dept = req.body.dept;
  employee.dor = "NA"
  await employee
        .save()
        .then(emp => res.json(emp))
        .catch(err => console.log(err));
})

//Delete API
router.post('/deleteUser', (req,res)=>{
  const email = req.body.email;
  var id
  Employee.findOne({ email:req.body.email }).then(emp => {
  
    if(!emp)
    {
      console.log("employee not found")
    
    }
    else{
      id = emp._id
      emp.deleteOne({_id:id});
    }    
  })
})

//Data Display on EditForm
router.post('/displayEditInfo', async(req,res)=>{
  const _id = req.body._id
  resultArray = []
  resultArray = await Employee.find({_id})
  res.json({
    resultArray
  })
})

//HR login
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists


    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

//employee login api
router.post("/emploginUser", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;
  empStoredEmail = req.body.email;
  // Find user by email
  Employee.findOne({email}).then(emp => {
  
    if(!emp)
    {
      console.log("employee not found")
      
    }
    else{
      
      emp.save()
    }    
  })
  Employee.findOne({ email }).then(emp => {
    // Check if user exists
    if (!emp) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    else{
      
      result = password.localeCompare(emp.password)
      if(result === 0)
      {
        const payload = {
          id: emp.id,
          name: emp.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      }
      else{
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    }
  });
});

//display Employee data api
router.post("/displayEmpData", async(req, res) =>{
  resultArray = []
  const email = empStoredEmail
  //const email = "f180371@nu.edu.pk"
  if(email === " "){
    res.json({resultArray})
  }
  resultArray = await Employee.find({email})
  
  res.json({
    resultArray
  })
})

//api to check if employee has already requested for leave or not
router.post("/checkLeave", (req, res)=>{
  const email = empStoredEmail
  leave = {}
  Employee.findOne({ email}).then(emp => {
  
    if(!emp)
    {
      console.log("employee not found")
      
    }
    else{
      leave["res"] = emp.LeaveRequested
      res.json({
        leave
      })
    }    
  })
})

//api to check wether employee has already requested clearance or not
router.post("/checkdupsClearance", (req, res)=>{
  var mail
  if (currentEmail == " "){
    mail = empStoredEmail
  } 
  else{
    mail = currentEmail
  }
  const email = mail

  clearance = {}
  Employee.findOne({ email}).then(emp => {
  
    if(!emp)
    {
      console.log("employee not found")
      
    }
    else{
      clearance["res"] = emp.ClearanceRequested
      clearance["accf"] = emp.accflag
      clearance["oif"] = emp.iflag
      console.log("iflag",clearance["oif"])
      res.json({
        clearance
      })
    }    
  })
})

//notify HR about leave
router.post("/notifyHraboutLeave", (req, res) =>{
  const { errors, isValid } = validateLeaveData(req.body);
  
  leavemail = req.body.email
  leaveTo = req.body.To
  leaveFrom = req.body.From
  leaveReason = req.body.LeaveReason
  Employee.findOne({email: req.body.email}).then(emp => {
  
    if(!emp)
    {
      console.log("employee not found")
      
    }
    else{
      
      emp.LeaveRequested = "Yes"
      emp.save()
    }    
  })

  if (!isValid) {
    return res.status(400).json(errors);
  }

  leaveFlag = true

})

//Display Data on leave form
router.post("/displayLeaveData", async(req, res) =>{
  resultArray = []
  //const email = "f180401@nu.edu.pk"
  const email = leavemail
  if(email === " "){
    res.json({resultArray})
  }
  resultArray = await Employee.find({email})
  resultArray.push({"To":leaveTo, "From":leaveFrom, "LeaveReason":leaveReason})

  res.json({
    resultArray
  })
})

//setting leave flag for HR side notification and approval
router.post("/getLeaveResponse", (req, res)=>{
  
  leavenoti={}
  if(leaveFlag===true)
  {

    Employee.findOne({email : leavemail}).then(emp=>{
      leavenoti["res"]=emp.firstname
      res.json({
        leavenoti
      })
    })
  }
  else{
    leavenoti["res"]="n"
    res.json({
      leavenoti
    })
  }
})

//display accounts side data
router.post("/displayAccEmpData", async(req, res) =>{
  resultArray = []
  const email = usermail
  // const email = "talhazafarj@gmail.com"
  if(email === " "){
    res.json({resultArray})
  }
  resultArray = await Employee.find({email})
  res.json({
    resultArray
  })
})

//forget password HR
router.post("/forgetPassword", (req, res) =>{

  const { errors, isValid } = sendMail(req.body);
  const email = req.body.email;
  
  storedEmail = email;

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    else{
      console.log("Check Your Mail!")
    }
  })
})

//Reset password for HR
router.post("/ResetPassword", (req, res) =>{

  const { errors, isValid } = resetpassword(req.body)
  const newPassword = req.body.password
  const email = storedEmail
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  User.findOne({ email }).then(user => {

    if(!user)
    {
      return res.status(404).json({ emailnotfound: "User not found" });
    }
    else{
      bcrypt.hash(newPassword, 10).then(hash=>{
        user.password = hash
        user.save().then((saveduser)=>{
          console.log("Password Update Success!")
          res.json({success: "Password update success!"})
        })
      })
    }    
  })
})

//Reset Password for Emp
router.post("/ResetPasswordEmp", (req, res) => {

  const { errors, isValid } = resetpasswordEmp(req.body)
  
  if (!isValid) {
    return res.status(400).json(errors);
  }

  Employee.findOne({password: req.body.oldPassword}).then(emp => {
    if(!emp)
    {
      return res.status(400).json({ oldPassword: "Password does not match with old password!" });
    }
    else {
      emp.password = req.body.password
      emp.save()
      res.send({
        emp
      })
    }
  })
})

router.post("/Recruitment", (req, res)=>{
  var exp = req.body.Skill 
  
  const csv = require('csv-parser')
  const fs = require('fs')
  fs. writeFile('C:/Users/Talha/Desktop/mern-auth-master/Skill.txt', exp, err=>{
    if(err){
      console.error(err)
    }
  })
  const spawn = require('child_process').spawn;
    
  proc = spawn('python', ['scrap.py'], {
    detached: true,
  });

  proc.stdout.on('data', data => {
    dataz = data.toString()
  });

  proc.stderr.on('data', err => {
    console.log(String(err));
  });

  proc.on('close', (code, signal) => {
    console.log(`child process exited with code ${code} and signal ${signal}`);
  });
 
    const dataobj=[]
    fs.createReadStream('Cscraped_data.csv')
    .pipe(csv())
    .on('data', function (row) {
      
      dataobj.push(row)
    })
    .on('end', function () {
      res.send({
        dataobj
      })
    })
  
  
})

//add Employee api
router.post("/addEmployee", (req, res) => {
  
  const { errors, isValid } = validateInsertInput(req.body);

  if (!isValid) {
    return res.status(400).json(errors);
  }

  Employee.findOne({ email: req.body.email }).then(emp => {
    if (emp) {
      return res.status(400).json({ email: "Email already exists" });
    } else {
      var leaveCount = 18
      const newEmp = new Employee({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        phone: req.body.phone,
        Designation: req.body.Designation,
        Status: req.body.Status,
        Gender: req.body.Gender,
        DependentCount: req.body.DependentCount,
        HighQualification: req.body.HighQualification,
        BasicQualification: req.body.BasicQualification,
        PrimaryQualification:req.body.PrimaryQualification,
        Master:req.body.Master,
        doj: req.body.doj,
        dor: req.body.dor,
        password: req.body.password,
        dept: req.body.dept,
        Leaves: leaveCount,
        LeaveRequested: "No",
        ClearanceRequested: "No",
        accflag:"No",
        iflag:"No",
      });
      newEmp
        .save()
        .then(emp => res.json(emp))
        .catch(err => console.log(err));
    }
  });
});

//grantLeave from HR side /finalize Leave
router.post("/grantLeave", (req, res) => {

  if(req.body.leaveRes==="yes")
  {
    Employee.findOne({ email: leavemail }).then(emp => {
      if (!emp) {
        return res.status(400).json({ emailnotfound: "User not found" });
      } else {
        var temp = emp.Leaves
        temp = temp-1
        emp.Leaves = temp

        emp.status = "On Leave"
        emp.save()

        var nodemailer = require("nodemailer")
        var transporter = nodemailer.createTransport({
        name: 'smtp.gmail.com',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'theguardianshr@gmail.com',
            pass: 'ifbuurjmtbbedyfj'
        },
        tls:{
            rejectUnauthorized:false
        }
      })
    
      var mailOptions = {
        from: 'theguardianshr@gmail.com',
        to: leavemail,
        subject: "LeaveResponse",
        html:`<p>Dear `+ emp.firstname +`, Your leave request is approved</p>
        <h4>Leave is granted from `+ leaveFrom +` to `+ leaveTo +`</h4>`
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      }
    });
  }
  else if(req.body.leaveRes==="no")
  {
    Employee.findOne({ email: leavemail }).then(emp => {
      if (!emp) {
        return res.status(400).json({ emailnotfound: "User not found" });
      } else {
        emp.LeaveRequested = "No"
        var nodemailer = require("nodemailer")
        var transporter = nodemailer.createTransport({
        name: 'smtp.gmail.com',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'theguardianshr@gmail.com',
            pass: 'ifbuurjmtbbedyfj'
        },
        tls:{
            rejectUnauthorized:false
        }
      })
    
      var mailOptions = {
        from: 'theguardianshr@gmail.com',
        to: leavemail,
        subject: "LeaveResponse",
        html:`<p>Dear `+ emp.firstname +`, Your leave request is not approved</p>
        <h4>You may contact HR for possible reasons</h4>`
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      }
    });
  }

});


//initiate clearance employee side
router.post("/initiateClearance", (req, res) =>{

  const { errors, isValid } = validateInsertInput(req.body);
  const email = req.body.email
  cflag = true
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  
  Employee.findOne({ email }).then(emp => {
    // Check if user exists
    if (!emp) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    else{ 
      console.log("Check Your Mail!")
    }
  })
})

//finalize clearance from HR side
router.post("/finalizeClearance", async(req, res) =>{

  const { errors, isValid } = validateInsertInput(req.body);
  const email = req.body.email
  
  Employee.findOne({ email }).then(emp => {
    // Check if user exists
    if (!emp) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    else{
      emp.Status = "Resigned"
      emp.save();
      var nodemailer = require("nodemailer")
      var transporter = nodemailer.createTransport({
        name: 'smtp.gmail.com',
        host: 'smtp.gmail.com',
        port: 587,
        auth: {
            user: 'theguardianshr@gmail.com',
            pass: 'ifbuurjmtbbedyfj'
        },
        tls:{
            rejectUnauthorized:false
        }
      })
    
      var mailOptions = {
        from: 'theguardianshr@gmail.com',
        to: email,
        subject: "ClearanceResponse",
        html:`<p>Dear `+ emp.firstname +`, Your resignation application is accepted and your records are cleared</p>
        <h4>You can no longer login into our application</h4>`
      }
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
      })
      
    }
  });

  empflag = true

})

//Setting clearance flag for inventory side
router.post("/inventoryNotifications", (req, res)=>{
  invnoti = {}
  if(usermail === " " && iflag === false)
  {
    invnoti["msg"] = "N"
    res.json({
      invnoti
    })
  }
  else if(usermail !== " " && iflag === true)
  {
    email = usermail
    Employee.findOne({ email}).then(emp => {
  
      if(!emp)
      {
        console.log("employee not found")
        
      }
      else{
        invnoti["msg"] = emp.firstname
        res.json({
          invnoti
        })
      }    
    })
  }

})

//generating inventory response from inventory side
router.post("/inventoryClearance", (req,res)=>{
  const email = req.body.email
  invRes = {}
  invRes["res"] = "yes"
  if(req.body.invResponse==="no")
  {
    Employee.findOne({ email}).then(emp => {
  
      if(!emp)
      {
        console.log("employee not found")
        
      }
      else{
        emp.iflag = "No"
        emp.ClearanceRequested = "No"
        var nodemailer = require("nodemailer")
        var transporter = nodemailer.createTransport({
          name: 'smtp.gmail.com',
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
              user: 'theguardianshr@gmail.com',
              pass: 'ifbuurjmtbbedyfj'
          },
          tls:{
              rejectUnauthorized:false
          }
        })
      
        var mailOptions = {
          from: 'theguardianshr@gmail.com',
          to: email,
          subject: "ClearanceResponse",
          html:`<p>Dear `+ emp.firstname +`, Your resignation application cannot be proceeded because it seems that you still have some property registered under your name</p>
          <h4>Kindly contact Office Inventory department for more info and solve any errors</h4>`
        }
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })  
      }    
    })
    invRes["res"] = req.body.invResponse
    res.json({
      invRes
    })
  }
  else{
    cflag = true
  }
})

//clearance on accounts side
router.post("/setflagAccounts", (req, res) =>{
  const { errors, isValid } = validateInsertInput(req.body);
  const email = req.body.email
  
  usermail = email
  accflag = true
  //cflag = true
  currentEmail = email
  
  Employee.findOne({ email }).then(emp => {
    // Check if user exists
    if (!emp) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    else{
      emp.accflag = "Yes"
      emp.ClearanceRequested = "Yes"
      emp.dor = req.body.dor
      emp.save();
    }
  })
})

//finalize accounts clearance
router.post("/accountsClearance", (req, res) =>{
  const { errors, isValid } = validateInsertInput(req.body);
  const email = req.body.email
  accRes = {}
  accRes["res"] = "yes"
  if(req.body.accResponse==="yes")
  {
    Employee.findOne({ email}).then(emp => {
  
      if(!emp)
      {
        console.log("employee not found")
        
      }
      else{
        emp.ClearanceRequested = "No"
        emp.accflag = "No"
        var nodemailer = require("nodemailer")
        var transporter = nodemailer.createTransport({
          name: 'smtp.gmail.com',
          host: 'smtp.gmail.com',
          port: 587,
          auth: {
              user: 'theguardianshr@gmail.com',
              pass: 'ifbuurjmtbbedyfj'
          },
          tls:{
              rejectUnauthorized:false
          }
        })
      
        var mailOptions = {
          from: 'theguardianshr@gmail.com',
          to: email,
          subject: "ClearanceResponse",
          html:`<p>Dear `+ emp.firstname +`, Your resignation application cannot be proceeded because you are not cleared from accounts</p>
          <h4>Kindly contact accounts department and solve any errors</h4>`
        }
        transporter.sendMail(mailOptions, function(error, info){
          if (error) {
            console.log(error);
          } else {
            console.log('Email sent: ' + info.response);
          }
        })  
      }    
    })
    accRes["res"] = req.body.accResponse
    res.json({
      accRes
    })
  }
  else{
    iflag = true
    //console.log('Email', email)
    Employee.findOne({ email}).then(emp => {
  
      if(!emp)
      {
        console.log("employee not found")
      }
      else{
        emp.iflag = "Yes"
        emp.accflag = "No"
        emp.save()
      }
    })
  }
  
})
router.post("/getflag", (req, res)=>{
  res.json({
    accflag
  })
})
module.exports = router;