import React, { Component, useState} from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Snackbar from '@mui/material/Snackbar';
import { leaveEmp } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import insertImg from "../../images/insert.svg";
import MuiAlert from '@mui/material/Alert';
import DatePickers from "./datetextbox"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import axios from "axios"

class finalizeleave extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      fathername: "",
      email: "",      
      Designation: "",
      dept: "",
      LeaveReason: "",
      To: "",
      From: "",
      doj : "",
      leaveRes:"",
      check:{},
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.value)
    console.log(this.state.Gender)
  };
  onChange1 = e => {
    this.state.Gender=e.target.value
    console.log(e.target.value)
    console.log(this.state.Gender)
  };

  getEmpData = () =>{
    axios
    .post("/api/users/displayLeaveData")
    .then((response) => {
      const data = response.data.resultArray
      this.setState({ employee: data })
      console.log(this.state.employee)

      this.setState({firstname: this.state.employee[0].firstname})
      this.setState({lastname: this.state.employee[0].lastname})
      this.setState({email: this.state.employee[0].email})
      this.setState({phone: this.state.employee[0].phone})
      this.setState({Designation: this.state.employee[0].Designation})
      this.setState({doj: this.state.employee[0].doj})
      this.setState({status: this.state.employee[0].Status})
      this.setState({dept: this.state.employee[0].dept})
      this.setState({To: this.state.employee[1].To})
      this.setState({From: this.state.employee[1].From})
      this.setState({LeaveReason: this.state.employee[1].LeaveReason})
    })
  }
  
  componentDidMount(){
      this.getEmpData()
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  onSubmit = e => {
    e.preventDefault();

    var x
    if(document.getElementById("yes").checked === true)
    {
        x = document.getElementById("yes").value
    }
    else if(document.getElementById("no").checked === true)
    {
        x = document.getElementById("no").value
    }

    const response = {
      leaveRes:x
    };
    
    axios
    .post("/api/users/grantLeave", response)

    this.sleep(1000).then(r=>{
      
      if(Object.entries(this.state.errors).length===0 && x==="yes")
      {
        alert("You have accepted the designated employees' Leave request, mailing response to employee")
      }
      else if(Object.entries(this.state.errors).length===0 && x==="no")
      {
        alert("You have not accepted the designated employees' Leave request, mailing response to employee")
      }
    })
  };
  

  render() {
    const { errors } = this.state;
    
    return (
      <div>
        <header><Navbar/></header>
      <div className="container" style={{margin:50, marginLeft: 300}}>

        <div className="row" style={{ marginLeft:0 }}>
          <div className="col s4" >
            
            <div className="col s12" style={{ paddingLeft: "70px" }}>
              <h2>
                <b>Leave Request Form</b>
              </h2>
              
            </div>
            <form noValidate onSubmit={this.onSubmit} style={{marginTop:100}}>
              
              <div className="alpha" style={{paddingLeft: 70, paddingRight: 6}}>
              <div className="App">
      <table>
        <tr>
          <th>Personal Information</th>
        </tr>
        
      </table>
    </div>
              <div className="input-field col s12">
                <input
                  placeholder="firstname"
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.firstname}
                  id="firstname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                <span className="red-text">{errors.firstname}</span>
              </div>
              
              <div className="input-field col s12">
                <input
                  placeholder="lastname"
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastname}
                  id="lastname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastname
                  })}
                />
                <span className="red-text">{errors.lastname}</span>
              </div>
                 
             
            
              
              <div className="input-field col s12">
                <input
                  placeholder="Designation"
                  onChange={this.onChange}
                  value={this.state.Designation}
                  id="Designation"
                  type="text"
                  className={classnames("", {
                    invalid: errors.Designation
                  })}
                />
                <span className="red-text">{errors.Designation}</span>
              </div>

              <div className="input-field col s12">
                <input
                  placeholder="Department"
                  onChange={this.onChange}
                  value={this.state.dept}
                  id="dept"
                  type="text"
                  className={classnames("", {
                    invalid: errors.dept
                  })}
                />
                <span className="red-text">{errors.dept}</span>
              </div>
           
              <div className="input-field col s12">
                <input
                  placeholder="Date of Joining"
                  onChange={this.onChange}
                  value={this.state.doj}
                  id="doj"
                  type="text"
                  className={classnames("", {
                    invalid: errors.doj
                  })}
                />
                <span className="red-text">{errors.doj}</span>
              </div>
            
              <div className="App">
      <table>
        <tr>
          <th>Leave Information</th>
          
        </tr>
        <tr>
          
              
              <td>
              <div className="input-field col s12">
                <input
                  placeholder="Leave Reason"
                  onChange={this.onChange}
                  value={this.state.LeaveReason}
                  error={errors.LeaveReason}
                  id="LeaveReason"
                  type="text"
                  className={classnames("", {
                    invalid: errors.LeaveReason
                  })}
                />
                <span className="red-text">{errors.LeaveReason}</span>
              </div>

              </td>
          
        </tr>
       
        <tr>
              <td>
              
              <div className="input-field col s12">
                <input
                  placeholder="From"
                  onChange={this.onChange}
                  value={this.state.From}
                  error={errors.From}
                  id="From"
                  type="text"
                  className={classnames("", {
                    invalid: errors.From
                  })}
                />
                <span className="red-text">{errors.From}</span>
              </div>
              </td>

              <td>
              <div className="input-field col s12">
                <input
                  placeholder="To"
                  onChange={this.onChange}
                  value={this.state.To}
                  error={errors.To}
                  id="To"
                  type="text"
                  className={classnames("", {
                    invalid: errors.To
                  })}
                />
                
                <span className="red-text">{errors.To}</span>
              </div>
              </td>
              </tr>
      </table>
    </div>


                <div >
                <h5 >HR Remarks</h5>
                    <div style={{marginTop:20}}>
                        <TextField id = "outlined-multiline-static"
                        label="Enter"
                        multiline
                        rows={3}
                        style={{width:"363px"}}
                        />  
                    </div>
                    <div>
                        <h6 style={{marginRight:15.6, marginTop:20}}><b>Leave Granted</b></h6>
                        <p>
                            <label>
                                <input type="checkbox" id = "yes" value = "yes"/>
                                <span style={{fontWeight:'300', color: 'black' }}><b>Yes</b></span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" id = "no" value = "no"/>
                                <span style={{fontWeight:'300', color: 'black' }}><b>No</b></span>
                            </label>
                        </p>
                  </div>
              </div>
              
              <div className="col s12" style={{ paddingLeft: "200px" , marginTop: "15px" }}>
                <button
                  style={{
                    background: '#4169E1',
                    color: 'white',
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Send
                </button>
              </div>
              </div>
            </form>
          </div>
          <div class = "col s6" style={{marginLeft: 150, marginTop: 100 }}>
            <img class="responsive-img" src={insertImg} alt="insert"/>
          </div>
        </div>
      </div>
      </div>
    );
  }
}
export default finalizeleave