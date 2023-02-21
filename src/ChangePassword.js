import './style.css';
import React, { useState } from 'react';
import Axios from 'axios';
import Navbar from './components/Navbar';
import { Toaster, toast } from 'react-hot-toast';

function ChangePassword() {
    const [password, SetPassword] = useState("");
    const [secondPass, SetRePassword] = useState("");
    const passwordChange = (e) => {
        e.preventDefault();
        if (password === secondPass) {
            Axios.put('https://localhost:7273/api/User/updatePassword', { "userId": localStorage.getItem('userId'), "userPassword": password }).then((response) => {
                toast.success("Your Password Updated Successfully");
            });
        }
        else { toast.error("Password Doesn't Match") }
    }
    return (
        <>
            <Navbar />
            <div className='changePassword'>
                <div><Toaster /></div>
                <div className='headTitle'><p>Change Your Password</p></div>
                <div className='col-md-8 col-md-offset-2 formData'>
                    <form>
                        <div className='form-group'>
                            <label className='form-label'>Enter New Password</label>
                            <input type='password' required onChange={(e) => { SetPassword(e.target.value) }} className='form-control' />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>Confirm  Password</label>
                            <input type='password' required onChange={(e) => { SetRePassword(e.target.value) }} className='form-control' />
                        </div>
                        <button onClick={passwordChange} className='col-md-4 col-md-offset-4 btn btn-warning'>Save</button>
                    </form>
                </div>
            </div>
        </>
    );
}

export default ChangePassword;