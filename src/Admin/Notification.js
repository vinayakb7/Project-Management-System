import React, {useState} from 'react';
import Navbar from '../components/Navbar';
import Axios from 'axios';
import '../style.css';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';
import { Toaster,toast } from 'react-hot-toast';

function SendNotification(props) {
    const history = useHistory();
    const [notification,setNotification] = useState("");
    let localrole = JSON.parse(localStorage.getItem('role'));
    const submitNotification =(e) =>{
        e.preventDefault();
        Axios.post('https://localhost:7273/api/User/sendNotification', {
            userAddress: notification,
            userEmail: props.match.params.email
        }).then(()=>{toast.success("Notification Sent Successfully")})
    }
    if (localrole === '1') {
        return (
            <>
                <Navbar />
                <div><Toaster/></div>
                <div className='headTitle'><p>Send Notification to {props.match.params.email}</p></div>
                    <div className='col-md-8 col-md-offset-2 formData'>
                        <form>
                            <div className='form-group'><label className='form-label'>Notification</label>
                                <textarea className='form-control' placeholder='Notification'  onChange={(e) => { setNotification(e.target.value); }} /></div>
                                <button className='col-md-4 col-md-offset-4 btn btn-warning' onClick={submitNotification}>Submit</button>
                        </form>
                    </div>
            </>
        );
    }
    else {history.push('/'); window.location.reload(); }
}

export default SendNotification;