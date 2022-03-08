import React, { useState,useEffect } from "react";
import verify from './verify.jpg'
import CompleteProfile from "./CompleteProfile";
import Loading from "../Loading";
import ShowJob from "./../job/Showjob";
function JobproviderHome() {
	const [mode, setmode] = useState("");

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
		else{
			setmode("incomplete")
		}
	};

	useEffect(async() => {
		await checkUser();
	}, []);
	
	return (
		<div className="container mt-5 ">
			<div className="row">
				{
					(mode==="") && <Loading/>
				}
				{
					(mode==="incomplete") && <CompleteProfile changeMode={changeMode}/> 
				}
				{
					(mode==="complete") && <><div className="shadow-sm p-3 mb-5 bg-white rounded">
						<h2  style={{color:"green",textAlign:"center"}}>
							Your Profile is Complete &nbsp;&nbsp;<img src={verify} style={{width:"50px",height:"50px"}}></img>			
						</h2>
					</div>
					<div >
					Your All Jobs here
					<ShowJob/>
				</div></>
				}
			</div>
		</div>
	);
}

export default JobproviderHome;
