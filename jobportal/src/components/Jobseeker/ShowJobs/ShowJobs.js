import React from 'react'
import {useHistory} from 'react-router-dom'

function ShowJobs(props) {
    const {j}=props
    const history=useHistory();

    //taking jobposted date 
    var datediff = function(date1) {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        var dt1 = new Date(date1);
        var dt2 = new Date();
        var seconds = Math.floor(dt2-dt1)/1000;
        if(seconds<=60){
            return Math.floor(seconds) + " seconds ago";
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

    var logostyle = {
        display: "inline-block",
        position: "relative",
        width: "150px",
        height: "150px",
        overflow: "hidden",
        borderRadius: "50%",
    }
    
    return (
        <div className="row mt-2 mb-2 shadow p-3 mb-5 bg-white rounded" style={{cursor: "pointer"}} onClick={handleView}>
            <div style={{padding:"25px"}}>
                <div class="row">
                    <div class="col-6 col-md-2"><img src={j.jobprovider.logo} style={logostyle} alt=""/></div>
                    <div class="col-12 col-md-8">
                        <h1>{j.job.title}</h1>
                        <h3>{j.jobprovider.cname}</h3>
                        <h4 className='mt-3'>{j.job.expfrom}-{j.job.expto} years <span className="mx-4">{j.jobprovider.city}</span></h4>
                        <h4 style={{whiteSpace: "nowrap",textOverflow: "ellipsis",overflow: "hidden"}}>{j.job.description}</h4>
                        <h5 className="mt-4">{datediff(j.job.postdate)}</h5>
                    </div>
                 </div>
            </div>
        </div>
    )
}

export default ShowJobs


