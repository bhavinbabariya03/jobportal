import React,{useState,useEffect} from 'react';

function Showprofile(props) {

    const handleEdit=()=>{
        props.convertmode("edit");
    }

    const getData=async()=>{
        const response = await fetch("http://localhost:5000/api/jobprovider/getprofile/", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
				'auth-token' : localStorage.getItem('token')
            }
        });
        const json = await response.json()

        if(json.success)
        {
            props.setData(json.data);
            // console.log(data)
        }
    }

    useEffect(()=>{
        getData();
    }, []);
   
    return <div>
        <div class="card mb-3" >
            <div class="card-body" style={{padding:"50px"}}>
                <div class="row">
                    <div class="col-sm-3">
                        <h3 class="mb-0">Company Name</h3>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {props.data.cname}
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-sm-3">
                        <h3 class="mb-0">Email</h3>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {props.data.email}
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-sm-3">
                        <h3 class="mb-0">Phone</h3>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {props.data.contact}
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-sm-3">
                        <h3 class="mb-0">Address</h3>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {props.data.address}
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-sm-3">
                        <h3 class="mb-0">City</h3>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {props.data.city}
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-sm-3">
                        <h3 class="mb-0">State</h3>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {props.data.state}
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-sm-3">
                        <h3 class="mb-0">Company Type</h3>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {props.data.type}
                    </div>
                </div>
                <hr/>
                <div class="row">
                    <div class="col-sm-3">
                        <h3 class="mb-0">Description</h3>
                    </div>
                    <div class="col-sm-9 text-secondary">
                        {props.data.description}
                    </div>
                </div>
                <hr/>
                
                <div class="row">
                    <div class="col-sm-12">
                        <button class="btn btn-info" onClick={handleEdit}>Edit</button>
                    </div>
                </div>
            </div>
        </div>    
    </div>;
}

export default Showprofile;
