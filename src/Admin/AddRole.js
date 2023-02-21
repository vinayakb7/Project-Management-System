import React from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';


function AddRole() {
    let localrole = JSON.parse(localStorage.getItem('role'));
    let history = useHistory();
    const [inputValues,SetInputValues] = useState({
        role: ''
    });
    const registerUser = async (e) => {
        e.preventDefault();
        console.log(inputValues);
        await Axios.post('https://localhost:7273/api/Role/addRole', inputValues).then(() => {
            toast.success('Role Added Successfully!');history.push('/viewRoles')
        }).catch((error)=>{toast.error(error.response.data)});
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
                <div className='AddRole'>
                    <div className='headTitle'>
                        Role Management (Add Roles)
                    </div>
                </div>
                <div className='col-md-8 col-md-offset-2 formData'>
                    <form onSubmit={registerUser}>
                        <div className='form-group'>
                            <label className='form-label'>Role</label>
                            <input type='text' className='form-control' name='role' onChange={handleOnChange} />
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

export default AddRole;
