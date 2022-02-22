import React,{useState,useEffect} from 'react'
import ShowJobs from './ShowJobs'
import './home.css'
function ShowJob() {
    const [jobdata, setjobdata] = useState([])
    let count=0;
    const getjobs=async()=>{
        const response = await fetch("http://localhost:5000/api/jobseeker/getjob/", {
            method: 'GET',
            headers: {
				'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json()
        // console.log(json.finalResult.temp1)
        if(json.success)
        {
            setjobdata(json.jobarr);
        }
    }
    useEffect(() => {
        getjobs();
    }, [])
    
    return (
        <div className='container mt-5'>
            <h1>Recommended Jobs for you</h1>
            <br/>
            {jobdata.length===0 && 'No Jobs to display'}
            <div className="row">
                {jobdata.map((j) => {
                    count++;
                    return <ShowJobs key={j.job._id} no={count} j={j}/>
                })} 
            </div>
        </div>
    )
}
export default ShowJob