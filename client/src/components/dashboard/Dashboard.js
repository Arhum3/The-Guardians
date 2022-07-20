import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";
import Navbar from "../layout/Navbar";
import Todo from "./todo"
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'
// import minCard from "../layout/card/card";
import Card from "../card/card";
import Grid from '@mui/material/Grid';
import Item from '@material-ui/core/ListItem'
import Demo from '../layout/chatBox'
import Calendar from '../layout/calendar'
import BigCalendar from '../layout/calendar copy'

// import Sidebar from "../Sidebar/sidebar";
// import { Router,Route } from "express";
// import SideNav, { Toggle, Nav, NavItem, NavIcon, NavText } from '@trendmicro/react-sidenav';
// import Home from "../Home/Home";
// import e from 'express';

class Dashboard extends Component {
  
  constructor() {
    super();
    this.state = {
      res:"",
      count:0,
      url:"",
      errors: {}
    };
  }
  onLogoutClick = e => {
    e.preventDefault();
    this.props.logoutUser();
  
  };
  

  render() {
    const { user } = this.props.auth;    

    return ( 
      <div>
        <Navbar/>
        <Grid container spacing={1} style={{marginTop:'0', marginLeft:'180px'}}>
          <Grid item xs={12} >
            <Item style={{marginLeft:100}}><h3>Scheduler</h3></Item>
            <Item style={{width:"100%", maxWidth:"100%"}}><BigCalendar/></Item>
          </Grid>          
        </Grid>
        
      </div>
    );
  }
}

Dashboard.propTypes = {
  logoutUser: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Dashboard);
