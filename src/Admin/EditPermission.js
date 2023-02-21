import React, { useState,useEffect } from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Axios from 'axios';
import { Toaster,toast } from 'react-hot-toast';


function EditPermission(props) {
    let localrole = JSON.parse(localStorage.getItem('role'));
    let history = useHistory();
    const [permission,setPermission]=useState(document.getElementsByName('permission').value);
    const [role,setRole]=useState(document.getElementsByName('roleId').value);
    useEffect(() => {
        Axios.post('https://localhost:7273/api/Permission/getPermissionById', {
            permissionId: props.match.params.id
        }).then((response) => {
            setPermission(response.data[0].permission);
            setRole(response.data[0].roleId);
        });
    }, [props.match.params.id]);
    const updateRole=async (e)=>{
        e.preventDefault();
        await Axios.post('https://localhost:7273/api/Permission/updatePermission',{permissionId:props.match.params.id,permission:permission,roleId:role}).then(()=>{toast.success("Permission Updated Successfully");history.push('/viewPermissions')}).catch((err)=>toast.error(err));
    }
    if (localrole === '1') {
        return (
            <>
            <div><Toaster/></div>
                <Navbar />
                <div className='addUser'>
                    <div className='headTitle'>
                        Role Management (Update {role})
                    </div>
                </div>
                <div className='col-md-8 col-md-offset-2 formData'>
                    <form onSubmit={updateRole}>
                    <div className='form-group'>
                            <label className='form-label'>Permission</label>
                            <input type='text' defaultValue={permission} className='form-control' name='permission' onChange={(e)=>{setPermission(e.target.value)}} />
                        </div>
                    <div className='form-group'>
                            <label className='form-label'>Role</label>
                            <input type='text' defaultValue={role} className='form-control' name='roleId' onChange={(e)=>{setRole(e.target.value)}} />
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

export default EditPermission;
