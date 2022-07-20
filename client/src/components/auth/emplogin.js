import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { emploginuser } from "../../actions/authActions";
import classnames from "classnames";
import loginImg from  "../../images/login.svg"
import axios from "axios"
import Card from "../card/card"

class EmpLogin extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      dept:"",
      emp:[],
      errors: {}
    };
  }

  componentDidMount() {
    
    if (this.props.auth.isAuthenticated) {
     this.props.history.push("/SelfService");
    }
    // console.log(this.state.email)
  }
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  
  componentWillReceiveProps(nextProps) {
   
    axios
    .post("/api/users/displayEmpData")
    .then((response) => {
      const data = response.data.resultArray
      this.state.dept = data[0].dept
      this.state.status = data[0].Status
    })
    this.sleep(800).then(r=>{
      
      if(nextProps.auth.isAuthenticated && this.state.dept === "accounts"){
        this.props.history.push("/accounts");
      }
      else if(nextProps.auth.isAuthenticated && this.state.dept === "Office Inventory"){
        this.props.history.push("/inventory")
      }
      else if( this.state.status === "Resigned")
      {
        this.props.history.push("/Resigned")
      }
      else {
        this.props.history.push("/SelfService");
      }  
      // if(nextProps.auth.isAuthenticated && this.state.dept !== "accounts") 
    })
    


    if (nextProps.errors) {
      this.setState({
        errors: nextProps.errors
      });
    }
  }
  
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const userData = {
      email: this.state.email,
      password: this.state.password
    };

    this.props.emploginuser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div class="row">
        <div class="container col s12" style={{marginTop:'70px', marginLeft:'50px'}}>    
          <div class="col s5" style={{marginTop:83, marginLeft:170}}>
            <div class="col s12" style={{ paddingLeft: "11.250px"}}>
              <h2>
              <b>Employee</b> Login
              </h2>
              <p class="" style={{marginTop:30}}>
                Are you an HR/admin? if yes <Link to="/Login" >login here</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              <div class="input-field col s7" style={{marginTop: 50}}>
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
                <label htmlFor="email" >Email</label>
                <span class="red-text">
                  {errors.email}
                  {errors.emailnotfound}
                </span>
              </div>
              <div class="input-field col s7">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  class={classnames("", {
                    invalid: errors.password || errors.passwordincorrect
                  })}
                />

                <label htmlFor="password" >Password</label>
                <span class="red-text">
                  {errors.password}
                  {errors.passwordincorrect}
                </span>
              </div>
              
              <div class="col s12" style={{ paddingLeft: "11.250px" }}>
              <p class="" style={{marginLeft: 120}}>
                To change password click on <u><Link to="/ResetPasswordEmp">Change</Link></u> 
                </p>
                <button
                  style={{
                    background: "#4169E1",
                    color: 'white',
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "2rem"
                  }}
                  type="submit"
                  class="btn btn-large waves-effect waves-light hoverable accent-3"
                >
                  Login
                </button>
              </div>
            </form>
          </div>
            <div class = "col s3" style={{ marginLeft: '50px'}}>
              <Card/>
            </div>
        </div>
      </div>
    );
  }
}

EmpLogin.propTypes = {
  emploginuser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { emploginuser }
)(EmpLogin);