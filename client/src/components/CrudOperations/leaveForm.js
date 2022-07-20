import React, { Component, useState} from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Snackbar from '@mui/material/Snackbar';
import { leaveEmp } from "../../actions/authActions";
import Navbar from "../layout/EmployeeNavbar";
import insertImg from "../../images/insert.svg";
import MuiAlert from '@mui/material/Alert';
import DatePickers from "./datetextbox"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import axios from "axios"
import moment from "moment"
import AlertDialog from "../layout/messageBoxLeave"
class leaveForm extends Component {
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
      res: "",
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
  handleChangeTo = (newValue) => {
    this.setState({To: newValue})
  };
  handleChangeFrom = (newValue) =>{
    this.setState({From: newValue})
  }


  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
    console.log(e.target.value)
    console.log(this.state.Gender)
  };

  getEmpData = () =>{
    axios
    .post("/api/users/displayEmpData")
    .then((response) => {
      const data = response.data.resultArray
      this.setState({ employee: data })
      this.setState({firstname: this.state.employee[0].firstname})
      this.setState({lastname: this.state.employee[0].lastname})
      this.setState({email: this.state.employee[0].email})
      this.setState({phone: this.state.employee[0].phone})
      this.setState({Designation: this.state.employee[0].Designation})
      this.setState({doj: this.state.employee[0].doj})
      this.setState({status: this.state.employee[0].Status})
      this.setState({dept: this.state.employee[0].dept})
    })
  }
  
  componentDidMount(){
    axios
    .post("/api/users/checkLeave")
    .then((response)=>{
        const data = response.data.leave
        if(data["res"] === "Yes")
        {
          this.state.res = 1
        }
        else if(data["res"] === "No")
        {
          this.state.res = 0
        }
        
    })
      this.getEmpData()
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  onSubmit = e => {
    e.preventDefault();
    let formattedDateTo = moment(this.state.To).format('DD/MM/YYYY');
    let formattedDateFrom = moment(this.state.From).format('DD/MM/YYYY');
    const newEmp = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      Designation: this.state.Designation,
      dept: this.state.dept,
      LeaveReason: this.state.LeaveReason,
      To: formattedDateTo,
      From: formattedDateFrom,
      doj: this.state.doj
    };
    
    this.props.leaveEmp(newEmp);
    
    this.sleep(1000).then(r=>{
      
      if(Object.entries(this.state.errors).length===0)
      {
        alert("Request for leave has been sent to HR successfully")
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
              {this.state.res === 0 && 
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
                    placeholder="email"
                    onChange={this.onChange}
                    value={this.state.email}
                    error={errors.email}
                    id="email"
                    type="text"
                    className={classnames("", {
                      invalid: errors.email
                    })}
                  />
                  <span className="red-text">{errors.email}</span>
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
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                                  <DesktopDatePicker
                                      label="From"
                                      disablePast
                                      inputFormat="dd/MM/yyyy"
                                      value={this.state.From}
                                      InputProps={{
                                        disableUnderline: true
                                      }}
                                      onChange={this.handleChangeFrom}
                                      renderInput={(params) => <TextField variant="standard" style={{width:"363px"}} {...params} />}
                                  />
                              </LocalizationProvider>
                          
                          <span className="red-text">{errors.From}</span>
                        </div>
                      </td>
                      <td>
                        <div className="input-field col s12">
                          <LocalizationProvider dateAdapter={AdapterDateFns}>
                                    <DesktopDatePicker
                                        label="To"
                                        disablePast
                                        inputFormat="dd/MM/yyyy"
                                        value={this.state.To}
                                        InputProps={{
                                          disableUnderline: true
                                        }}
                                        onChange={this.handleChangeTo}
                                        renderInput={(params) => <TextField variant="standard" style={{width:"363px"}} {...params} />}
                                    />
                            </LocalizationProvider>
                          <span className="red-text">{errors.To}</span>
                        </div>
                      </td>
                    </tr>
                  </table>
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
              </form>
              }
              {this.state.res===1 && 
                <div>
                  <h2>You have already submitted the form, Please wait for the response!</h2>
                  <AlertDialog/>
                </div>
              }
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

  leaveForm.propTypes = {
    leaveEmp: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

  export default connect(
    mapStateToProps,
    { leaveEmp }
  )(withRouter(leaveForm));