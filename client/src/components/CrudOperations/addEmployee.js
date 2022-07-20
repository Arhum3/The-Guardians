import React, { Component, useState} from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Snackbar from '@mui/material/Snackbar';
import { addemp } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import insertImg from "../../images/insert.svg";
import MuiAlert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import moment from "moment"

class addEmployee extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      Designation: "",
      Status: "",
      DateofJoining : "",
      Gender: "",
      DependentCount:"",
      doj:"",
      dor:"NA",
      HighQualification: "",
      BasicQualification: "",
      PrimaryQualification: "",
      Master: "",
      dept:"",
      open:false,
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

  handleChange = (newValue) => {
    this.setState({doj: newValue})
  };

  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  onChange1 = e => {
    this.state.Gender=e.target.value
    console.log(e.target.value)
    console.log(this.state.Gender)
  };
  
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  onSubmit = e => {
    e.preventDefault();

    var val = Math.floor(10 + Math.random() * 90);
    var passwd = this.state.firstname + "@Guardians" + String(val)
    let formattedDate = moment(this.state.doj).format('DD/MM/YYYY');
    var gender
    if(document.getElementById("Gender").checked === true)
    {
        gender = document.getElementById("Gender").value
    }
    else if(document.getElementById("s").checked === true)
    {
        gender = document.getElementById("s").value
    }


    const newEmp = {
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      phone: this.state.phone,
      Designation: this.state.Designation,
      DependentCount: this.state.DependentCount,
      HighQualification: this.state.HighQualification,
      BasicQualification: this.state.BasicQualification,
      PrimaryQualification: this.state.PrimaryQualification,
      Master: this.state.Master,
      Status: this.state.Status,
      doj: formattedDate,
      dor: this.state.dor,
      Gender: gender,
      password: passwd,
      dept: this.state.dept
    };
    
    this.props.addemp(newEmp);
    
    this.sleep(1000).then(r=>{
      
      if(Object.entries(this.state.errors).length===0)
      {
        alert("Data Insertion Successful")
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
                <b>Insert Employee</b>
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
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.firstname}
                  id="firstname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                <label htmlFor="firstname">firstName</label>
                <span className="red-text">{errors.firstname}</span>
              </div>
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastname}
                  id="lastname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastname
                  })}
                />
                <label htmlFor="lastname">lastName</label>
                <span className="red-text">{errors.lastname}</span>
              </div>
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Designation}
                  id="Designation"
                  type="text"
                  className={classnames("", {
                    invalid: errors.Designation
                  })}
                />
                <label htmlFor="Designation">Designation</label>
                <span className="red-text">{errors.Designation}</span>
              </div>
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Status}
                  error={errors.Status}
                  id="Status"
                  type="text"
                  className={classnames("", {
                    invalid: errors.Status
                  })}
                />
                <label htmlFor="Status">Employment Status</label>
                <span className="red-text">{errors.Status}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.DependentCount}
                  id="DependentCount"
                  type="text"
                  className={classnames("", {
                    invalid: errors.DependentCount
                  })}
                />
                <label htmlFor="DependentCount">DependentCount</label>
                <span className="red-text">{errors.DependentCount}</span>
              </div>
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.dept}
                  error={errors.dept}
                  id="dept"
                  type="text"
                  className={classnames("", {
                    invalid: errors.dept
                  })}
                />
                <label htmlFor="dept">Department</label>
                <span className="red-text">{errors.dept}</span>
              </div>
              <div  onChange={this.onChange1}><b>Gender</b>
        <label htmlFor="Gender" className="l-radio">
          <input type="radio" id="Gender" name="Gender" value= "male"  tabIndex={1} />
          <span>Male</span>
        </label>
        <label htmlFor="s" className="l-radio">
          <input type="radio" id="s" name="Gender" value= "female" tabIndex={2} />
          <span>Female</span>
        </label>
      </div>
              <div className="input-field col s12">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DesktopDatePicker
                        id = "doj"
                        InputProps={{
                          disableUnderline: true
                        }}
                        label="Date Of Joining"
                        inputFormat="dd/MM/yyyy"
                        minDate={moment().toDate()}
                        value={this.state.doj}
                        onChange={this.handleChange}
                        renderInput={(params) => <TextField variant = "standard" style={{width:"510px"}} {...params} />}
                    />
                </LocalizationProvider> 
              </div>
              <div className="App">
      <table>
        <tr>
          <th>Contact Detail</th>
          
        </tr>
        <tr>
          <td><div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.phone}
                  id="phone"
                  type="text"
                  className={classnames("", {
                    invalid: errors.phone
                  })}
                />
                <label htmlFor="phone">Phone</label>
                <span className="red-text">{errors.phone}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                
                <label htmlFor="email">Email</label>
                <span className="red-text">{errors.email}</span>
              </div>

              </td>
              
          
        </tr>
       
      </table>
    </div>
    <div className="App">
      <table>
        <tr>
          <th>Academic Qualification</th>
        </tr>
        <tr>
          <td> 
          <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.PrimaryQualification}
                  id="PrimaryQualification"
                  type="text"
                  className={classnames("", {
                    invalid: errors.PrimaryQualification
                  })}
                />
                <label htmlFor="PrimaryQualification">Primary</label>
                <span className="red-text">{errors.PrimaryQualification}</span>
              </div>
           <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.BasicQualification}
                  id="BasicQualification"
                  type="text"
                  className={classnames("", {
                    invalid: errors.BasicQualification
                  })}
                />
                <label htmlFor="BasicQualification">Secondary(FSC/ICS)</label>
                <span className="red-text">{errors.BasicQualification}</span>
              </div>  
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.HighQualification}
                  id="HighQualification"
                  type="text"
                  className={classnames("", {
                    invalid: errors.HighQualification
                  })}
                />
                <label htmlFor="HighQualification">Bachelors</label>
                <span className="red-text">{errors.HighQualification}</span>
              </div>  
              

           
              
              
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.Master}
                  error={errors.firstname}
                  id="Master"
                  type="text"
                  className={classnames("", {
                    invalid: errors.Master
                  })}
                />
                <label htmlFor="Master">Master/PHD</label>
                <span className="red-text">{errors.Master}</span>
              </div>
              
              
          </td>
        
          
        </tr>
          
        
        
        
      </table>
    </div> 
            {/* <div className="input-field col s12">
             <span> Gender</span>
                <input type="radio" 
                value="male"
                name="Gender"
                checked={this.state.value === "male"}
                onChange={this.onChange}/>
                 <span>Male</span>
                 
                 <input type="radio" 
                value="female"
                name="Gender"
                checked={this.state.value === "female"}
                onChange={this.onChange}/>
                 <span>Female</span>
                 


                 
              </div>
 */}

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
                  Insert
                </button>
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

  addEmployee.propTypes = {
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
    { addemp }
  )(withRouter(addEmployee));