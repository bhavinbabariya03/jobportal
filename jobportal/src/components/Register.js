import React from 'react';
import './Login.css';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

function Register(props) {

    let history=useHistory();
    const [credentials, setcredentials] = useState({email:"",username:"",pass:"",rpass:""});
    const [error, seterror] = useState([]);

    const onChange=(e)=>{
        e.preventDefault();
        setcredentials({...credentials,[e.target.name]:e.target.value});
    }

    const RegisterNow=async (str)=>{

        if(credentials.pass!==credentials.rpass)
            props.showAlert("password should be same","warning");
        else
        {
            const response = await fetch("http://localhost:5000/api/auth/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({name:credentials.username,email: credentials.email, password: credentials.pass,role:str})
                });
            const json = await response.json()

            //console.log(json)
            
            if(json.success)
            {
                history.push('/login');
                props.showAlert("Registered Successfully","success");
            }
            else{
                seterror(json.error);
            }
        }
        
    }

    const RegisterAsSeeker=async (e)=>{
        e.preventDefault();
            RegisterNow("seeker");
    }

    const RegisterAsProvider=async (e)=>{
        e.preventDefault();
        RegisterNow("provider");
    }

  return <div>
	  <section className="ftco-section">
		<div className="container">
			<div className="row justify-content-center">
				<div className="col-md-6 col-lg-5">
					<div className="login-wrap p-4 p-md-5">
                        {/* <div className="icon d-flex align-items-center justify-content-center">
                            <span className="fa fa-user-o"></span>
                        </div> */}
                        <h3 className="text-center mb-4">Register</h3>
                        <form className="login-form">
                            <div className="form-group">
                                <input type="email" className="form-control rounded-left" name="email" placeholder="Email" value={credentials.email} onChange={onChange} required/>
                            </div>
                            <div className="form-group">
                                <input type="text" className="form-control rounded-left" name="username" placeholder="Username" value={credentials.username} onChange={onChange} required/>
                            </div>
                            <div className="form-group d-flex">
                                <input type="password" className="form-control rounded-left" name="pass" placeholder="Password" value={credentials.pass} onChange={onChange} required/>
                            </div>
                            <div className="form-group d-flex">
                                <input type="password" className="form-control rounded-left" name="rpass" placeholder="Retype Password" value={credentials.rpass} onChange={onChange} required/>
                            </div>
                            <div className="form-group d-flex">
                                {error.length!=0 && <ul>{error.map((e)=>{
                                    return <li key={e.msg}>{e.msg}</li>
                                    })}
                                </ul>
                                }
                            </div>
                            <div className="form-group text-center">
                                <button type="submit" className="__submit btn btn-primary rounded  p-3 px-5 mt-5" onClick={RegisterAsSeeker}>Register as Jobseeker</button>
                                <div>OR</div>
                                <button type="submit" className="__submit btn btn-primary rounded  p-3 px-5 " onClick={RegisterAsProvider}>Register as JobProvider</button>
                            </div>
                        </form>
	                </div>
			    </div>
			</div>
		</div>
	</section>
  </div>;
}

export default Register;
