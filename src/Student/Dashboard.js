import React,{useState,useEffect} from 'react';
import '../style.css';
import Navbar from '../components/Navbar';
import Axios  from 'axios';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Toaster } from 'react-hot-toast';

function StudentDashboard() {
    const history = useHistory();
    const[projectCount,SetProjectCount] = useState("");
    const[projectStatus,SetProjectStatus] = useState("");
    let localrole = JSON.parse(localStorage.getItem('role'));
    let username = JSON.parse(localStorage.getItem('userName'));
    useEffect(() => {
        Axios.post('https://localhost:7273/api/Project/projectDetails', {
            userId: localStorage.getItem('userId')
        }).then((response) => {
            SetProjectCount(response.data[0].projectId);
            SetProjectStatus(response.data[0].projectName);
        });
    }, []);
    if (localrole === '2') {
        return (
            <>
                <Navbar />
                <div><Toaster /></div>
                <div className='col-md-8 col-md-offset-2 StudentDashboard'>
                    <div className='col-md-12 userName'><p>Welcome Mr. {username}</p></div>
                    <div className='body'>
                        <div className='col-lg-4 col-md-4 '>
                            <div className='cardDashboard'>
                                <div className='cardDashboardTitle'>Total Project Uploaded</div>
                                <div className='cardDashboardBody'>
                                    {projectCount}
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='cardDashboard'>
                                <div className='cardDashboardTitle'>Total Project Approved</div>
                                <div className='cardDashboardBody'>{projectStatus}</div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='cardDashboard'>
                                <div className='cardDashboardTitle'>Projects With Pending Status</div>
                                <div className='cardDashboardBody'>{projectCount - projectStatus}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else { history.push('/'); window.location.reload(); }
}

export default StudentDashboard;