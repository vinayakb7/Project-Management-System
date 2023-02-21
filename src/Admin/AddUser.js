import React from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';


function AddUser() {
    let localrole = JSON.parse(localStorage.getItem('role'));
    let history = useHistory();
    const [inputValues,SetInputValues] = useState({
        userName: '',
        userAddress: '',
        userContact: '',
        userEmail: '',
        userPassword: '',
        userRole: ''
    });
    const validate = (e) => {
        e.preventDefault();
        const emailValidate = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
        const passValidate = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
        if (inputValues.userName===''|| inputValues.userContact==='' || inputValues.userAddress==='' || inputValues.userRole==='')
          toast.error("text Field not be empty")
        if (!(inputValues.userEmail).match(emailValidate))
          toast.error("Enter Valid Email!")
        else if (!(inputValues.userPassword).match(passValidate))
          toast.error("Password Is Too Short!")
        else
          registerUser();
      }
    const registerUser = async () => {
        await Axios.post('https://localhost:7273/api/User/addUser', inputValues).then(() => {
            toast.success('User Registered Successfully!');history.push('viewUsers');
        }).catch(()=>{toast.success("User Registered Successfully!")});
    }
    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        SetInputValues({...inputValues,[name] : value});
    }
    if (localrole === '1') {
        return (
            <>
            <div><Toaster/></div>
                <Navbar />
                <div className='addUser'>
                    <div className='headTitle'>
                        User Registration
                    </div>
                </div>
                <div className='col-md-8 col-md-offset-2 formData'>
                    <form onSubmit={validate}>
                        <div className='form-group'>
                            <label className='form-label'>User Name</label>
                            <input type='text' className='form-control' name='userName' onChange={handleOnChange} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>User Address</label>
                            <input type='text' className='form-control' name='userAddress' onChange={handleOnChange} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>User Email</label>
                            <input type='text' className='form-control' name='userEmail' onChange={handleOnChange} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>User Contact</label>
                            <input type='text' className='form-control' name='userContact' onChange={handleOnChange} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>User Password</label>
                            <input type='password' className='form-control' name='userPassword' onChange={handleOnChange} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>User Role</label><br />
                            <input type='radio' name='userRole' className='form-check-input' value='1' onChange={handleOnChange} />&nbsp;<label className='form-check-label'>Admin</label>&nbsp;&nbsp;&nbsp;
                            <input type='radio' name='userRole' className='form-check-input' value='2' onChange={handleOnChange} />&nbsp;<label className='form-check-label'>Student</label>&nbsp;&nbsp;&nbsp;
                            <input type='radio' name='userRole' className='form-check-input' value='3' onChange={handleOnChange} />&nbsp;<label className='form-check-label'>Head Of Department</label>&nbsp;&nbsp;&nbsp;
                            <input type='radio' name='userRole' className='form-check-input' value='4' onChange={handleOnChange} />&nbsp;<label className='form-check-label'>Project Incharge</label>&nbsp;&nbsp;&nbsp;
                            <input type='radio' name='userRole' className='form-check-input' value='5' onChange={handleOnChange} />&nbsp;<label className='form-check-label'>Internal Guide</label>&nbsp;&nbsp;&nbsp;

                        </div>
                        <div className='form-group'>
                            <button className='col-md-4 col-md-offset-4 btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
    else { history.push('/'); window.location.reload(); }
}

export default AddUser;
