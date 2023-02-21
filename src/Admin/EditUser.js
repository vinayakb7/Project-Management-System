import React, { useState,useEffect } from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';
function EditUser(props) {
    let localrole = JSON.parse(localStorage.getItem('role'));
    let history = useHistory();
    const [name,setName]=useState(document.getElementsByName('userName').value);
    const [address,setAddress]=useState(document.getElementsByName('userAddress').value);
    const [email,setEmail]=useState(document.getElementsByName('userEmail').value);
    const [contact,setContact]=useState(document.getElementsByName('userContact').value);
    const [role,setRole]=useState(document.getElementsByName('userRole').value);
    useEffect(() => {
        Axios.post('https://localhost:7273/api/User/getUserById', {
            userId: props.match.params.id
        }).then((response) => {
            setName(response.data[0].userName);
            setAddress(response.data[0].userAddress);
            setEmail(response.data[0].userEmail);
            setContact(response.data[0].userContact);
            setRole(response.data[0].userRole);
        });
    }, [props.match.params.id]);
    const updateUser=async (e)=>{
        e.preventDefault();
        await Axios.post('https://localhost:7273/api/User/updateUser',{userId:props.match.params.id,userName:name,userAddress:address,userEmail:email,userContact:contact,userRole:role}).then(()=>{toast.success("User Updated Successfully");history.push('/viewUsers')}).catch((err)=>toast.error(err));
    }
    if (localrole === '1') {
        return (
            <>
            <div><Toaster/></div>
                <Navbar />
                <div className='addUser'>
                    <div className='headTitle'>
                        Update User
                    </div>
                </div>
                <div className='col-md-8 col-md-offset-2 formData'>
                    <form onSubmit={updateUser}>
                        <div className='form-group'>
                            <label className='form-label'>User Name</label>
                            <input type='text' className='form-control' defaultValue={name} name='userName' onChange={(e)=>{setName(e.target.value)}} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>User Address</label>
                            <input type='text' className='form-control' defaultValue={address} name='userAddress' onChange={(e)=>{setAddress(e.target.value)}} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>User Email</label>
                            <input type='email' readOnly className='form-control' defaultValue={email} name='userEmail' onChange={(e)=>{setEmail(e.target.value)}} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>User Contact</label>
                            <input type='text' className='form-control' defaultValue={contact} name='userContact' onChange={(e)=>{setContact(e.target.value)}} />
                        </div>
                        <div className='form-group'>
                            <label className='form-label'>User Role</label><br />
                            <input type='radio' name='userRole' className='form-check-input' value='1' onChange={(e)=>{setRole(e.target.value)}} />&nbsp;<label className='form-check-label'>Admin</label>&nbsp;&nbsp;&nbsp;
                            <input type='radio' name='userRole' className='form-check-input' value='2' onChange={(e)=>{setRole(e.target.value)}} />&nbsp;<label className='form-check-label'>Student</label>&nbsp;&nbsp;&nbsp;
                            <input type='radio' name='userRole' className='form-check-input' value='3' onChange={(e)=>{setRole(e.target.value)}} />&nbsp;<label className='form-check-label'>Head Of Department</label>&nbsp;&nbsp;&nbsp;
                            <input type='radio' name='userRole' className='form-check-input' value='4' onChange={(e)=>{setRole(e.target.value)}} />&nbsp;<label className='form-check-label'>Project Incharge</label>&nbsp;&nbsp;&nbsp;
                            <input type='radio' name='userRole' className='form-check-input' value='5' onChange={(e)=>{setRole(e.target.value)}} />&nbsp;<label className='form-check-label'>Internal Guide</label>&nbsp;&nbsp;&nbsp;
                        </div>
                        <div className='form-group btnDiv'>
                            <button className='col-md-4 col-md-offset-4 btn btn-primary'>Submit</button>
                        </div>
                    </form>
                </div>
            </>
        );
    }
    else { history.push('/'); window.location.reload(); }
}
export default EditUser;