import React,{useState,useEffect} from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import Navbar from '../components/Navbar';
import Axios from 'axios';

function Dashboard() {
    const history = useHistory();
    let localrole = JSON.parse(localStorage.getItem('role'));
    let username = JSON.parse(localStorage.getItem('userName'));
    const [data,setData] = useState([]);
    useEffect(() => {
        Axios.get('https://localhost:7273/api/User/adminDashboard').then((response) => {
            setData(response.data[0]);
        });
    }, []);
    if (localrole === '1') {
        return (
            <>
                <Navbar />
                <div className='col-md-8 col-md-offset-2 StudentDashboard'>
                    <div className='col-md-12 userName'><p>Welcome Mr. {username}</p></div>
                    <div className='body'>
                        <div className='col-lg-4 col-md-4 '>
                            <div className='cardDashboard'>
                                <div className='cardDashboardTitle'>Total User Registered</div>
                                <div className='cardDashboardBody'>
                                    {data.userName}
                                </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='cardDashboard'>
                                <div className='cardDashboardTitle'>Total Project Uploaded</div>
                                <div className='cardDashboardBody'>
                                    {data.userRole}
                                    </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='cardDashboard'>
                                <div className='cardDashboardTitle'>Total HOD Listed</div>
                                <div className='cardDashboardBody'>
                                    {data.userContact}
                                    </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='cardDashboard'>
                                <div className='cardDashboardTitle'>Total Project Incharge Listed</div>
                                <div className='cardDashboardBody'>
                                    {data.userEmail}
                                    </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='cardDashboard'>
                                <div className='cardDashboardTitle'>Total Internal Guide Listed</div>
                                <div className='cardDashboardBody'>
                                    {data.userPassword}
                                    </div>
                            </div>
                        </div>
                        <div className='col-lg-4 col-md-4'>
                            <div className='cardDashboard'>
                                <div className='cardDashboardTitle'>Total Students Listed</div>
                                <div className='cardDashboardBody'>
                                    {data.userAddress}
                                    </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
    else {history.push('/'); window.location.reload(); }
}

export default Dashboard;