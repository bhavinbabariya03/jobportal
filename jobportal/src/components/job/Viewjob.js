import React,{useState,useEffect} from 'react'
import {useLocation,useHistory} from 'react-router-dom'

function Viewjob() {
    const [arr, setarr] = useState([])
    let location=useLocation();
    let history=useHistory();
    const job=location.state;

    const handleBack=()=>{
        history.goBack()
    }

    const handleEdit=()=>{
        history.push('/job/edit',job);
    }

    useEffect(() => {
        setarr(job.description.split("\n"));
        console.log(arr)
    }, [])
    
    const handleDelete=async ()=>{
        let result = window.confirm("Are sure to delete job?");
        if(result)
        {
            const response = await fetch(`http://localhost:5000/api/job/deletejob/${job._id}`, {
                method: 'DELETE',
                headers: {
                    'auth-token' : localStorage.getItem('token')
                }
            });
            const json = await response.json()
            if(json.success)
            {
                alert("Deleted successfully !");
                history.push('/job/');
            }
            else
            {
                alert(json.error);
            }
        }
    }
return (
<div className='container mt-5' style={{color:"black"}}>
    <div className="row mt-2 mb-2 shadow p-3 mb-5 bg-white rounded" >
        <div style={{padding:"25px"}}>
            <h2 style={{fontSize:"25px"}}>1. {job.title}</h2><br/>
            <p className='mt-3'><b>Type :</b> {job.type}</p>
            <p><b>Role :</b>  {job.role}</p>
            <p><b>HR Name:</b>  {job.hrname}</p>
            
            <p><b>Skills : </b>{job.skill}</p>
            <p><b>Experience  : </b>{job.expfrom} to {job.expto} years</p>
            <p><b>Description : </b></p>
            <div className='border' style={{padding:"20px"}} dangerouslySetInnerHTML={{ __html: job.description}} />
            <br/>
            <p><b>Posted Date : </b><span>{job.postdate}</span></p>
        </div>
        <div className='mt-2 mb-4'>
                <button className='btn btn-secondary' style={{width:"65px"}} onClick={handleEdit}>Edit</button>
                <button className='mx-4 btn btn-danger' style={{width:"75px"}} onClick={handleDelete}>Delete</button>
                <button className='btn btn-primary' style={{width:"60px"}} onClick={handleBack}>Back</button>
            </div>
    </div>
    <div className="row mt-2 mb-2 " >
        {/* <h3 style={{fontSize:"25px"}}>Applications</h3> */}
    </div>
</div>
  )
}

export default Viewjob