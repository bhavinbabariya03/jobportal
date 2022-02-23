import React,{useState,useEffect} from 'react'
import {useLocation,useHistory} from 'react-router-dom'

function ViewFulljob() {
    let location=useLocation();
    let history=useHistory();
    console.log(location.state)
    const j=location.state;

    const handleBack=()=>{
        history.push('/');
    }

    const handleApply=async(e)=>{
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/jobseeker/applyforjob/${j.job._id}`, {
            method: 'GET',
            headers: {
                'auth-token':localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
            });
        const json = await response.json()
        console.log(json)
        if(json.success){
            alert('You have successfully applied for this job!!');
        }
        else{
            alert(json.error)
        }
    }

    // useEffect(() => {
    //     setarr(j.job.description.split("\n"));
    //     console.log(arr)
    // }, [])
    
return (
<div className='container mt-5' style={{color:"black"}}>
    <div className="row mt-2 mb-2 shadow p-3 mb-5 bg-white rounded" >
        <div style={{padding:"25px"}}>
            <h2 style={{fontSize:"25px"}}>{j.job.title}</h2><br/>
            <p className='mt-3'><b>Type :</b> {j.job.type}</p>
            <p><b>Role :</b>  {j.job.role}</p>
            <p><b>HR Name:</b>  {j.job.hrname}</p>
            <p><b>Skills : </b>{j.job.skill}</p>
            <p><b>Experience  : </b>{j.job.expfrom} To {j.job.expto} years</p>
            <p><b>Description : </b></p>
            <div className='border' style={{padding:"20px"}} dangerouslySetInnerHTML={{ __html: j.job.description}} />
            <br/>
            <p><b>Posted Date : </b><span>{j.job.postdate}</span></p>

        </div>
        <div className='mt-2 mb-4'>
            <button className='btn btn-primary' style={{width:"60px"}} onClick={handleBack}>Back</button>&nbsp;&nbsp;
            <button className='btn btn-secondary' style={{width:"60px"}} onClick={handleApply}>Apply</button>
        </div>
    </div>
</div>
  )
}

export default ViewFulljob