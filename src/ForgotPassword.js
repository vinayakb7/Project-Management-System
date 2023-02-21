import Axios from 'axios';
import React,{ useState }  from 'react';
import './style.css';
import { Toaster,toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from './components/Navbar';

export default function ForgotPassword() {
  const history = useHistory();
    const [display,setDisplay] = useState("1");
    const [email,setEmail] = useState("");
    const [otp,setOTP] = useState("");
    const [password, SetPassword] = useState("");
    const [secondPass, SetRePassword] = useState("");
    const displayTextBx = (e) => {
        e.preventDefault();
        Axios.post('https://localhost:7273/api/User/getEmail',{userEmail:email}).then((response)=>{
            if(response.data.length > 0){
              Axios.post('https://localhost:7273/api/User/forgotPassword',{emailId:email});
              setDisplay("0")}
            else{toast.error("Email Not Registered!")}
        });
    }
    const passwordChange = (e) => {
      e.preventDefault();
      if(password === secondPass){
      Axios.put('https://localhost:7273/api/User/updatePasswordByEmail', { "userEmail":email, "userPassword": password }).then((response) => {
          toast.success("Password Updated");
          history.push('/');
        });
       }
      else{toast.error("Both Password Didnt Match")}
  }
    const submit = (e) => {
      e.preventDefault();
      Axios.post('https://localhost:7273/api/User/checkOTP',{emailId:email,otp:otp}).then((response)=>{
        if(response.data[0].otp === otp){
          setDisplay("2");
        }else{
          toast.error("Check Your OTP")}});
    }
    if(display === "1"){
  return (
    <>
     <div><Toaster/></div>
     <Navbar/>
     <div className='headTitle'><p>Forgot Password</p></div>
    <div className='ForgotPassword col-md-8 col-md-offset-2 formData'>
      <form>
        <div className='form-group'>
        <label className='form-label'>Enter Your Email Address</label>
        <input id='otp' type='text'onChange={(e)=>{setEmail(e.target.value)}} className='form-control' /></div>
        <button className='col-md-4 col-md-offset-4 btn btn-success' onClick={displayTextBx}>Generate OTP</button>
      </form>
    </div>
    </>
  )
    }
  if(display === "0"){
    return (
        <>
         <div><Toaster/></div>
         <Navbar/>
         <div className='headTitle'><p>Forgot Password</p></div>
        <div className='ForgotPassword col-md-8 col-md-offset-2 formData'>
          <form>
            <div className='form-group'>
            <label className='form-label'>Enter OTP</label>
            <input type='text' placeholder='Enter OTP' onChange={e=>setOTP(e.target.value)}  className='form-control' /></div>
            <button className='col-md-4 col-md-offset-4 btn btn-success' onClick={submit}>Submit</button>
          </form>
        </div>
        </>
      )
  }
  if(display === "2"){
    return (
        <>
         <div><Toaster/></div>
         <Navbar/>
         <div className='changePassword'>
                    <div className='headTitle'><p>Change Your Password</p></div>
                    <div className='col-md-8 col-md-offset-2 formData'>
                        <form>
                            <div className='form-group'>
                                <label className='form-label'>Enter New Password</label>
                                <input type='password' required  onChange={(e) => { SetPassword(e.target.value)}} className='form-control'/>
                            </div>
                            <div className='form-group'>
                                <label className='form-label'>Confirm  Password</label>
                                <input type='password' required onChange={(e) => { SetRePassword(e.target.value) }} className='form-control'/>
                            </div>
                            <button onClick={passwordChange} className='col-md-6 col-md-offset-3 btn btn-warning'>Change Password</button>
                        </form>
                    </div>
                </div>
        </>
      )
  }
}
