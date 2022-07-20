import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/ListItem'
import DatePickers from "./datetextbox"
import TextField from '@mui/material/TextField';
import exitimg from "../../images/exit.svg"
import axios from 'axios'
import { empClearance } from "../../actions/authActions"

class finalizeClearance extends Component {
  constructor() {
    super();
    this.state = {
      OPD : "",
      email: "",
      phone: "",
      Designation: "",
      dept:"",
      Status: "",
      doj:"",
      dor: "",
      Collectibles:"",
      advanceNotice:"",
      casualLeave:"",
      earnedLeave:"",
      resignSubmission:"",
      employee:[],
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

  componentDidMount(){
    this.getEmpData()
  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  
  getEmpData = () =>{
    axios
    .post("/api/users/displayAccEmpData")
    .then((response) => {
      const data = response.data.resultArray
      if(data.length!==0)
      {
        this.setState({ employee: data })
        this.setState({email: this.state.employee[0].email})
        this.setState({phone: this.state.employee[0].phone})
        this.setState({Designation: this.state.employee[0].Designation})
        this.setState({dept: this.state.employee[0].dept})
        this.setState({doj: this.state.employee[0].doj})
        this.setState({dor: this.state.employee[0].dor})
        this.setState({status: this.state.employee[0].Status})
      }
    })
  }

  onSubmit = e => {
    e.preventDefault();

    var collects
    if(document.getElementById("Y").checked === true)
    {
        collects = document.getElementById("Y").value
    }
    else if(document.getElementById("N").checked === true)
    {
        collects = document.getElementById("N").value
    }

    var advNotice
    if(document.getElementById("served").checked === true)
    {
        advNotice = document.getElementById("served").value
    }
    else if(document.getElementById("not_served").checked === true)
    {
        advNotice = document.getElementById("not_served").value
    }

    var resignSubmitted
    if(document.getElementById("resignY").checked === true)
    {
        resignSubmitted = document.getElementById("resignY").value
    }
    else if(document.getElementById("resignN").checked === true)
    {
        resignSubmitted = document.getElementById("resignN").value
    }
    
    const clearanceData = {
      email: this.state.email,
      phone: this.state.phone,
      Designation: this.state.Designation,
      dept: this.state.dept,
      Status: this.state.Status,
      doj: this.state.doj,
      Collectibles: collects,
      OPD: this.state.OPD,
      advanceNotice: advNotice,
      casualLeave: this.state.casualLeave,
      earnedLeave: this.state.earnedLeave,
      resignSubmission: resignSubmitted,
    };
    
    this.props.empClearance(clearanceData)
    
  };
  

  render() {
    const { errors } = this.state;
    
    return (
      <div>
        <Navbar />
        <Grid container spacing={2} style={{marginTop: 50, maxWidth:'100%'}}>
        <form noValidate onSubmit={this.onSubmit} style={{display: 'flex', height:'100%', width:'100%'}}>
                
                <Grid item xs={4} style={{ marginLeft:'270px'}}>
                    <Item>
                        <h4><b>Employee Details</b></h4>
                    </Item>
                
                    <Item>
                        <div class="input-field col s12" >
                            <input
                            placeholder = "Email"
                            onChange={this.onChange}
                            value={this.state.email}
                            error={errors.email}
                            id="email"
                            type="email"
                            class={classnames("", {
                                invalid: errors.email || errors.emailnotfound
                            })}
                            />
                            {/* <label for="email">Email</label> */}
                            <span class="red-text">
                            {errors.email}
                            {errors.emailnotfound}
                            </span>
                        </div>
                    </Item>
                    <Item>
                        <div class="input-field col s12" >
                            <input
                            placeholder = "Designation"
                            onChange={this.onChange}
                            value={this.state.Designation}
                            error={errors.Designation}
                            id="Designation"
                            type="text"
                            class={classnames("", {
                                invalid: errors.Designation || errors.Designation
                            })}
                            />
                            <span class="red-text">
                            {errors.Designation}
                            </span>
                        </div>
                    </Item>
                    
                    <Item>
                        <div class="input-field col s12" >
                            <input
                            placeholder = "Department"
                            onChange={this.onChange}
                            value={this.state.dept}
                            error={errors.dept}
                            id="dept"
                            type="text"
                            class={classnames("", {
                                invalid: errors.dept || errors.dept
                            })}
                            />
                            <span class="red-text">
                            {errors.dept}
                            </span>
                        </div>
                    </Item>

                    <Item>
                        <div class="input-field col s12" >
                            <input
                            placeholder = "Phone"
                            onChange={this.onChange}
                            value={this.state.phone}
                            error={errors.phone}
                            id="phone"
                            type="text"
                            class={classnames("", {
                                invalid: errors.phone || errors.phone
                            })}
                            />
                            <span class="red-text">
                            {errors.phone}
                            </span>
                        </div>
                    </Item>

                    <Item>
                        <div class="input-field col s12" >
                            <input
                            placeholder = "Status"
                            onChange={this.onChange}
                            value={this.state.status}
                            error={errors.status}
                            id="status"
                            type="text"
                            class={classnames("", {
                                invalid: errors.status || errors.status
                            })}
                            />
                            <span class="red-text">
                            {errors.status}
                            </span>
                        </div>
                    </Item>

                    <Item>
                        <div class="input-field col s12" >
                            <input
                            value={this.state.doj}
                            id="doj"
                            type="text"/>
                        </div>
                    </Item>
                    <Item>
                        <div class="input-field col s12" >
                            <input
                            value={this.state.dor}
                            id="dor"
                            type="text"/>
                        </div>
                    </Item>
                </Grid>

                <Grid item xs={5} style={{marginLeft:50}}>
                    <Item><h4><b>HR Manager</b></h4></Item>
                    <Item style={{marginTop:40}}>
                        <h6><b>Advance Notice given</b></h6>
                        <p>
                            <label>
                                <input type="checkbox" id = "served" name = "served" value = "served"/>
                                <span style={{fontWeight:'300', color: 'black' }}><b>Served</b></span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" id = 'not_served' name = 'not_served' value = "not_served"/>
                                <span style={{fontWeight:'300', color: 'black' }}><b>Not Served</b></span>
                            </label>
                        </p>
                    </Item>
                    <Item>
                        <h6><b>Leave Balance</b></h6>
                        <div class="input-field inline" style={{marginLeft:20}}>
                            <input id="casualLeave" name="casualLeave" type="text" onChange={this.onChange} value={this.state.casualLeave}/>
                            <label for="casualLeave">Casual</label>
                        </div>
                        <div class="input-field inline" style={{marginLeft:20}}>
                            <input id="earnedLeave" name="earnedLeave" type="text" onChange={this.onChange} value={this.state.earnedLeave}/>
                            <label for="earnedLeave">Earned</label>
                        </div>
                        
                    </Item>
                    <Item>
                        <h6 style={{marginRight:15.6}}><b>Resign Submitted during leave</b></h6>
                        <span></span>
                        <p>
                            <label>
                                <input type="checkbox" id = "resignY" value = "Y"/>
                                <span style={{fontWeight:'300', color: 'black' }}><b>Yes</b></span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" id = "resignN" value = "N"/>
                                <span style={{fontWeight:'300', color: 'black' }}><b>No</b></span>
                            </label>
                        </p> 
                    </Item>
                    <Item>
                        <h6 style={{marginRight:15.6}}><b>Medical balance OPD(Accounts)</b></h6>
                        <div class = "input-field inline">
                            <input id="OPD" type="text" name="OPD" onChange={this.onChange} value = {this.state.OPD}/>
                            <label for="OPD">OPD</label>
                        </div>
                    </Item>
                    <Item><h5>Remarks</h5></Item>
                    <Item>
                        <TextField id = "outlined-multiline-static"
                        label="Enter"
                        multiline
                        rows={3}
                        style={{width:"363px"}}
                        />  
                    </Item>
                    <Item><h5>Collectibles</h5></Item>
                    <Item>
                        <h6 style={{marginRight:15.6}}><b>University ID, Insurance Card Submitted</b></h6>
                        <span></span>
                        <p>
                            <label>
                                <input type="checkbox" id = "Y" value = "Y"/>
                                <span style={{fontWeight:'300', color: 'black' }}><b>Yes</b></span>
                            </label>
                        </p>
                        <p>
                            <label>
                                <input type="checkbox" id = "N" value = "N"/>
                                <span style={{fontWeight:'300', color: 'black' }}><b>No</b></span>
                            </label>
                        </p>
                    </Item>
                    <button
                    style={{
                        background:'#4169E1',
                        color: 'white',
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "3rem",
                        marginLeft: 20
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable accent-3"
                    >
                    finalize
                </button>
                </Grid>
            </form>
        </Grid>
      </div>
    );
  }
}
finalizeClearance.propTypes = {
    addemp: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
  };

  const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
  });

  export default connect(
    mapStateToProps,
    { empClearance }
  )(withRouter(finalizeClearance));
//export default finalizeClearance;