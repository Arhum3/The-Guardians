const Validator = require("validator");
const isEmpty = require("is-empty");
const User = require('../models/User');
const bcrypt = require("bcryptjs");
const crypto = require("crypto")

module.exports = function sendMail(data){
    
    let errors = {};
    data.email = !isEmpty(data.email) ? data.email : "";
    var email = data.email;
    // Email checks
    if (Validator.isEmpty(data.email)) {
        errors.email = "Email field is required";
    } else if (!Validator.isEmail(data.email)) {
        errors.email = "Email is invalid";
    }
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
        to: data.email,
        subject: "PasswordReset",
        html:`<p>You requested for password reset</p>
        <h4>Click in this <a href="http://localhost:3000/ResetPassword">link</a></h4>`
    }
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
        } else {
          console.log('Email sent: ' + info.response);
        }
    })

    // var nodemailer = require("nodemailer")
    // var transporter = nodemailer.createTransport({
    //     name: 'smtp.gmail.com',
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     auth: {
    //         user: 'TheGuardianshr@gmail.com',
    //         pass: 'iaxuzqvvdohctjlx'
    //     }
    // })
    // var mailOptions = {
    //     from: 'TheGuardianshr@gmail.com',
    //     to: data.email,
    //     subject: "Recovered!",
    //     html:`<p>You requested for password reset</p>`
    // }

    // transporter.sendMail(mailOptions, function(error, info){
    //     if (error) {
    //       console.log(error);
    //     } else {
    //       console.log('Email sent: ' + info.response);
    //     }
    // });
    
    return {
        errors,
        isValid: isEmpty(errors)
    };
}