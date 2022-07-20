import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import React, { useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import Grid from '@material-ui/core/Grid';
import Item from '@material-ui/core/ListItem'
import 'react-calendar/dist/Calendar.css'
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import ProfileCard from './ProfileCard/ProfileCard'

const locales = {
    "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
    format,
    parse,
    startOfWeek,
    getDay,
    locales,
});
const events = [];

function BigCalendar() {
    const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "", color:""});
    const [allEvents, setAllEvents] = useState(events);
    //const [color, setColor] = useState("")
    function handleAddEvent() {
        setAllEvents([...allEvents, newEvent]);
        
    }

    return (
        <div className="App">
            <Grid container spacing={1} style={{ marginLeft:70,width:'100%', maxWidth:'100%'}}>
                <Grid item xs={3}>
                    <Item>
                        <input style={{width: "100%"}} type="text" placeholder="Add Title" value={newEvent.title} onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })} />
                    </Item>
                    <Item style={{position:'relative', zIndex:1200}}>   
                        {/* <DateTimePicker style={{width: "100%", marginTop:5}} placeholderText="Start Date" value={newEvent.start} onChange={(start) => setNewEvent({ ...newEvent, start })} /> */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                renderInput={(params) => <TextField variant='standard' style={{width:"100%"}} {...params} />}
                                inputFormat="MM/dd/yyyy"
                                disablePast
                                InputProps={{
                                    disableUnderline: true
                                }}
                                label="Start Date"
                                value={newEvent.start}
                                onChange={(start) => setNewEvent({ ...newEvent, start })}
                            />
                        </LocalizationProvider> 
                    </Item>
                    <Item style={{position:'relative', zIndex:999}}>    
                        {/* <DateTimePicker style={{width: "100%", marginTop:5}} placeholderText="End Date" value={newEvent.end} onChange={(end) => setNewEvent({ ...newEvent, end })} /> */}
                        <LocalizationProvider dateAdapter={AdapterDateFns}>
                            <DatePicker
                                renderInput={(params) => <TextField variant='standard' style={{width:"100%"}} {...params} />}
                                inputFormat="MM/dd/yyyy"
                                disablePast
                                InputProps={{
                                    disableUnderline: true
                                }}
                                label="End Date"
                                value={newEvent.end}
                                onChange={(end) => setNewEvent({ ...newEvent, end })
                                }
                            />
                        </LocalizationProvider>
                    </Item>
                    <Item>
                        <button style={{
                            background: "#4169E1",
                            color: 'white',
                            width: "150px",
                            borderRadius: "3px",
                            letterSpacing: "1.5px",
                            marginTop: "2rem"
                        }}
                        type="submit"
                        class="btn btn-medium waves-effect waves-light hoverable accent-3" onClick={handleAddEvent}>
                            Add Event
                        </button>
                    </Item>
                    <Item style={{marginTop:15, marginLeft:20}}>
                        <ProfileCard/>
                    </Item>
                </Grid>
                <Grid Item xs={9}>
                    <Item>
                        <Calendar
                        localizer={localizer}
                        events={allEvents}
                        startAccessor="start"
                        endAccessor="end"
                        //onSelectEvent={e=>delEvent(e)}
                        style={{ height: 600, marginLeft: "100px", width:900}}
                    />
                    </Item>
                </Grid>
            </Grid>
        </div>
    );
}

export default BigCalendar;