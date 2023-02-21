import React, { useState } from 'react';
import * as FaIcons from 'react-icons/fa';
import * as AiIcons from 'react-icons/ai';
import { Link } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { StudentSidebar } from './StudentSidebar';
import { HODSidebar } from './HODSidebar';
import { PICSidebar } from './ProjectInchargeSidebar';
import { IGSidebar } from './InternalGuideSidebar';
import './Navbar.css';
import { IconContext } from 'react-icons';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  let history = useHistory();
  let role = JSON.parse(localStorage.getItem('role'));
  const logout = () => {
    localStorage.setItem('role','"0"');localStorage.setItem('userName','');localStorage.setItem('userId','');history.push('/');
  }
  const login = () =>{
    history.push('/')
  }
  const showSidebar = () => setSidebar(!sidebar);
  if(role === '1'){
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navba'>
          <Link to='#' className='menubars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <p className='head'>Project Approval System</p>
          <button className='btn btn-danger' onClick={logout}>Log Out</button>
        </div>
        <nav className={sidebar ? 'navmenu active' : 'navmenu'}>
          <ul className='navmenuitems' onClick={showSidebar}>
            <li className='navbartoggle'>
              <Link to='#' className='menubars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {AdminSidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
if(role === '0' || !role){
  return(
    <>
    <IconContext.Provider value={{ color: '#fff' }}>
      <div className='navba'>
        <p className='head'>Project Approval System</p>
        <button className='logoutbtn btn btn-danger' onClick={login}>Log In</button>
      </div>
    </IconContext.Provider>
  </>
  )
}
if(role === '3'){
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navba'>
          <Link to='#' className='menubars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <p className='head'>Project Approval System</p>
          <button className='btn btn-danger' onClick={logout}>Log Out</button>
        </div>
        <nav className={sidebar ? 'navmenu active' : 'navmenu'}>
          <ul className='navmenuitems' onClick={showSidebar}>
            <li className='navbartoggle'>
              <Link to='#' className='menubars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {HODSidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
if(role === '4'){
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navba'>
          <Link to='#' className='menubars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <p className='head'>Project Approval System</p>
          <button className='btn btn-danger' onClick={logout}>Log Out</button>
        </div>
        <nav className={sidebar ? 'navmenu active' : 'navmenu'}>
          <ul className='navmenuitems' onClick={showSidebar}>
            <li className='navbartoggle'>
              <Link to='#' className='menubars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {PICSidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
if(role === '5'){
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navba'>
          <Link to='#' className='menubars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <p className='head'>Project Approval System</p>
          <button className='btn btn-danger' onClick={logout}>Log Out</button>
        </div>
        <nav className={sidebar ? 'navmenu active' : 'navmenu'}>
          <ul className='navmenuitems' onClick={showSidebar}>
            <li className='navbartoggle'>
              <Link to='#' className='menubars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {IGSidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
if(role === '2'){
  return (
    <>
      <IconContext.Provider value={{ color: '#fff' }}>
        <div className='navba'>
          <Link to='#' className='menubars'>
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
          <p className='head'>Project Approval System</p>
          <button className='btn btn-danger' onClick={logout}>Log Out</button>
        </div>
        <nav className={sidebar ? 'navmenu active' : 'navmenu'}>
          <ul className='navmenuitems' onClick={showSidebar}>
            <li className='navbartoggle'>
              <Link to='#' className='menubars'>
                <AiIcons.AiOutlineClose />
              </Link>
            </li>
            {StudentSidebar.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>
    </>
  );
}
}

export default Navbar;
