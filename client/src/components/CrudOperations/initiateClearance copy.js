import React, { Component, useState } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Navbar from "../layout/Navbar";
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/ListItem'
import DatePickers from "./datetextbox"
import TextField from '@mui/material/TextField';
import exitimg from "../../images/exit.svg"
import { empClearance } from "../../actions/authActions";

class initiateClearance extends Component{
    constructor(){
        super();
        this.setState={
            email:"",
            Designation:"",
            errors:{}
        };
    }

    onChange = (e) =>{
        this.setState({ [e.target.id]: e.target.value });
    };
    
    onSubmit = e => {
        e.preventDefault();

        const clearanceData = {
            email: this.state.email,
            Designation: this.state.Designation
        };

        this.props.empClearance(clearanceData);
    };
    onChangePCR = e =>{
        console.log(e.target.value)
    };

    render(){
        //const { errors } = this.state;
        
        return(
            <div>
                <header><Navbar/></header>
                <Grid container spacing={1} style={{marginTop: 50}}>
                    <Grid item xs={3} style={{ marginLeft:'300px'}}>
                        <Item>
                            <h2><b>Resignation Procedure</b></h2>
                        </Item>
                    
                    <form noValidate onSubmit={this.onSubmit}>
                        <Item>
                            <div class="input-field col s12" style={{width:"363px"}}>
                                <input
                                // onChange={this.onChange}
                                //value={this.state.email}
                                //error={errors.email}
                                id="email"
                                type="email"
                                // class={classnames("", {
                                //     invalid: errors.email || errors.emailnotfound
                                // })}
                                />
                                <label htmlFor="email" >Email</label>
                                <span class="red-text">
                                {/* {errors.email} */}
                                {/* {errors.emailnotfound} */}
                                </span>
                            </div>
                        </Item>
                        <Item>
                            <div class="input-field col s12" style={{width:"363px"}}>
                                <input
                                // onChange={this.onChange}
                                // value={this.state.Designation}
                                // error={errors.Designation}
                                id="Designation"
                                type="text"
                                // class={classnames("", {
                                //     invalid: errors.Designation || errors.Designation
                                // })}
                                />
                                <label htmlFor="Designation" >Designation</label>
                                <span class="red-text">
                                {/* {errors.Designation} */}
                                </span>
                            </div>
                        </Item>
                        <Item><h5>Date of relieving</h5></Item>
                        <Item>
                            <DatePickers/>    
                        </Item>
                        <Item><h5>Reason for Resignation</h5></Item>
                        <Item>
                            <TextField id = "outlined-multiline-static"
                            label="Enter"
                            multiline
                            rows={3}
                            style={{width:"363px"}}
                            />  
                        </Item>
                        <Item style={{marginTop:50}}><h4>Performance, Comments and Rating</h4></Item>
                        <Item>
                            <h6><b>Quality of Work</b></h6>
                            <p>
                                <label>
                                    <input type="checkbox" id = "Good" name = "Good" value={10} onChange={this.onChangePCR}/>
                                    <span style={{fontWeight:'300', color: 'black' }}><b>Good</b></span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" id = 'pcr' name = 'pcr' value={6} onChange={this.onChangePCR}/>
                                    <span style={{fontWeight:'300', color: 'black' }}><b>Average</b></span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" id = 'pcr' name = 'pcr' value={3} onChange={this.onChangePCR}/>
                                    <span style={{fontWeight:'300', color: 'black' }}><b>Poor</b></span>
                                </label>
                            </p>
                        </Item>
                        <Item>
                            <h6 style={{marginRight:15.6}}><b>Punctuality</b></h6>
                            <span></span>
                            <p>
                                <label>
                                    <input type="checkbox" id = 'Good' name = 'Good' value={10} onChange={this.onChangePCR}/>
                                    <span style={{fontWeight:'300', color: 'black' }}><b>Good</b></span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" id = 'Average' name = 'Average' value={6} onChange={this.onChangePCR}/>
                                    <span style={{fontWeight:'300', color: 'black' }}><b>Average</b></span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" id = 'Poor' name = 'Poor' value={3} onChange={this.onChangePCR}/>
                                    <span style={{fontWeight:'300', color: 'black' }}><b>Poor</b></span>
                                </label>
                            </p>
                        </Item>
                        <Item>
                            <h6 style={{marginRight:32}}><b>Team work</b></h6>
                            <p>
                                <label>
                                    <input type="checkbox" id = 'Good' name = 'Good' value={10} onChange={this.onChangePCR}/>
                                    <span style={{fontWeight:'300', color: 'black' }}><b>Good</b></span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" id = 'Average' name = 'Average' value={6} onChange={this.onChangePCR}/>
                                    <span style={{fontWeight:'300', color: 'black' }}><b>Average</b></span>
                                </label>
                            </p>
                            <p>
                                <label>
                                    <input type="checkbox" id = 'Poor' name = 'Poor' value={3} onChange={this.onChangePCR}/>
                                    <span style={{fontWeight:'300', color: 'black' }}><b>Poor</b></span>
                                </label>
                            </p>
                        </Item>
                        <Item>
                            <p style={{fontSize: 16}}><b>Total of Factor Ratings:</b></p>
                            <div class = "input-field inline">
                                <input id="score_inline" type="text" class="validate"/>
                            </div>
                        </Item>
                        <Item><h4>Personal Traits</h4></Item>
                        <Item>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Particulars</th>
                                        <th>Good</th>
                                        <th>Average</th>
                                        <th>Poor</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Integrity and Reliability</td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox"/>
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox"/>
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Acceptance of Responsibility</td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Knowledge of Work</td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Oral Communication Skills</td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Initiative and drive</td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Output to assignments</td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td>Amenability to Discipline</td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                        <td>
                                            <p>
                                                <label>
                                                    <input type="checkbox" />
                                                    <span style={{fontWeight:'300', color: 'black'}}></span>
                                                </label>
                                            </p>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </Item>
                        <Item>
                            <p style={{fontSize: 16}}><b>Total Score:</b></p>
                            <div class = "input-field inline">
                                <input id="score_inline" type="text" class="validate"/>
                            </div>
                        </Item>
                        <Item><h5>HR's Remarks</h5></Item>
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
                    </Grid>
                    <Grid item xs={6}>
                        <Item style={{marginTop:'10rem'}}>
                            <img class="responsive-img" src={exitimg} alt="Resignation"/>
                        </Item>
                    </Grid>
                </Grid>
            </div>
        )
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