import React from 'react'
import Calender from "react-calendar";
import guardian from "../../images/guardian.png";
import ProfileCard from "../layout/ProfileCard/ProfileCard"
//import 'react-calendar/dist/Calendar.css';
import './Calender.css'
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/ListItem'

function card() {
    return (
      <div>
        <Grid container spacing={1} justifyContent="center" style={{marginTop:'50px', marginLeft:'70px'}}>
          <Grid item xs={12}>
            <Item>
              <div class="card">
                <div class="card-image waves-effect waves-block waves-light">
                  <img class="activator" src={guardian}/>
                </div>
                <div class="card-content">
                  <span class="card-title activator grey-text text-darken-4"><b>About Us</b><i class="material-icons right">more_vert</i></span>
                </div>
                <div class="card-reveal">
                  <span class="card-title grey-text text-darken-4">About Us<i class="material-icons right">close</i></span>
                  <p>Guardian is the automated system designed to assist Human Resources Department</p>
                </div>
              </div>
            </Item>
          </Grid>
          {/* <Grid item xs={3} style={{ marginLeft: '20px', marginTop: '10px'}}>
            <Item>
              <ProfileCard/>
            </Item>
          </Grid>
          <Grid item xs={3} style={{marginTop:'10px', marginLeft: '20px'}}>
            <Item>
            <Calender classname="calender-card"/>    
            </Item>
          </Grid> */}
        </Grid>
      </div>
    )
}

export default card
