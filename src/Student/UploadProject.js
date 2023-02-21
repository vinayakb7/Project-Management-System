import React, { useState } from 'react';
import Axios from 'axios';
import Navbar from '../components/Navbar';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Toaster,toast } from 'react-hot-toast';

function UploadProject() {
    let history = useHistory();
    let localrole = JSON.parse(localStorage.getItem('role'));
    const [inputValues,SetInputValues] = useState({
        projectName: "",
        projectDetails: "",
        projectData: "",
        userId: "",
        hodid: "",
        picid: "",
        igid: ""
    });
    const handleOnChange=(e)=>{
        const {name,value}=e.target;
        SetInputValues({...inputValues,[name] : value});
    }
    const uid = localStorage.getItem('userId');
    const addProject = async (e) => {
        e.preventDefault();
        const file = e.currentTarget["fileInput"].files[0];
        inputValues.userId=uid;
        inputValues.projectData = file.name;
        const formData = new FormData();
        formData.append("files", file);
        await Axios.post('https://localhost:7273/api/Project/secondpost/', formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        }).then(() => {
            Axios.post('https://localhost:7273/api/Project/addProject',inputValues).then(() => {
            toast.success("Your Project Uploaded Successfully");history.push('/viewProject');
        });
        }).catch((error)=>{toast.error(error.response.data);});
    }
    if (localrole === '2') {
        return (
            <>
                <Navbar />
                <div className='uploadProject'>
                <div><Toaster/></div>
                    <div className='headTitle'><p>Upload Projects</p></div>
                    <div className='col-md-8 col-md-offset-2 formData'>
                        <form>
                            <div className='form-group'><label className='form-label'>Project Name</label>
                                <input tupe='text' className='form-control' placeholder='Enter Project Name'  name='projectName' onChange={handleOnChange} /></div>
                            <div className='form-group'><label className='form-label'>Project Details</label>
                                <input tupe='text' className='form-control' placeholder='Project Details' name='projectDetails' onChange={handleOnChange}/></div>
                            <div className='form-group'><label className='form-label'>Your HOD Email Id</label>
                                <input tupe='text' className='form-control' placeholder='Head Of the Department Email Address' name='hodid' onChange={handleOnChange} /></div>
                            <div className='form-group'><label className='form-label'>Your Project Incharge Email Id</label>
                                <input tupe='text' className='form-control' placeholder='Project Icharge Email Address' name='picid' onChange={handleOnChange} /></div>
                            <div className='form-group'><label className='form-label'>Your Internal Guide Email Id</label>
                                <input tupe='text' className='form-control' placeholder='Internal Guide Email Address' name='igid' onChange={handleOnChange} /></div>
                            {/* <input type='submit' onClick={addtemp}/> */}
                        </form>
                        <form encType="multipart/form-data" onSubmit={addProject}>
                            <div className='form-group'><label className='form-label'>Attach Your Project Folder</label>
                                <input className='form-control' id="fileInput" type="file" />
                            </div>
                            <input className='col-md-4 col-md-offset-4 btn btn-info' type='submit'></input>
                        </form>
                    </div>
                </div>
            </>
        );
    }
    else {history.push('/'); window.location.reload(); }
}

export default UploadProject;