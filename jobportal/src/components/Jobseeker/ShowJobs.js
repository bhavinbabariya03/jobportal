import React from 'react'
import {useHistory} from 'react-router-dom'

// import './home.css'

function ShowJobs(props) {
    const {j}=props
    const history=useHistory();
    //console.log(j)
    // const card = {
    //     backgroundColor: "#fff",
    //     borderRadius: "5px",
    //     boxShadow: "0px 0px 15px rgba(0,0,0,0.1)",
    //     padding: "15px",
    //     marginBottom: "30px",
    // }

    // const salary = {
    //     fontSize: "13px",
    //     fontWeight: "bold",
    //     color: "#457dd1",
    //     display: "inline-block",
    //     marginBottom: "0px",
    // }

    // const view = {
    //     fontSize: "13px",
    //     fontWeight: "bold",
    //     color: "#5f6266",
    //     marginBottom: "2px",
    // }

    // const apply = {
    //     fontSize: "13px",
    //     fontWeight: "bold",
    //     color: "#457dd1",
    //     display: "inline-block",
    //     marginBottom: "0px",
    //     marginLeft:"135px",
    // }

    // const title = {
    //     fontSize: "19px",
    //     fontWeight: "600",
    //     color: "#232d39",
    //     letterSpacing: "0.5px",
    //     marginBottom: "1px",
    // }

    // const skill = {
    //     fontSize: "13px",
    //     fontWeight: "bold",
    //     color: "#5f6266",
    //     marginBottom: "2px",
    // }

    //taking jobposted date 
    var datediff = function(date1) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var dt1 = new Date(date1);
        var dt2 = new Date();
        var seconds = Math.floor(dt2-dt1)/1000;
        if(seconds<=60){
            return seconds + " seconds ago";
        }
        else if(seconds>60){
            var minutes = seconds/60;
            if(minutes<=60){
                return Math.floor(minutes) + " minutes ago";
            }
            else if(minutes>60){
                var hours = minutes/60;
                if(hours<=24){
                    return Math.floor(hours) + " hours ago";
                }
                else if(hours>24){
                    var days = hours/24;
                    if(days<=6){
                        return Math.floor(days) + " days ago";
                    }
                    else if(days>6){
                        var date = dt1.getDate();
                        var month = dt1.getMonth();
                        var year = dt1.getFullYear();
                        return date + " " + monthNames[month] + " " + year;
                    } 
                }
            }
        }
    }

    const handleView=()=>{
        history.push("/jobseeker/job/view", j);
    }
    return (
        <div className="row mt-2 mb-2 shadow p-3 mb-5 bg-white rounded" style={{cursor: "pointer"}} onClick={handleView}>
            <div style={{padding:"25px"}}>
                <h1>{j.job.title}</h1>
                <h3>{j.jobprovider.cname}</h3>
                <h4 className='mt-3'>{j.job.expfrom}-{j.job.expto} years <span className="mx-4">{j.jobprovider.city}</span></h4>
                <h4 style={{whiteSpace: "nowrap",textOverflow: "ellipsis",overflow: "hidden"}}>{j.job.description}</h4>
                <h5 className="mt-4">{datediff(j.job.postdate)}</h5>
                {/* <h6>{j.job.postdate}</h6> */}
                {/* <div className='mt-4'>
                    <button className='btn btn-primary' style={{width:"60px"}} >View</button>
                    <button className='mx-4 btn btn-secondary' style={{width:"65px"}}>Apply</button>
                </div>   */}
                {/* <p><b>Role :</b>  {job.role}</p>
                <p><b>HR :</b>  {job.hrname}</p>
                <p><b>Posted Date : </b><span>{job.postdate}</span></p>
                <div className='mt-4'>
                    <button className='btn btn-primary' style={{width:"60px"}} >View</button>
                    <button className='mx-4 btn btn-secondary' style={{width:"65px"}}>Apply</button>
                </div>  */}
            </div>
            {/* <div className="trainer-item" style={card}>
                <div className="down-content" >
                    <h4 style={title}>{job.title}</h4>
                    <p style={skill}>{job.skill}</p>
                    <p style={salary}> 70,000 </p>
                    <br/>
                    <Link style={view} to='/jobseeker/job'>+View</Link>
                    <Link style={apply} to='/jobseeker/job'>+Apply</Link>
                </div>
            </div> */}
        </div>
    )
}

export default ShowJobs


