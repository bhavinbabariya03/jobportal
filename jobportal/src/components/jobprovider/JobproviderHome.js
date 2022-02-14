import React, { useState,useEffect } from "react";
import verify from './verify.jpg'
import CompleteProfile from "./CompleteProfile";

function JobproviderHome() {
	const [mode, setmode] = useState("incomplete");

	const changeMode=(mode)=>{
		setmode(mode);
	}

	const checkUser = async() => {
		const response = await fetch("http://localhost:5000/api/jobprovider/check", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				"auth-token": localStorage.getItem("token"),
			},
		});

		const json = await response.json();
		if (json.success) {
			setmode("complete");
		}
	};

	useEffect(async() => {
		await checkUser();
	}, []);
	
	return (
		<div className="container mt-5 ">
			{/* <button class="btn btn-primary btn-lg float-right" type="submit">
				Post Job
			</button> */}
			<div className="row">
				{
					(mode==="incomplete") ? <CompleteProfile changeMode={changeMode}/> :<div className="shadow-sm p-3 mb-5 bg-white rounded">
					<h2  style={{color:"green",textAlign:"center"}}>
						Your Profile is Complete &nbsp;&nbsp;<img src={verify} style={{width:"50px",height:"50px"}}></img>			
					</h2>
			  </div>
				}
			</div>

			<div className="container">
				Your ALl Jobs here
			</div>
		</div>
	);
}

export default JobproviderHome;
