import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import '../Login.css';

function CreateProfile(props) {
    const [details, setdetails] = useState({firstName:"", lastName:"", bio:"", contact:"", collage:"", degree:"", skills:"", experience:"", language: "", englishlevel:"", city:"", state:"", profileimage:""});
    //const [error, seterror] = useState([]);
   
    const onChange=(e)=>{
        e.preventDefault();
        setdetails({...details,[e.target.name]:e.target.value});
    }

    const createProfile = async (e)=>{
        e.preventDefault();
        //console.log({firstName:details.firstName, lastName:details.lastName, bio:details.bio, contact:details.contact, collage:details.collage, degree:details.degree, skills:details.skills, experience:details.experience, language: details.language, englishlevel:details.englishlevel, city:details.city, state:details.state, profileimage:details.profileimage})
        const response = await fetch("http://localhost:5000/api/jobseeker", {
            method: 'POST',
            headers: {
                'auth-token':localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
                },
                body: JSON.stringify({firstName:details.firstName, lastName:details.lastName, bio:details.bio, contact:details.contact, collage:details.collage, degree:details.degree, skills:details.skills, experience:details.experience, language: details.language, englishlevel:details.englishlevel, city:details.city, state:details.state, profileimage:details.profileimage})
            });
        const json = await response.json()
        if(json.success){
            props.changemode("show")
            alert('profile created successfully!')
        }
        else{
            alert('error!')
        }
    }

    return( 
    <>
    <div>
        <section className="ftco-section">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-6 col-lg-5">
                        <div className="login-wrap p-4 p-md-5">
                            <h3 className="text-center mb-4">Create Profile</h3>
                            <form className="login-form">
                                <div className="form-group">
                                    <input name="firstName" className="form-control rounded-left" placeholder="First Name" value={details.firstName} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="lastName" className="form-control rounded-left" placeholder="Last Name" value={details.lastName} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <textarea name="bio" className="form-control rounded-left" placeholder="Bio" value={details.bio} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="contact" className="form-control rounded-left" placeholder="Contact" value={details.contact} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="collage" className="form-control rounded-left" placeholder="Collage Name" value={details.collage} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="degree" className="form-control rounded-left" placeholder="Degree" value={details.degree} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="skills" className="form-control rounded-left" placeholder="Skills" value={details.skills} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="experience" className="form-control rounded-left" placeholder="Experience(in years)" value={details.experience} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="language" className="form-control rounded-left" placeholder="Languages you know" value={details.language} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="englishlevel" className="form-control rounded-left" placeholder="English Level" value={details.englishlevel} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="city" className="form-control rounded-left" placeholder="City" value={details.city} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="state" className="form-control rounded-left" placeholder="State" value={details.state} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <FileBase type="file" multiple={false} onDone={({ base64 }) => setdetails({ ...details, profileimage: base64 })} />
                                </div>
                                 <div className="form-group text-center mt-5">
                                    <button type="submit" className="btn btn-primary rounded p-3 px-5" onClick={createProfile}>Create Profile</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
    </>
    )
}

export default CreateProfile;