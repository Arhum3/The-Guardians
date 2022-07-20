import axios from "axios"
import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import EmpNavbar from "../layout/EmployeeNavbar";
import 'react-calendar/dist/Calendar.css';
import Demo from '../layout/chatBox'

class SelfService extends Component {
  
  constructor() {
    super()
    this.state = {
      errors: {},
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
      designation: "",
      doj:"",
      status:"",
      dept:"",
      Leaves:"",
      employee: []
    };
  }
    onLogoutClick = e => {
        e.preventDefault();
        this.props.logoutUser();
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
        this.setState({Leaves: this.state.employee[0].Leaves})
      })
    }
    componentDidMount()
    {
      
      this.getEmpData()
    }

    render() {
        return (
          <div>
          <EmpNavbar/>
          <div className="container">
          <div className="main-body">
            
                <div className="row gutters-sm" style={{marginTop: '80px', marginLeft:80}}>
                  <div className="col-md-4 mb-3">
                    <div className="card">
                      <div className="card-body">
                        <div className="d-flex flex-column align-items-center text-center">
                          <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Admin" className="rounded-circle" width="150"/>
                          
                          <div className="mt-3">
                            <h4><span>{this.state.firstname +" "+ this.state.lastname}</span></h4>
                            <p className="text-secondary mb-1">{this.state.Designation}</p>
                            <p className="text-muted font-size-sm">FAST NUCES, CFD</p>
                            
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="card mt-3">
                      <ul className="list-group list-group-flush">
                        
                      </ul>
                    </div> */}
                  </div>
                  <div className="col-md-8">
                    <div className="card mb-3">
                      <div className="card-body">
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">First Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.firstname}
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Last Name</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.lastname}
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Email</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.email}
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Phone</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.phone}
                          </div>
                        </div>
                        <hr/>
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Designation</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.Designation}
                          </div>
                        </div>
                        <hr/>
                        
                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Status</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.status}
                          </div>
                        </div>
                        <hr/>

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Date of Joining</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.doj}
                          </div>
                        </div>
                        <hr/>

                        <div className="row">
                          <div className="col-sm-3">
                            <h6 className="mb-0">Department</h6>
                          </div>
                          <div className="col-sm-9 text-secondary">
                            {this.state.dept}
                          </div>
                        </div>
                        <hr/>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <Demo/>
          </div>
        );
    }
}

// SelfService.propTypes = {
//     logoutUser: PropTypes.func.isRequired,
//     auth: PropTypes.object.isRequired
// };

// const mapStateToProps = state => ({
//     auth: state.auth
// });

// export default connect(
//     mapStateToProps,
//     { logoutUser }
// )(SelfService);
export default SelfService