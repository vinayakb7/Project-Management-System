import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import { Toaster,toast } from 'react-hot-toast';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

function EditProject(props) {
    let history = useHistory();
    const [project, setProject] = useState([]);
    const [name, SetName] = useState(document.getElementsByName('projectName').value);
    const [details, SetDetails] = useState(document.getElementsByName('projectDetails').value);
    const [hod, SetHOD] = useState(document.getElementsByName('hod').value);
    const [ic, setIc] = useState(document.getElementsByName('ic').value);
    const [ig, setIg] = useState(document.getElementsByName('ig').value);
    let localrole = JSON.parse(localStorage.getItem('role'));
    useEffect(() => {
        Axios.post('https://localhost:7273/api/Project/ById', {
            projectId: props.match.params.id
        }).then((response) => {
            console.log(response)
            setProject(response.data[0]);
            SetName(response.data[0].projectName);
            SetDetails(response.data[0].projectDetails);
            SetHOD(response.data[0].hodid);
            setIg(response.data[0].igid);
            setIc(response.data[0].picid);
        });
    }, [props.match.params.id]);
    const updateproject = (e) =>
    {
        e.preventDefault();
        Axios.put('https://localhost:7273/api/Project', {
            projectId : props.match.params.id,
            projectName: name,
            projectDetails: details,
            hodid: hod,
            picid: ic,
            igid: ig
        }).then(() => {toast.success("Project Updated Successfully") });
    }
    if (localrole === '2') {
        return (
            <>
                <Navbar />
                <div><Toaster /></div>
                <div className='uploadProject'>
                    <div className='headTitle'><p>Edit Projects</p></div>
                    <div className='col-md-8 col-md-offset-2 formData'>
                        <form>
                            <div className='form-group'><label className='form-label'>Project Name</label>
                                <input tupe='text' name='projectName' className='form-control' placeholder='Project Name' defaultValue={project.projectName} onChange={(e) => { SetName(e.target.value); }} /></div>
                            <div className='form-group'><label className='form-label'>Project Details</label>
                                <input tupe='text' name='projectDetails' className='form-control' placeholder='Project Details' defaultValue={project.projectDetails} onChange={(e) => { SetDetails(e.target.value); }} /></div>
                                <div className='form-group'><label className='form-label'>Project File Name</label>
                                <input tupe='text' readOnly name='fileName' className='form-control' placeholder='File Name' defaultValue={project.projectData} /></div>
                            <div className='form-group'><label className='form-label'>Your HOD Email Id</label>
                                <input tupe='text' name='hod' className='form-control' placeholder='Head of Departments Email' defaultValue={project.hodid} onChange={(e) => { SetHOD(e.target.value); }} /></div>
                            <div className='form-group'><label className='form-label'>Your Project Incharge Email Id</label>
                                <input tupe='text' name='ic' className='form-control' placeholder='Project Inchargs Email' defaultValue={project.picid} onChange={(e) => { setIc(e.target.value); }} /></div>
                            <div className='form-group'><label className='form-label'>Your Internal Guide Email Id</label>
                                <input tupe='text' name='ig' className='form-control' placeholder='Internal Guides Email' defaultValue={project.igid} onChange={(e) => { setIg(e.target.value); }} /></div>
                            <button onClick={updateproject} className='col-md-4 col-md-offset-4 btn btn-warning'>Update Details</button>
                        </form>
                    </div>
                </div>
            </>
        );
    }
    else {history.push('/'); window.location.reload(); }
}

export default EditProject;