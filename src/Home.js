import React from 'react';
import './style.css';
import imageback from './Images/loginBackground.jpg';
import { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import toast, { Toaster } from 'react-hot-toast';

function Home() {
  const history = useHistory();
  const [email, SetEmail] = useState("");
  const [password, SetPassword] = useState("");
  let localrole = JSON.parse(localStorage.getItem('role'));
  const validate = (e) => {
    e.preventDefault();
    const emailValidate = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
    if (email === '' && password === '')
      toast.error("TextField Not be Empty!")
    else if (!email.match(emailValidate))
      toast.error("Enter Valid Email!")
    else
      logIn();
  }
  const logIn = () => {
    if (email === 'admin@pas.com' && password === 'Admin@12345') {
      localStorage.setItem('role','"1"');localStorage.setItem('userName',JSON.stringify("Admin"));window.location.reload();
    }
    else {
      Axios.post('https://localhost:7273/api/User', { "userEmail": email, "userPassword": password }).then((response) => {
        if (response.data.length > 0) {
          switch (response.data[0].userRole) {
            case "1": localStorage.setItem('role', JSON.stringify(response.data[0].userRole)); localStorage.setItem('userId', JSON.stringify(response.data[0].userId)); localStorage.setItem('userName', JSON.stringify(response.data[0].userName)); history.push('/admin'); break;
            case "2": localStorage.setItem('role', JSON.stringify(response.data[0].userRole)); localStorage.setItem('userId', JSON.stringify(response.data[0].userId)); localStorage.setItem('userName', JSON.stringify(response.data[0].userName)); history.push('/student');; break;
            case "3": localStorage.setItem('role', JSON.stringify(response.data[0].userRole)); localStorage.setItem('userId', JSON.stringify(response.data[0].userId)); localStorage.setItem('userName', JSON.stringify(response.data[0].userName)); history.push('/hod');; break;
            case "4": localStorage.setItem('role', JSON.stringify(response.data[0].userRole)); localStorage.setItem('userId', JSON.stringify(response.data[0].userId)); localStorage.setItem('userName', JSON.stringify(response.data[0].userName)); history.push('/projectIncharge');; break;
            case "5": localStorage.setItem('role', JSON.stringify(response.data[0].userRole)); localStorage.setItem('userId', JSON.stringify(response.data[0].userId)); localStorage.setItem('userName', JSON.stringify(response.data[0].userName)); history.push('/internalGuide');; break;
            default: toast.error('Something Went Wrong');
          }
        }
        else if (response.data.length === 0) { toast.error('Log-In Unsuccessfull'); }
      })
    }
  }
  const forgotPassword = () => {
    history.push('/forgot');
  }
  if (localrole === '0' || !localrole) {
    return (
      <>
        <div><Toaster /></div>
        <div className='home'>
          <div className='row'>
            <div className='col-md-1'>
            </div>
            <div className='col-md-10 center-div'>
              <div className='col-md-7'><img className='mg-responsive imageback' src={imageback} alt='Background images' /></div>
              <div className='col-md-5 col-sm-12 form-div'>
                <h4 className='text-center log-in-logo'>Log In</h4>
                <form>
                  <div className='form-group'>
                    <label className='form-label font-style'>User Name</label>
                    <input className='form-control' autoComplete='off' onChange={(e) => { SetEmail(e.target.value); }} type='text' placeholder='Username Here' id='userName' />
                  </div>
                  <div className='form-group'>
                    <label className='form- font-style'>Password</label>
                    <input className='form-control' autoComplete='off' onChange={(e) => { SetPassword(e.target.value); }} type='password' placeholder='Password Here' id='password' />
                  </div>
                  <div className='text-center form-group'>
                    <div className='col-md-4'></div>
                    <button className='col-md-4 btn' onClick={validate}>Log In</button>
                    <div className='col-md-4'></div>
                  </div>
                </form>
              </div>
              <br /><br/><br/><div className='forgot'><p onClick={forgotPassword}>Lost Password?</p></div>
            </div>
            <div className='col-md-1'></div>
          </div>
        </div>
      </>
    );
  }
  else if (localrole === '1') { history.push('/admin'); window.location.reload(); }
  else if (localrole === '2') { history.push('/student'); window.location.reload(); }
  else if (localrole === '3') { history.push('/hod'); window.location.reload(); }
  else if (localrole === '4') { history.push('/projectIncharge'); window.location.reload(); }
  else if (localrole === '5') { history.push('/internalGuide'); window.location.reload(); }
  // else{history.push('/');window.location.reload();}
}

export default Home;
