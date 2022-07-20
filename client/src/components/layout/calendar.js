// import React from 'react';
// import "@mobiscroll/react/dist/css/mobiscroll.min.css"
// import { Eventcalendar, getJson } from '@mobiscroll/react';

// function Calendar() {

//     const [myEvents, setEvents] = React.useState([]);

//     React.useEffect(() => {
//         getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
//             setEvents(events);
//         }, 'jsonp');
//     }, []);
    
//     const responsive = React.useMemo(() => {
//         return {
//             small: {
//                 view: {
//                     calendar: {
//                         type: 'week',
//                     },
//                     agenda: {
//                         type: 'day'
//                     }
//                 }
//             },
//             custom: { // Custom breakpoint
//                 breakpoint: 600,
//                 view: {
//                     calendar: {
//                         labels: true
//                     }
//                 }
//             }
//         };
//     }, []);

//     return (
//         <div style = {{width:'100%'}}>
//         <Eventcalendar
//             theme="ios" 
//             themeVariant="light"
//             clickToCreate={false}
//             dragToCreate={false}
//             dragToMove={false}
//             dragToResize={false}
//             data={myEvents}
//             responsive={responsive}
       
//        />
//        </div>
//     ); 
// }

// export default Calendar;
import { Eventcalendar, getJson, toast } from '@mobiscroll/react';
import "@mobiscroll/react/dist/css/mobiscroll.min.css"
import React from "react"

function Calendar() {
    const [myEvents, setEvents] = React.useState([]);
    const [showForm, setShowForm] = React.useState(false);
    

    React.useEffect(() => {
        // getJson('https://trial.mobiscroll.com/events/?vers=5', (events) => {
        //     setEvents(events);
        //     console.log(events)
        // }, 'jsonp');
    }, []);
    
    const onEventClick = React.useCallback((event) => {
        setShowForm(!showForm)
        toast({
            message: event.event.title
        });
    }, []);
    
    const view = React.useMemo(() => {
        return {
            calendar: { type: 'month' },
            agenda: { type: 'month' }
        };
    }, []);

    return (
        <div style={{width:'100%', height:550, borderRadius:'50px'}}>
        <Eventcalendar
            theme="ios" 
            themeVariant="light"
            clickToCreate={false}
            dragToCreate={false}
            dragToMove={false}
            dragToResize={false}
            data={myEvents}
            view={view}
            onEventClick={onEventClick}
       />
       {/* {showForm && (
        <form>
          <h1>henlo g</h1>
        </form>
      )} */}
        
       </div>
    ); 
}
export default Calendar