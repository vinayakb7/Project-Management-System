import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import * as AiIcons from 'react-icons/ai';
import toast, { Toaster } from 'react-hot-toast';

export default function ViewUsers() {
    let history = useHistory();
    const [empty, setEmpty] = useState("");
    const [user, setUser] = useState([]);
    let localrole = JSON.parse(localStorage.getItem('role'));
    useEffect(() => {
        Axios.get('https://localhost:7273/api/User/getAllUsers').then((response) => {
            if (response.data.length === 0) { setEmpty(1) }
            setUser(response.data);
        });
    }, [empty]);
    const editUser = (id) => {
        history.push('/editUser/' + id);
    }
    const deleteUser = async (id) => {
        await Axios.delete('https://localhost:7273/api/User/deleteUser?id=' + id);
        toast.success("Deleted Successfully")
        window.location.reload();
    }
    const sendNotification = (email) =>{
        history.push('/notification/'+email);
    }
    if (localrole === '1') {
        if (empty === 1) {
            return (
                <>
                    <Navbar />
                    <div className=''>
                        <div><Toaster /></div>
                        <div className='headTitle'><p>Users Details</p></div>
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
                    <div><Toaster /></div>
                        <div className='headTitle'><p>Users Details</p></div>
                        <div className=''>
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No</th>
                                        <th scope="col">User Name</th>
                                        <th scope="col">User Address</th>
                                        <th scope="col">User Contact</th>
                                        <th scope="col">User Email</th>
                                        <th scope="col">User Role</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {user.map((item, index = 0) => (
                                        <tr key={item.userId}>
                                            <td>{index + 1}</td>
                                            <td>{item.userName}</td>
                                            <td>{item.userAddress}</td>
                                            <td>{item.userContact}</td>
                                            <td>{item.userEmail}</td>
                                            <td>{item.userRole}</td>
                                            <td><button className='btn btn-success' onClick={(e) => editUser(item.userId)}><AiIcons.AiOutlineEdit />&nbsp;Edit</button>&nbsp;&nbsp;<button className='btn btn-danger' onClick={(e) => deleteUser(item.userId)}><AiIcons.AiFillDelete/>&nbsp;Delete</button>&nbsp;&nbsp;<button className='btn btn-info' onClick={(e) => sendNotification(item.userEmail)}><AiIcons.AiFillNotification/>&nbsp;Send Notification</button></td>
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
