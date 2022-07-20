// import React from 'react';
// import './Navbar.css';
// import { IconContext } from 'react-icons';
// import setAuthToken from "../../utils/setAuthToken";

// function NavbarEmployee() {
//   const onLogoutClick = e =>{
//     localStorage.removeItem('jwtToken');
//     setAuthToken(false);
//     window.location.href = "/emplogin";
//   };

//   return (
//     <>
//       <IconContext.Provider value={{ color: '#fff' }}>
//         <nav class="navbar">
//           <div>
//             <p class="brand-logo center">Guardians</p>
//             <ul class="right hide-on-med-and-down">
//               <li style={{marginRight:'5px'}}><a onClick={onLogoutClick}><i class="material-icons">logout</i></a></li>
//             </ul>
//           </div>
//         </nav> 
//       </IconContext.Provider>
//     </>
//   );
// }

// export default NavbarEmployee;
import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { EmpSideBarData } from './EmpSideBarData';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import setAuthToken from "../../utils/setAuthToken";

function Navbar() {
  const [sidebar, setSidebar] = useState(true);

  const showSidebar = () => setSidebar(!sidebar);

  const onLogoutClick = e =>{
    localStorage.removeItem('jwtToken');
    setAuthToken(false);
    window.location.href = "/emplogin";
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
              {EmpSideBarData.map((item, index) => {
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