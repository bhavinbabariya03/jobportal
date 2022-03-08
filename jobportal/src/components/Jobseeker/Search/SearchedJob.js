import React,{useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import SearchedJobs from './SearchedJobs';

function SearchedJob() {
    let location=useLocation();
    const jobs=location.state.jobs;

    return (
        <>
            <div className='container mt-5'>
                <h1>Searched Jobs</h1>
                <br/>
                {jobs.length===0 && 'No Jobs to display'}
                <div className="row">
                    {jobs.map((j) => {
                        return <SearchedJobs key={j.job._id} j={j}/>
                    })} 
                </div>
            </div>
        </>
    )
}
export default SearchedJob