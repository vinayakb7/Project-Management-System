import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import '../style.css';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import toast, { Toaster } from 'react-hot-toast';

function PICProjects() {
    let history = useHistory();
    const [empty, setEmpty] = useState("");
    const [project, setProject] = useState([]);
    let localrole = JSON.parse(localStorage.getItem('role'));
    useEffect(() => {
        Axios.post('https://localhost:7273/api/Project/ByPICId', {
            picId: localStorage.getItem('userId')
        }).then((response) => {
            console.log(response);
            if (response.data.length === 0) { setEmpty(1); console.log(empty) }
            setProject(response.data);
        });
    }, [empty]);
    const updateStatus = async (id, status) => {
        if (status === 1)
            status = "Stage-II"
        else
            status = "Rejected"
        console.log(id, status);
        await Axios.put('https://localhost:7273/api/Project/updateStatus', {
            projectId: id,
            projectStatus: status
        }).then(() => {toast.success("Status Updated"); window.location.reload(); });
    }
    const downloadProject = (id) => {
        Axios.get('https://localhost:7273/api/Project/Download File?nameFile=' + id, { responseType: 'blob', }).then(() => {
            var link = document.createElement('a');
            document.body.appendChild(link);
            link.href = 'https://localhost:7273/api/Project/Download File?nameFile=' + id;
            link.click();
            document.body.removeChild(link);
        });
    }
    const feedBack = (id) => {
        history.push('/icFeedback/' + id);
    }
    if (localrole === '4') {
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
                    <div><Toaster /></div>
                    <div className=''>
                        <div className='headTitle'><p>View All Projects</p></div>
                            <table className="table table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th scope="col">Sr. No</th>
                                        <th scope="col">Project Name</th>
                                        <th scope="col">Project Details</th>
                                        <th scope="col">Project Data</th>
                                        <th scope="col">Project Status</th>
                                        <th scope="col">Internal Guide Name</th>
                                        <th scope="col">Head Of Department Name</th>
                                        <th scope="col">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {project.map((item, index = 0) => (
                                        <tr key={item.projectId}>
                                            <td>{index + 1}</td>
                                            <td>{item.projectName}</td>
                                            <td>{item.projectDetails}</td>
                                            <td><button onClick={(e) => downloadProject(item.projectData)} className='btn btn-warning'>Download Project Files</button></td>
                                            <td>{item.projectStatus}</td>
                                            <td>{item.igid}</td>
                                            <td>{item.hodid}</td>
                                            <td><button className='btn btn-success' onClick={(e) => updateStatus(item.projectId, 1)}>Approve</button>&nbsp;&nbsp;<button className='btn btn-danger' onClick={(e) => updateStatus(item.projectId, 0)}>Reject</button>&nbsp;&nbsp;<button className='btn btn-info' onClick={(e) => feedBack(item.projectId)}>Feedback</button></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                </>
            );
        }
    }
    else { history.push('/'); window.location.reload(); }
}

export default PICProjects;