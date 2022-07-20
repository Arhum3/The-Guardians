import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import loginImg from  "../../images/login.svg"
import Card from "../card/card"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentDidMount() {
    // If logged in and user navigates to Login page, should redirect them to dashboard
    if (this.props.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.auth.isAuthenticated) {
      this.props.history.push("/dashboard");
    }

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

    this.props.loginUser(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div class="row" style={{paddingLeft:'15px'}}>
        <div class="container col s12" style={{marginTop:'70px', marginLeft:'40px'}}>    
          <div class="col s5" style={{marginTop:75,marginLeft:170}}>
            <div class="col s12" style={{ paddingLeft: "11.250px" }}>
              <h2>
                <b>HR</b> Login
              </h2>
              <p class="" style={{marginTop:30}}>
                Don't have an account? <Link to="/Register" >Register</Link>
              </p>
              <p class="">
                Are you an employee? if yes <Link to="/emplogin" >login here</Link>
              </p>
            </div>
            <form noValidate onSubmit={this.onSubmit} >
              <div class="input-field col s7"  style={{marginTop: 20}}>
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
              <div class="input-field col s7" style={{marginTop: 20}}>
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


              <div class="col s12" style={{ paddingLeft: "11.250px"}}>
              <p class="" style={{marginLeft: 200}}>
                Forget password? <Link to="/forgetPassword">Reset</Link> 
                </p>
                <button
                  style={{
                    background:'#4169E1',
                    color: "white",
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
            <div class = "col s3" style={{ marginLeft: '50px', marginTop:'0'}}>
              <Card/>
            </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  loginUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Login);