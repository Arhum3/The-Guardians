import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { resetPassword } from "../../actions/authActions";
import classnames from "classnames";
import forgetImg from "../../images/forget.svg"

class ResetPassword extends Component {
  constructor() {
    super();
    this.state = {
      password: "",
      password2: "",
      errors: {},
      message: {}
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

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  onSubmit = e => {
    e.preventDefault();

    const newPassForUser = {
      password: this.state.password,
      password2: this.state.password2,
    };
    
    this.props.resetPassword(newPassForUser, this.props.history)
    
    this.sleep(1000).then(r=>{
      
      if(Object.entries(this.state.errors).length===0)
      {
        alert("Password Reset Success")
      }
    })
  };

  render() {
    
    const { errors } = this.state;
    return (
      <div className="container" style={{margin:50}}>
        <div className="row">
          <div className="col s4" >
            <Link to="/login" className="btn-flat waves-effect">
              <i className="material-icons left">keyboard_backspace</i> Back to
              home
            </Link>
            <div className="col s12" style={{ paddingLeft: "11.250px" }}>
              <h4>
                <b>Reset Password</b>
              </h4>
            </div>
            <form noValidate onSubmit={this.onSubmit}>
              
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password}
                  error={errors.password}
                  id="password"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password
                  })}
                />
                <label htmlFor="password">Enter new Password</label>
                <span className="red-text">{errors.password}</span>
              </div>
              <div className="input-field col s12">
                <input
                  onChange={this.onChange}
                  value={this.state.password2}
                  error={errors.password2}
                  id="password2"
                  type="password"
                  className={classnames("", {
                    invalid: errors.password2
                  })}
                />
                <label htmlFor="password2">Confirm Password</label>
                <span className="red-text">{errors.password2}</span>
              </div>
              <div className="col s12" style={{ paddingLeft: "11.250px" }}>
                <button
                  style={{
                    width: "150px",
                    borderRadius: "3px",
                    letterSpacing: "1.5px",
                    marginTop: "1rem"
                  }}
                  type="submit"
                  className="btn btn-large waves-effect waves-light hoverable blue accent-3"
                >
                  Change
                </button>
              </div>
            </form>
          </div>
          <div class = "col s5" style={{marginLeft: '200px', marginTop:'30px'}}>
              <img class="responsive-img" src={forgetImg} alt="Reset"/>
          </div>
        </div>
      </div>
    );
  }
}

ResetPassword.propTypes = {
  resetPassword: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { resetPassword }
)(withRouter(ResetPassword));
