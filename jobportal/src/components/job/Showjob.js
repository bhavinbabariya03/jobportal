import React,{useState,useEffect} from 'react'
import Fulljob from './Fulljob'
function Showjob() {

    const [jobs, setjobs] = useState([])
    let count=0;
    const getjobs=async()=>{
        const response = await fetch("http://localhost:5000/api/job/getjob/", {
            method: 'GET',
            headers: {
				'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json()
        if(json.success)
        {
            setjobs(json.data);
        }
    }
    useEffect(() => {
        getjobs();
    }, [])
    
return (
<>
    <div className='container mt-5 '>
        
        {jobs.length===0 && 'No Jobs to display'}
                    
        {jobs.map((job) => {
            count++;
            return <Fulljob key={job._id} no={count} job={job}/>
        })} 
    </div>
</>)
}

export default Showjob