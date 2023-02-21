import React, { useState,useEffect } from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import '../style.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Toaster,toast } from 'react-hot-toast';

function HODFeedback(props) {
    const history = useHistory();
    const [project,setProject] = useState([]);
    const [feedback,setFeedback] = useState("");
    let localrole = JSON.parse(localStorage.getItem('role'));
    useEffect(() => {
        Axios.post('https://localhost:7273/api/Project/ById', {
            projectId: props.match.params.id
        }).then((response) => {
                setProject(response.data[0]);
        });
    }, [props.match.params.id]);
    const submitFeedback =(e) =>{
        e.preventDefault();
        Axios.post('https://localhost:7273/api/Feedback/HODFeedback', {
            feedbackByHOD : feedback,
            projectId: props.match.params.id
        }).then(()=>{toast.success("Feedback Submitted Successfully")})
    }
    if (localrole === '3') {
        return (
            <>
                <Navbar />
                <div><Toaster/></div>
                <div className='headTitle'><p>FeedBack for {project.projectName}</p></div>
                    <div className='col-md-8 col-md-offset-2 formData'>
                        <form>
                            <div className='form-group'><label className='form-label'>Feedback</label>
                                <textarea className='form-control' placeholder='Feedback'  onChange={(e) => { setFeedback(e.target.value); }} /></div>
                                <button className='col-md-4 col-md-offset-4 btn btn-warning' onClick={submitFeedback}>Submit</button>
                        </form>
                    </div>
            </>
        );
    }
    else {history.push('/'); window.location.reload(); }
}

export default HODFeedback;