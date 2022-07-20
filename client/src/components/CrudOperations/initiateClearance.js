import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import EmpNavbar from "../layout/EmployeeNavbar";
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/ListItem'
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import exitimg from "../../images/exit.svg"
import { empClearance } from "../../actions/authActions";
import axios from 'axios'
import moment from "moment"
import AlertDialog from "../layout/messageBoxClearance"
import AlertInventory from "../layout/messageBoxInventory"

class initiateClearance extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      phone: "",
      Designation: "",
      dept:"",
      Status: "",
      doj:"",
      dor: "",
      employee:[],
      advance_notice: "",
      flag:"",
      res:"",
      accFlag:0,
      oiFlag:0,
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
    axios
    .post("/api/users/checkdupsClearance")
    .then((response)=>{
        const data = response.data.clearance
        console.log(data)
        if(data["res"] === "Yes")
        {
          this.state.res = 1
        }
        else if(data["res"] === "No")
        {
          this.state.res = 0
        }
        if(data["accf"] === "Yes")
        {
          this.state.accFlag = 1
          this.state.oiFlag = 0
        }
        else if(data["oif"] === "Yes")
        {
          this.state.accFlag = 0
          this.state.oiFlag = 1
        }
        console.log("res", this.state.res)
        console.log("account flag", this.state.accFlag)
        console.log("inventory flag", this.state.oiFlag)
    })
    
    this.getEmpData()

  }

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  handleChange = (newValue) => {
    this.setState({dor: newValue})
  };
  
  getEmpData = () =>{
    axios
    .post("/api/users/displayEmpData")
    .then((response) => {
      const data = response.data.resultArray
      this.setState({ employee: data })
      this.setState({email: this.state.employee[0].email})
      this.setState({phone: this.state.employee[0].phone})
      this.setState({Designation: this.state.employee[0].Designation})
      this.setState({status: this.state.employee[0].Status})
      this.setState({dept: this.state.employee[0].dept})
      this.setState({doj: this.state.employee[0].doj})
    })
  }
  
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  onSubmit = e => {
    e.preventDefault();
    
    
    
    let formattedDate = moment(this.state.DateofResign).format('DD/MM/YYYY');
    console.log(formattedDate)

    const clearanceData = {
        email: this.state.email,
        phone: this.state.phone,
        Designation: this.state.Designation,
        Status: this.state.Status,
        doj: this.state.doj,
        dor: formattedDate,
    };
    
    axios
    .post('/api/users/setflagAccounts', clearanceData)

    if(Object.entries(this.state.errors).length===0)
    {
        alert("Your application has been transferred to Accounts")
    }

  };
  

  render() {
    const { errors } = this.state;
    
    return (
      <div>
        <EmpNavbar />
        <Grid container spacing={1} style={{marginTop: 50}}>
            <Grid item xs={3} style={{ marginLeft:'300px'}}>
                <Item>
                    <h4><b>Resignation Procedure</b></h4>
                </Item>
            {this.state.res===0 &&
                <form noValidate onSubmit={this.onSubmit}>
                <Item>
                    <div class="input-field col s12" style={{width:"363px"}}>
                        <input
                        onChange={this.onChange}
                        value={this.state.email}
                        error={errors.email}
                        id="email"
                        type="email"
                        class={classnames("", {
                            invalid: errors.email || errors.emailnotfound
                        })}
                        />
                        <span class="red-text">
                        {errors.email}
                        {errors.emailnotfound}
                        </span>
                    </div>
                </Item>
                <Item>
                    <div class="input-field col s12" style={{width:"363px"}}>
                        <input
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
                    <div class="input-field col s12" style={{width:"363px"}}>
                        <input
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
                    <div class="input-field col s12" style={{width:"363px"}}>
                        <input
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
                    <div class="input-field col s12" style={{width:"363px"}}>
                        <input
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
                    <div class="input-field col s12" style={{width:"363px"}}>
                        <input
                        value={this.state.doj}
                        id="doj"
                        type="text"
                        />
                    </div>
                </Item>
                
                <Item><h5>Date of Resingation</h5></Item>
                <Item>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            label="Date Of Resignation"
                            inputFormat="dd/MM/yyyy"
                            value={this.state.dor}
                            minDate={moment().toDate()}
                            onChange={this.handleChange}
                            renderInput={(params) => <TextField style={{width:"363px"}} {...params} />}
                        />
        
                    </LocalizationProvider>    
                </Item>                        
                <Item style={{marginTop:50}}><h4>Other Details</h4></Item>
                <Item><h5>Reason for Resignation</h5></Item>
                <Item>
                    <TextField id = "outlined-multiline-static"
                    label="Enter"
                    multiline
                    rows={3}
                    style={{width:"363px"}}
                    />  
                </Item>
                <button
                    style={{
                        background:'#4169E1',
                        color: 'white',
                        width: "150px",
                        borderRadius: "3px",
                        letterSpacing: "1.5px",
                        marginTop: "2rem",
                        marginLeft: 20
                    }}
                    type="submit"
                    className="btn btn-large waves-effect waves-light hoverable accent-3"
                    >
                    Verify
                </button>
            </form>
            }
            {this.state.res === 1 && this.state.accFlag === 1 && this.state.oiFlag === 0 &&
                <div>
                    <h2>Your application is currently in Accounts Department</h2>
                    <AlertDialog/>
                </div>
            }
            {this.state.res === 1 && this.state.oiFlag === 1 &&
              <div>
                  <h2>Your application is currently in Inventory Department</h2>
                  <AlertInventory/>
              </div>
            }
            </Grid>
            <Grid item xs={6}>
                <Item style={{marginTop:'10rem'}}>
                    <img class="responsive-img" src={exitimg} alt="Resignation"/>
                </Item>
            </Grid>
        </Grid>
      </div>
    );
  }
}
initiateClearance.propTypes = {
    empClearance: PropTypes.func.isRequired,
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
  )(withRouter(initiateClearance));
