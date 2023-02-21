import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import * as AiIcons from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

export default function ViewRoles() {
    let history = useHistory();
    const [empty, setEmpty] = useState("");
    const [roles, setRoles] = useState([]);
    let localrole = JSON.parse(localStorage.getItem('role'));
    useEffect(() => {
        Axios.get('https://localhost:7273/api/Role/getRoles').then((response) => {
            if (response.data.length === 0) { setEmpty(1) }
            setRoles(response.data);
        });
    }, [empty]);
    const editRole = (id) => {
        history.push('/editRole/' + id);
    }
    const deleteRole = async (id) => {
        await Axios.delete('https://localhost:7273/api/Role/deleteRole?id=' + id);
        toast.success("Deleted Successfully");
        window.location.reload();
    }
    if (localrole === '1') {
        if (empty === 1) {
            return (
                <>
                    <Navbar />
                    <div className=''>
                        <div><Toaster/></div>
                        <div className='headTitle'><p>Roles Details</p></div>
                        <div className='col-md-4 col-md-offset-4 text-center'>
                            <table className="table table-bordered table-striped table-hover">
                                <thead><tr><th scope="col">Data</th></tr></thead>
                                <tbody><tr><td>No Data Found</td></tr></tbody>
                            </table>
                        </div>
                    </div>
                </>
            );
        }
        else {
            return (
                <>
                    <Navbar />
                    <div className=''>
                    <div><Toaster/></div>
                        <div className='headTitle'><p>View All Roles</p></div>
                        <div className=''>
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {roles.map((item, index = 0) => (
                                        <tr key={item.roleId}>
                                            <td>{index + 1}</td>
                                            <td>{item.role}</td>
                                            <td><button className='btn btn-success' onClick={(e) => editRole(item.roleId)}><AiIcons.AiOutlineEdit />&nbsp;Edit</button>&nbsp;&nbsp;<button className='btn btn-danger' onClick={(e) => deleteRole(item.roleId)}><AiIcons.AiFillDelete />&nbsp;Delete</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </>
            );
        }
    }
    else { history.push('/'); window.location.reload(); }
}
