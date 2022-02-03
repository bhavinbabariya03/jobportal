import React, { useState, useEffect } from 'react';
import FileBase from 'react-file-base64';
import '../Login.css';

function UpdateProfile(props) {
    // const [details, setdetails] = useState({firstName:"", lastName:"", bio:"", contact:"", collage:"", degree:"", skills:"", experience:"", language: "", englishlevel:"", city:"", state:"", profileimage:""});
    //const [error, seterror] = useState([]);
    //const [updatedetails, setupdatedetails] = useState({firstName:"", lastName:"", bio:"", contact:"", collage:"", degree:"", skills:"", experience:"", language: "", englishlevel:"", city:"", state:"", profileimage:""})

    const [updateprofile, setupdateprofile] = useState(props.profile[0])

    const onChange=(e)=>{
        setupdateprofile({...updateprofile,[e.target.name] : e.target.value});        
    }

    const updateProfile = async (e)=>{
        e.preventDefault();
        console.log(updateprofile);
        const respose=await fetch("http://localhost:5000/api/jobseeker/updatedetails/"+ updateprofile._id,{
            method:'PUT',
            headers: {
                'Content-Type': 'application/json',
                'auth-token':localStorage.getItem('token'),
              },
              body: JSON.stringify(updateprofile)
        });
        const json=await respose.json();
        if(json.success){
            props.changemode("show")
            alert('profile updated successfully!')
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
                            <h3 className="text-center mb-4">Update Profile</h3>
                            <form className="login-form">
                                <div className="form-group">
                                    <input name="firstName" className="form-control rounded-left" placeholder="First Name" value={updateprofile.firstName} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="lastName" className="form-control rounded-left" placeholder="Last Name" value={updateprofile.lastName} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <textarea name="bio" className="form-control rounded-left" placeholder="Bio" value={updateprofile.bio} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="contact" className="form-control rounded-left" placeholder="Contact" value={updateprofile.contact} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="collage" className="form-control rounded-left" placeholder="Collage Name" value={updateprofile.collage} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="degree" className="form-control rounded-left" placeholder="Degree" value={updateprofile.degree} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="skills" className="form-control rounded-left" placeholder="Skills" value={updateprofile.skills} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="experience" className="form-control rounded-left" placeholder="Experience(in years)" value={updateprofile.experience} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="language" className="form-control rounded-left" placeholder="Languages you know" value={updateprofile.language} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="englishlevel" className="form-control rounded-left" placeholder="English Level" value={updateprofile.englishlevel} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="city" className="form-control rounded-left" placeholder="City" value={updateprofile.city} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <input name="state" className="form-control rounded-left" placeholder="State" value={updateprofile.state} onChange={onChange} required/>
                                </div>
                                <div className="form-group">
                                    <FileBase type="file" multiple={false} value={updateprofile.profileimage} onDone={({ base64 }) => setupdateprofile({ ...updateprofile, profileimage: base64 })} />
                                </div>
                                 <div className="form-group text-center mt-5">
                                    <button type="submit" className="btn btn-primary rounded p-3 px-5" onClick={updateProfile}>Update Profile</button>
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

export default UpdateProfile;