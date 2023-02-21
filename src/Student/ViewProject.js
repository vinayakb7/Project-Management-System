import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import {Toaster,toast} from 'react-hot-toast';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function ViewProject() {
    let history = useHistory();
    const [empty, setEmpty] = useState();
    const [project, setProject] = useState([]);
    let localrole = JSON.parse(localStorage.getItem('role'));
    useEffect(() => {
        Axios.post('https://localhost:7273/api/Project/GetById', {
            userId: localStorage.getItem('userId')
        }).then((response) => {
            if (response.data.length === 0) { setEmpty(1); console.log(empty) }
            setProject(response.data);
        });
    }, [empty]);
    const  deleteProject = async (id) => {
         await Axios.delete('https://localhost:7273/api/Project?id=' + id);
         toast.success("Deleted Successfully!");
        window.location.reload();
    }
    const feedback = (id,nm) => {
        history.push('/feedback/'+id+'/'+nm);
    }
    const editProject = (id) => {
        console.log(id);
        history.push('/editProject/' + id);
    }
    if (localrole === '2') {
        if (empty === 1) {
            return (
                <>
                    <Navbar />
                    <div className=''>
                        <div className='headTitle'><p>View All Prjects</p></div>
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
                        <div className='headTitle'><p>View All Projects</p></div>
                        <div className=''>
                            <table className="table table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Project ID</th>
                                        <th scope="col">Project Name</th>
                                        <th scope="col">Project Details</th>
                                        <th scope="col">Project Data</th>
                                        <th scope="col">Project Status</th>
                                        <th scope="col">HOD Name</th>
                                        <th scope="col">Project Incharge Name</th>
                                        <th scope="col">Internal Guide Name</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.map((item, index = 0) => (
                                        <tr key={item.projectId}>
                                            <td>{index + 1}</td>
                                            <td>{item.projectName}</td>
                                            <td>{item.projectDetails}</td>
                                            <td>{item.projectData}</td>
                                            <td>{item.projectStatus}</td>
                                            <td>{item.hodid}</td>
                                            <td>{item.picid}</td>
                                            <td>{item.igid}</td>
                                            <td><button className='btn btn-primary' onClick={(e) => editProject(item.projectId)}>Edit</button>&nbsp;&nbsp;<button className='btn btn-danger' onClick={(e) => { deleteProject(item.projectId) }}>Delete</button>&nbsp;&nbsp;<button className='btn btn-info' onClick={(e) => { feedback(item.projectId,item.projectName) }}>Feedback</button></td>
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

export default ViewProject;