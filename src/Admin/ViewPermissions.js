import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import * as AiIcons from 'react-icons/ai';
import { Toaster } from 'react-hot-toast';

export default function ViewPermissions() {
    let history = useHistory();
    const [empty, setEmpty] = useState("");
    const [permission, setPermission] = useState([]);
    let localrole = JSON.parse(localStorage.getItem('role'));
    useEffect(() => {
        Axios.get('https://localhost:7273/api/Permission/getPermission').then((response) => {
            if (response.data.length === 0) { setEmpty(1) }
            setPermission(response.data);
        });
    }, [empty]);
    const editPermission = (id) => {
        history.push('/editPermission/' + id);
    }
    const deletePermission = async (id) => {
        await Axios.delete('https://localhost:7273/api/Permission/deletePermission?id=' + id);
        window.location.reload();
    }
    if (localrole === '1') {
        if (empty === 1) {
            return (
                <>
                    <Navbar />
                    <div className=''>
                        <div><Toaster /></div>
                        <div className='headTitle'><p>Permission Details</p></div>
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
                    <div><Toaster /></div>
                    <div className=''>
                        <div className='headTitle'><p>Permission Details</p></div>
                        <div className=''>
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No</th>
                                        <th scope="col">Permission</th>
                                        <th scope="col">Role</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {permission.map((item, index = 0) => (
                                        <tr key={item.permissionId}>
                                            <td>{index + 1}</td>
                                            <td>{item.permission}</td>
                                            <td>{item.roleId}</td>
                                            <td><button className='btn btn-success' onClick={(e) => editPermission(item.permissionId)}><AiIcons.AiOutlineEdit />&nbsp;Edit</button>&nbsp;&nbsp;<button className='btn btn-danger' onClick={(e) => deletePermission(item.permissionId)}><AiIcons.AiFillDelete />&nbsp;Delete</button></td>
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
