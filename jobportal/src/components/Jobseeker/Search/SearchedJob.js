import React,{useState} from 'react'
import {useLocation,useHistory} from 'react-router-dom'
import SearchedJobs from './SearchedJobs';
import jobpng from '../job3.webp'

function SearchedJob() {
    let location=useLocation();

    const jobs=location.state.jobs;

    var imgstyle = {
        padding: "0",
        display: "block",
        margin: "0 auto",
        maxHeight: "100%",
        maxWidth: "100%",
    }

    return (
        <>
            {/* <div class="main-banner" id="top">
                <img style={imgstyle} src={jobpng}></img>
            </div> */}
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