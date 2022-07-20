import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { display } from "../../actions/authActions";
import loginImg from "../../images/login.svg"
import axios from "axios";
import "./table.css";
import deletelogo from "./bin.png";
//import editLogo from "./pencil.png";
import Navbar from "../layout/Navbar";
import * as BsIcons from 'react-icons/bs';
import * as IoIcons from 'react-icons/io';

class displayData extends Component {

  constructor() {
    super()
    this.state = {
      errors: {},
      employees: [],
      check: "1",
      lname: "1",
      fname: "1",
      email: "1",
      desi: "1",
      status: "1",
      date: "1",
      gender: "1",
      phone: "1",
      dept: "1",
      dc: "1",
      dor: "1"
    
    };
  }
  onChange = e => {
    this.setState({ [e.target.id]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    //this.props.display(this.state.posts);
  };
  getdata = () => {
    axios
      .post("/api/users/displayData")
      .then((response) => {
        const data = response.data.resultArray
        //const employeeName = response.data.user.temp.firstname
        this.setState({ employees: data })
      })
  }
  showfirstname = () => {
    if(this.state.check === "1") 
    {
      this.setState({check : 
        "0"})

    }
    else{
      this.setState({check : 
        "1"})
    }
  }
  showlastname = () => {
    if(this.state.lname === "1") 
    {
      this.setState({lname : 
        "0"})

    }
    else{
      this.setState({lname : 
        "1"})
    }console.log(this.state.lname)
  }
  showemail = () => {
    if(this.state.email === "1") 
    {
      this.setState({email : 
        "0"})

    }
    else{
      this.setState({email: 
        "1"})
    }console.log(this.state.email)
  }
  showdesignation = () => {
    if(this.state.desi === "1") 
    {
      this.setState({desi : 
        "0"})

    }
    else{
      this.setState({desi : 
        "1"})
    }console.log(this.state.desi)
  }
  showstatus = () => {
    if(this.state.status === "1") 
    {
      this.setState({status: 
        "0"})

    }
    else{
      this.setState({status : 
        "1"})
    }console.log(this.state.status)
  }
  showdateofjoining = () => {
    if(this.state.date === "1") 
    {
      this.setState({date: 
        "0"})

    }
    else{
      this.setState({date : 
        "1"})
    }console.log(this.state.date)
  }
  showgender = () => {
    if(this.state.gender === "1") 
    {
      this.setState({gender: 
        "0"})

    }
    else{
      this.setState({gender : 
        "1"})
    }console.log(this.state.gender)
  }
  showphone = () => {
    if(this.state.phone === "1") 
    {
      this.setState({phone: 
        "0"})

    }
    else{
      this.setState({phone : 
        "1"})
    }console.log(this.state.phone)
  }
  showdept = () => {
    if(this.state.dept === "1") 
    {
      this.setState({dept: 
        "0"})

    }
    else{
      this.setState({dept : 
        "1"})
    }console.log(this.state.dept)
  }
  showfathername = () => {
    if(this.state.fname === "1") 
    {
      this.setState({fname : 
        "0"})

    }
    else{
      this.setState({fname : "1"})
    }console.log(this.state.fname)
  }

  componentDidMount() {

    this.getdata()

  }
  showdc = () => {
    if(this.state.dc === "1") 
    {
      this.setState({dc: 
        "0"})

    }
    else{
      this.setState({dc : 
        "1"})
    }console.log(this.state.dc)
  }
  showdor = () => {
    if(this.state.dor === "1") 
    {
      this.setState({dor: 
        "0"})

    }
    else{
      this.setState({dor : 
        "1"})
    }console.log(this.state.dor)
  }
  render() {
    return (
      <div>
         <header><Navbar/></header>
        <form noValidate onSubmit={this.onSubmit}>
        </form>
        <div className="Container">
        <p className="tb">
        <label>
                                            <input type="checkbox" onChange={this.showfirstname}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>FirstName</span>
                                        </label>
                                        <label>
                                            <input type="checkbox" onChange={this.showlastname} />
                                            <span style={{fontWeight:'300', color: 'black'}}>LastName</span>
                                        </label>
                                       
                                        <label>
                                            <input type="checkbox" onChange={this.showemail}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>Email</span>
                                        </label>
                                        <label>
                                            <input type="checkbox" onChange={this.showphone}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>Phone</span>
                                        </label>
                                        <label>
                                            <input type="checkbox" onChange={this.showdesignation}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>Designation</span>
                                        </label>
                                        <label>
                                            <input type="checkbox" onChange={this.showstatus}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>Status</span>
                                        </label>
                                        <label>
                                            <input type="checkbox" onChange={this.showdept}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>Department</span>
                                        </label>
                                        <label>
                                            <input type="checkbox" onChange={this.showdateofjoining}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>DateofJoining</span>
                                        </label>
                                      
                                        <label>
                                            <input type="checkbox" onChange={this.showgender}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>Gender</span>
                                        </label>
                                        
                                        <label>
                                            <input type="checkbox" onChange={this.showdor}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>Date of Resign</span>
                                        </label>
                                        
                                        <label>
                                            <input type="checkbox" onChange={this.showdc}/>
                                            <span style={{fontWeight:'300', color: 'black'}}>DependentCount</span>
                                        </label>
          </p>
          <table class="tb">
 

            <thead>
              <tr>
              {this.state.check==="1" && 
                <th className="th">First Name</th>
                }
                 {this.state.lname ==="1" &&      
                <th className="th">Last Name</th>
              }
            
               {this.state.email==="1" &&     
                <th className="th">Email</th>
            }

                 {this.state.phone ==="1" &&     
                <th className="th">Phone</th>
            }
                 {this.state.desi ==="1" && 
                <th className="th">Designation</th>
          }
                 {this.state.dept ==="1" &&     
                <th className="th">Department</th>
            }
                 {this.state.status ==="1" && 
                <th className="th">Status</th>
        } 
        {this.state.dc==="1" && 
        <th className="th">DependentCount</th>}
                {this.state.date ==="1" && 
                <th className="th">DateofJoining</th>}

{this.state.dor ==="1" && 
                <th className="th">DateofResign</th>}

                {this.state.gender ==="1" && 
                <th className="th">Gender</th>}
  {/* <th className="th">Delete</th> */}
                <th className="th">Edit</th>
              </tr>
            </thead>
            {this.state.employees.map(r =>
              
                <tbody>
                  <tr>
                    
                  {this.state.check==="1" && <td className="tdd">{r.firstname}</td>}
                  {this.state.lname==="1" &&<td className="tdd">{r.lastname}</td>}
             
                    {this.state.email==="1" &&<td className="tdd">{r.email}</td>}
                    {this.state.phone==="1" &&<td className="tdd">{r.phone}</td>}
                    {this.state.desi==="1" &&<td className="tdd">{r.Designation}</td>}
                    {this.state.dept==="1" &&<td className="tdd">{r.dept}</td>}
                    {this.state.status==="1" &&<td className="tdd">{r.Status}</td>}
                    {this.state.dc==="1" &&<td className="tdd">{r.DependentCount}</td>}
                    {this.state.date==="1" &&<td className="tdd">{r.doj}</td>}
                    {this.state.dor==="1" &&<td className="tdd">{r.dor}</td>}
                    {this.state.gender==="1" &&<td className="tdd">{r.Gender}</td>}
                    {/* <td className="tdd"><BsIcons.BsFillTrashFill size={30} color='#E84B23' onClick={()=>{if(window.confirm('Are you sure you wish to delete this item?'))deleteUser(r.email)}} /></td>  */}
                    <td className="tdd"><Link to= {`./displayEditInfo/_id=${r._id}`}><BsIcons.BsPencilSquare size={30}  onClick={this.displayEditInfo}/></Link></td>
                  </tr>
                </tbody>            
            )}
          </table>
        </div>
      </div>
    );
  }

};
const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { display }
)(withRouter(displayData));