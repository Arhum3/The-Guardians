import React, { useState, useEffect } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { SidebarData } from './SidebarData';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import setAuthToken from "../../utils/setAuthToken";
import { FaBell } from 'react-icons/fa';
import { Dropdown } from 'react-bootstrap'
import axios from 'axios'

function Navbar() {
  const [sidebar, setSidebar] = useState(true);
  const [url, setUrl] = useState("")
  const [res, setRes] = useState("")
  const [leaveUrl, setleaveUrl] = useState("")
  const [leaveRes, setleaveRes] = useState("")
  const [count, setCount] = useState("")

  // useEffect(()=>{
    
  //   axios
  //   .post('/api/users/notification')
  //     .then((response) => {
  //       const data = response.data.noti
  //       console.log(data)
  //       if(data.msg === "N")
  //       {
  //         setRes('no new notifications')
  //         console.log(res)
  //         setUrl("#")
  //         setCount(0)
  //       }
  //       else
  //       {
  //         setUrl("http://localhost:3000/finalizeClearance")
  //         setRes(data.msg + " requested Clearance")
  //         setCount(1)
  //       }
  //   })
  // })
  useEffect(()=>{
    fetchResponse()
  }, [])
  
  useEffect(()=>{
    fetchLeaveResponse()
  }, [])

  const fetchResponse = () =>{
    axios
    .post('/api/users/notification')
      .then((response) => {
        const data = response.data.noti
        console.log(data)
        if(data.msg === "N")
        {
          setRes('No new notifications')
          setUrl("#")
          setCount(0)
        }
        else
        {
          setUrl("http://localhost:3000/finalizeClearance")
          setRes (data.msg + " requested Clearance")
          setCount(1)
        }
    })
  }
  const fetchLeaveResponse = () =>{
    axios
    .post('/api/users/getLeaveResponse')
      .then((response) => {
        const data = response.data.leavenoti
        console.log(data)
        if(data.res === "n")
        {
          setleaveRes('No new notifications')
          setleaveUrl("#")
          setCount(0)
        }
        else
        {
          setUrl("http://localhost:3000/finalizeLeave")
          setRes (data.res + " requested for Leave")
          setCount(1)
        }
    })
  }
  const showSidebar = () => setSidebar(!sidebar);

  const onLogoutClick = e =>{
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    window.location.href = "/login";
  };
  const setColor = (color, index) => {
    var x = document.getElementsByTagName('svg')[index+2];
    x.style.color=color;

  }

  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <nav>
          <div class="navbar">
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={showSidebar} />
            </Link>
            <p class="brand-logo center" style={{marginTop: 15}}> The Guardian</p>
            <ul class="right hide-on-med-and-down">
              
              {/* <li style={{marginRight:'5px'}}><a onClick={onLogoutClick}><i class="material-icons">notifications</i></a></li> */}
              
              <li style={{marginTop:-5}}>
                <Dropdown>
                  
                  <Dropdown.Toggle id="dropdown-basic" style={{background:'#4169E1'}}>
                    <span class="new badge" style={{marginLeft:30}}>{count}</span>
                    <i class="material-icons" style={{marginTop:-16}}>notifications</i>
                  </Dropdown.Toggle>
                 
                  <Dropdown.Menu>
                    <Dropdown.Item href={url}><u>{res}</u></Dropdown.Item>
                    <Dropdown.Item href={leaveUrl}><u>{leaveRes}</u></Dropdown.Item>
                  </Dropdown.Menu>

                </Dropdown>
               </li>
              <li style={{marginRight:'5px'}}><a onClick={onLogoutClick}><i class="material-icons">logout</i></a></li>
            </ul>
          </div>
        </nav>
        <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
          <div class = "nav-wrapper">
            <ul className='nav-menu-items' onClick={showSidebar}>
              <li className='navbar-toggle'>
                <Link to='#' className='menu-bars' style={{marginLeft:'2px'}}>
                  <AiIcons.AiOutlineClose />
                </Link>
              </li>
              {SidebarData.map((item, index) => {
                return (
                  <li  key={index}  onMouseOver={() => setColor("#00468B",index)} onMouseOut={() => setColor("white", index)}  className={item.cName}>
                    <Link to={item.path}>
                      {item.icon}
                      <span className="title">{item.title}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Navbar;