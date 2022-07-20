import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import classnames from "classnames";
import Navbar from "../layout/Navbar";
import { EmpUpdate } from "../../actions/authActions";
import axios from "axios";
import updateImg from "../../images/update.svg"
import TextField from '@mui/material/TextField';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import moment from "moment"


class displayEditInfo extends Component {
  constructor() {
    super();
    this.state = {
      _id:"",
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      Designation: "",
      Status: " ",
      Gender: "",
      DependentCount:"",
      doj:"",
      HighQualification: "",
      BasicQualification: "",
      PrimaryQualification: "",
      Master: "",
      dept:"",
      record:[],
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
  };
  handleChange = (newValue) => {
    this.setState({doj: newValue})
  };

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  onSubmit = e => {
    e.preventDefault();

    let formattedDate = moment(this.state.doj).format('DD/MM/YYYY');

    const newEmp = {
      _id: this.state._id,
      firstname: this.state.firstname,
      lastname: this.state.lastname,
      email: this.state.email,
      Designation: this.state.Designation,
      phone: this.state.phone,
      Status: this.state.Status,
      DependentCount: this.state.DependentCount,
      HighQualification: this.state.HighQualification,
      BasicQualification: this.state.BasicQualification,
      PrimaryQualification: this.state.PrimaryQualification,
      Master: this.state.Master,
      doj: formattedDate,
      Gender: this.state.Gender,
      dept: this.state.dept
    };
    this.props.EmpUpdate(newEmp)
  
    this.sleep(1000).then(r=>{
      
      if(Object.entries(this.state.errors).length===0)
      {
        alert("Data updated Successful")
      }
    })

    this.sleep(1000).then(r=>{
      window.location.href = "/displayData"
    })
  };
  getdatabyID = (_id) =>{
    var obj = {}
    obj['_id'] = _id
    axios.post('/api/users/displayEditInfo', obj).then((response) => {
      const data = response.data.resultArray
      this.setState({ record:data })
      
      this.setState({ _id: this.state.record[0]._id})
      this.setState({ firstname:this.state.record[0].firstname})
      this.setState({ lastname:this.state.record[0].lastname})
      this.setState({ Designation:this.state.record[0].Designation})
      this.setState({ phone:this.state.record[0].phone})
      this.setState({ email:this.state.record[0].email})
      this.setState({ Status:this.state.record[0].Status})
      this.setState({ DependentCount:this.state.record[0].DependentCount})
      this.setState({HighQualification:this.state.record[0].HighQualification})
      this.setState({BasicQualification:this.state.record[0].BasicQualification})
      this.setState({PrimaryQualification:this.state.record[0].PrimaryQualification})
      this.setState({Master: this.state.record[0].Master})
      this.setState({doj: this.state.record[0].formattedDate})
      this.setState({Gender: this.state.record[0].Gender})
      this.setState({dept: this.state.record[0].dept})
    })
  }
  componentDidMount(){
    var pathname = window.location.pathname
    var index = pathname.search('_id')
    const _id = pathname.slice(index + 4)
    this.getdatabyID(_id)
  }

  render() {
    const { errors } = this.state;
    
    return (
      <div>
        <header><Navbar/></header>
      <div className="container" style={{margin:50, marginLeft:300}}>
        <div className="row" style={{ marginLeft:0}}>
          <div className="col s4" >
            <div className="col s12" style={{ paddingLeft: "70px" }}>
              <h2>
                <b>Edit Employee Data</b>
              </h2>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
            <div className="alpha" style={{paddingLeft: 70, paddingRight: 6}}>
              <div className="input-field col s12">
                <input
                  placeholder="First Name"
                  onChange={this.onChange}
                  value={this.state.firstname}
                  error={errors.name}
                  id="firstname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                {/* <label htmlFor="firstname">firstName</label> */}
                <span className="red-text">{errors.firstname}</span>
              </div>
              
              <div className="input-field col s12">
                <input
                  placeholder="Last Name"
                  onChange={this.onChange}
                  value={this.state.lastname}
                  error={errors.lastname}
                  id="lastname"
                  type="text"
                  className={classnames("", {
                    invalid: errors.lastname
                  })}
                />
                {/* <label htmlFor="lastname">lastName</label> */}
                <span className="red-text">{errors.lastname}</span>
              </div>
              
              <div className="input-field col s12">
                <input
                  placeholder="Email"
                  onChange={this.onChange}
                  value={this.state.email}
                  error={errors.email}
                  id="email"
                  type="email"
                  className={classnames("", {
                    invalid: errors.email
                  })}
                />
                
                {/* <label htmlFor="email">Email</label> */}
                <span className="red-text">{errors.email}</span>
              </div>
              <div className="input-field col s12">
                <input
                  placeholder="Phone"
                  onChange={this.onChange}
                  value={this.state.phone}
                  id="phone"
                  type="text"
                  className={classnames("", {
                    invalid: errors.phone
                  })}
                />
                {/* <label htmlFor="phone">Phone</label> */}
                <span className="red-text">{errors.phone}</span>
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
                {/* <label htmlFor="Designation">Designation</label> */}
                <span className="red-text">{errors.Designation}</span>
              </div>

              <div className="input-field col s12">
                <input
                
                  placeholder="Status"
                  onChange={this.onChange}
                  value={this.state.Status}
                  id="Status"
                  type="text"
                  className={classnames("", {
                    invalid: errors.Designation
                  })}
                />
                {/* <label htmlFor="Designation">Designation</label> */}
                <span className="red-text">{errors.Designation}</span>
              </div>
              <div className="input-field col s12">
                <input
                 placeholder="Dependent Count"
                  onChange={this.onChange}
                  value={this.state.DependentCount}
                  id="DependentCount"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                {/* <label htmlFor="DependentCount">DependentCount</label> */}
                <span className="red-text">{errors.firstname}</span>
              </div>
              <div className="input-field col s12">
                <input
                placeholder="Department"
                  onChange={this.onChange}
                  value={this.state.dept}
                  error={errors.dept}
                  id="dept"
                  type="text"
                  className={classnames("", {
                    invalid: errors.dept
                  })}
                />
                {/* <label htmlFor="dept">Department</label> */}
                <span className="red-text">{errors.dept}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  placeholder="Gender"
                  value={this.state.Gender}
                  id="Gender"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                {/* <label htmlFor="Gender">Gender</label> */}
                <span className="red-text">{errors.firstname}</span>
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
                placeholder="Primary Qualification"
                  onChange={this.onChange}
                  value={this.state.PrimaryQualification}
                  id="PrimaryQualification"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                {/* <label htmlFor="PrimaryQualification">Primary</label> */}
                <span className="red-text">{errors.firstname}</span>
              </div>
           <div className="input-field col s12">
                <input
                placeholder="Secondary"
                  onChange={this.onChange}
                  value={this.state.BasicQualification}
                  id="BasicQualification"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                {/* <label htmlFor="BasicQualification">Secondary(FSC/ICS)</label> */}
                <span className="red-text">{errors.firstname}</span>
              </div>  
              <div className="input-field col s12">
                <input
                placeholder="Bachelors"
                  onChange={this.onChange}
                  value={this.state.HighQualification}
                  id="HighQualification"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                {/* <label htmlFor="HighQualification">Bachelors</label> */}
                <span className="red-text">{errors.firstname}</span>
              </div>  
              
              <div className="input-field col s12">
                <input
                placeholder="Master"
                  onChange={this.onChange}
                  value={this.state.Master}
                  error={errors.firstname}
                  id="Master"
                  type="text"
                  className={classnames("", {
                    invalid: errors.firstname
                  })}
                />
                {/* <label htmlFor="Master">Master/PHD</label> */}
                <span className="red-text">{errors.firstname}</span>
              </div>
              
              
          </td>
        
          
        </tr>
          
        
        
        
      </table>
    </div> 
              <div className="input-field col s12">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DesktopDatePicker
                  placeholder="Date of Joining"
                      label="Date Of Joining"
                      inputFormat="dd/MM/yyyy"
                      value={this.state.doj}
                      onChange={this.handleChange}
                      renderInput={(params) => <TextField style={{width:"484px"}} {...params} />}
                  />
                </LocalizationProvider>
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
                 Update
                </button>
              </div>
            </form>
          </div>
            <div class = "col s5" style={{marginLeft: 200, marginTop: 100 }}>
              <img class="responsive-img" src={updateImg} alt="Update"/>
            </div>
        </div>
      </div>
      </div>
    );
  }
}

displayEditInfo.propTypes = {
  displayEditInfo: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { EmpUpdate }
)(withRouter(displayEditInfo));