import React, { Component } from 'react';
import { Link, withRouter } from "react-router-dom";
import Navbar from "../layout/Navbar";
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/ListItem'
import { useForm } from "react-hook-form"
import "./table2.css";
import axios from "axios"
import recruitimg from "../../images/recruit.svg"
import * as XLSX from 'xlsx';
import DataTable from 'react-data-table-component';
export default class recruit extends Component {
  constructor() {
    super();
    this.state = {
      Skill:"",
      columns:"",
      data:"",
      profiles:[],
      errors:{}
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };
  sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
  }
  
  formValidation = () =>{
    const{Skill} = this.state
    let isValid = true
    const errors={}
    if(Skill.trim().length === 0){
      errors.skill = "This field is required!"
      isValid = false
    }
    else if(!isNaN(Skill))
    {
      errors.skill = "This field should be a string"
      isValid = false
    }
    this.setState({errors})
    return isValid
  }
  onSubmit = e => {
    e.preventDefault();
    const isValid = this.formValidation()   
    if(isValid){
      const exp = {
        Skill: this.state.Skill
      };
      axios
      .post("/api/users/Recruitment", exp).then((res)=>{
        const data = res.data.dataobj
        this.setState({profiles: data})
      })
      
      this.sleep(200).then(r=>{
        alert("Skill stored")
      })
    }
  };
  render() {
    const {errors} = this.state
    return <div>
    <header><Navbar/></header>
    <Grid container spacing={1} style={{marginTop: 50}}>
            <Grid item xs={3} style={{ marginLeft:'300px'}}>
                <Item>
                    <h4><b>Recruitment</b></h4>
                </Item>
                <form noValidate onSubmit={this.onSubmit}>
                <Item>
                    <div class="input-field col s12" style={{width:"363px"}}>
                        <input
                        onChange={this.onChange}
                        value={this.state.Skill}
                        id="Skill"
                        type="text"/>
                        <label htmlFor="Skill">Enter Skill</label>
                        <span className="red-text">{errors.skill}</span>
                    </div>
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
                    Search
                </button>
            </form>
            </Grid>
            <Grid item xs={3} style={{marginLeft:50}}>
            <Item>
              <img class="responsive-img" src={recruitimg} alt="Recruit"/>
              </Item>
            </Grid>
            <Grid item xs={12}>
              
              <Item>
                <table class="tb">
                  <thead>
                <tr>
                    <th>Name</th>
                    <th>Experience</th>
                    <th>Education</th>
                    <th>Profile_Link</th>
                </tr></thead>
              <tbody>
                {this.state.profiles.map(item => {
                  return <tr>
                        <td>{item.Name}</td>
                        <td>{item.experience}</td>
                        <td>{item.education}</td>
                        <td>{item.Profile_Link}</td>
                    </tr>
                })}
              </tbody>
              </table>
              </Item>
            </Grid>
        </Grid>
    </div>;
  }
}
