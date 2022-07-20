import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { UserForgot } from "../../actions/authActions";
import { Alert } from "react-alert"
import classnames from "classnames";
import forgetImg from "../../images/forget.svg"

class forgetPassword extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      errors: {}
    };
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
    alert("Check Your Mail!")

    const userData = {
      email: this.state.email,
    };

    this.props.UserForgot(userData);
  };

  render() {
    const { errors } = this.state;

    return (
      <div className="row" style={{marginTop:'50px',marginLeft:20}}>
        <div className="col s9" style={{marginTop:'50px'}}>
          <div className="col s9" style={{ paddingLeft: "11.250px"}}>
            <h4>
              <b>Password Reset</b>
            </h4>
            <p className="">
              Don't have an account? <Link to="/Register" >Register</Link>
            </p>
          </div>
          <form noValidate onSubmit={this.onSubmit}>
            <div className="input-field col s6">
              <input
                onChange={this.onChange}
                value={this.state.email}
                error={errors.email}
                id="email"
                type="email"
                className={classnames("", {
                  invalid: errors.email || errors.emailnotfound
                })}
              />
              <label htmlFor="email" >Email</label>
              <span className="red-text">
                {errors.email}
                {errors.emailnotfound}
              </span>
            </div>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
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
                className="btn btn-large waves-effect waves-light hoverable blue accent-3">
                Submit
              </button>
            </div>
          </form>
        </div>
          <div class = "col s3" style={{marginTop:'30px'}}>
              <img class="responsive-img" src={forgetImg} alt="Forget"/>
          </div>
      </div>
    );
  }
}

forgetPassword.propTypes = {
  UserForgot: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { UserForgot }
)(forgetPassword);
