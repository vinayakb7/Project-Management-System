import React, { useEffect, useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Navbar from '../components/Navbar';
import Axios from 'axios';

export default function Feedback(props) {
    const [feedback, setFeedback] = useState([]);
    useEffect(() => {
        Axios.post('https://localhost:7273/api/Feedback/feedbackByProjectId', { projectId: props.match.params.id }).then((response) => { setFeedback(response.data) });
    }, [props.match.params.id]);
    return (
        <>
            <Navbar />
            <div className=''>
                <div><Toaster /></div>
                <div className='headTitle'><p>Feedbacks for {props.match.params.name}</p></div>
                <div className=''>
                    <table className="table table-striped table-hover">
                        <thead>
                            <tr>
                                <th scope="col">Sr.No</th>
                                <th scope="col">Feedback By HOD</th>
                                <th scope="col">Feedback By Project Incharge</th>
                                <th scope="col">Feedback By Internal Guide</th>
                            </tr>
                        </thead>
                        <tbody>
                            {feedback.map((item, index = 0) => (
                                <tr key={item.projectId}>
                                    <td>{index + 1}</td>
                                    <td>{item.feedbackByHOD}</td>
                                    <td>{item.feedbackByPIC}</td>
                                    <td>{item.feedbackByIG}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    )
}
