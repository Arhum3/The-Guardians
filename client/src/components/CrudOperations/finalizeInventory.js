import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import classnames from "classnames";
import { connect } from "react-redux";
import InvNavbar from "../layout/inventoryNavbar";
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/ListItem'
import DatePickers from "./datetextbox"
import TextField from '@mui/material/TextField';
import exitimg from "../../images/exit.svg"
import axios from 'axios'

class finalizeInventory extends Component {
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
      remarks : "",
      employee:[],
      invResponse:"",
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
    .post("/api/users/displayAccEmpData" )
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
        this.setState({status: this.state.employee[0].Status})
      }
    })
  }

  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }

  onSubmit = e => {
    e.preventDefault();

    var x
    if(document.getElementById("yes").checked === true)
    {
        x = document.getElementById("yes").value
    }
    else if(document.getElementById("no").checked === true)
    {
        x = document.getElementById("no").value
    }

    const clearanceData = {
      email: this.state.email,
      phone: this.state.phone,
      Designation: this.state.Designation,
      Status: this.state.Status,
      doj: this.state.doj,
      invResponse: x
    };
    
    // this.props.empAccClearance(clearanceData)
    let res = ""
    axios
    .post("/api/users/inventoryClearance", clearanceData)
    .then((response)=>{
        const data = response.data.invRes
        res = data["res"]
    })
    this.sleep(1000).then(r=>{
        
        if(Object.entries(this.state.errors).length===0 && x === "yes")
        {
            alert("Application has been transferred to Inventory")
        }
        else if(Object.entries(this.state.errors).length===0 && res === "no")
        {
            alert("It seems that designated employee still has office inventory registered under his name, Mailing the response to employee")
        }
    })
  };
  

  render() {
    const { errors } = this.state;
    
    return (
      <div>
        <InvNavbar />
        <Grid container spacing={1} style={{marginTop: 50}}>
            <Grid item xs={3} style={{ marginLeft:'300px'}}>
                <Item>
                    <h4><b>Employee Information</b></h4>
                </Item>
            
            <form noValidate onSubmit={this.onSubmit}>
                <Item>
                    <div class="input-field col s12" style={{width:"363px"}}>
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
                        placeholder = "Designation"
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
                    <div class="input-field col s12" style={{width:"363px"}}>
                        <input
                        onChange={this.onChange}
                        placeholder = "Phone"
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
                        placeholder = "Status"
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
                <Item><h4>Office Inventory</h4></Item>
                <Item><h5>Remarks</h5></Item>
                <Item>
                    <TextField id = "outlined-multiline-static"
                    label="Enter"
                    multiline
                    rows={3}
                    style={{width:"363px"}}
                    />  
                </Item>
                <Item>
                    <table>
                        <thead>
                            <tr>
                                <th><h5>Collectibles</h5></th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td><b>Laptop, Stationary, Other Office Accessories returned</b></td>
                                <td>
                                    <p>
                                        <label>
                                            <input type="checkbox" id="yes" name="yes" value="yes"/>
                                            <span style={{fontWeight:'300', color: 'black'}}>Yes</span>
                                        </label>
                                    </p>
                                </td>
                                <td>
                                    <p>
                                        <label>
                                            <input type="checkbox" id="no" name="no" value="no"/>
                                            <span style={{fontWeight:'300', color: 'black'}}>No</span>
                                        </label>
                                    </p>
                                </td>
                            </tr>
                        </tbody>
                    </table>
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
            </Grid>
            <Grid item xs={6}>
                <Item style={{marginTop:'15rem'}}>
                    <img class="responsive-img" src={exitimg} alt="Resignation"/>
                </Item>
            </Grid>
        </Grid>
      </div>
    );
  }
}

//   export default connect(
//     mapStateToProps,
//     { empClearance }
//   )(withRouter(finalizeAccounts));

export default finalizeInventory;