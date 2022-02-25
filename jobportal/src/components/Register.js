import React from 'react';
import './Login.css';
import { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';

function Register(props) {

    let history = useHistory();
    const [credentials, setcredentials] = useState({ email: "", username: "", pass: "", rpass: "" });
    const [error, seterror] = useState([]);

    const onChange = (e) => {
        e.preventDefault();
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    }

    const RegisterNow = async (str) => {

        if (credentials.pass !== credentials.rpass)
            props.showAlert("password should be same", "warning");
        else {
            const response = await fetch("http://localhost:5000/api/auth/", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: credentials.username, email: credentials.email, password: credentials.pass, role: str })
            });
            const json = await response.json()

            //console.log(json)

            if (json.success) {
                history.push('/login');
                props.showAlert("Registered Successfully", "success");
            }
            else {
                seterror(json.error);
                if (json.warning)
                    props.showAlert(json.warning, "danger");
            }
        }

    }

    const RegisterAsSeeker = async (e) => {
        e.preventDefault();
        RegisterNow("seeker");
    }

    const RegisterAsProvider = async (e) => {
        e.preventDefault();
        RegisterNow("provider");
    }

    return (
    //<div>
    // 	  <section className="ftco-section">
    // 		<div className="container">
    // 			<div className="row justify-content-center">
    // 				<div className="col-md-6 col-lg-5">
    // 					<div className="login-wrap p-4 p-md-5">
    //                         {/* <div className="icon d-flex align-items-center justify-content-center">
    //                             <span className="fa fa-user-o"></span>
    //                         </div> */}
    //                         <h3 className="text-center mb-4">Register</h3>
    //                         <form className="login-form">
    //                             <div className="form-group">
    //                                 <input type="email" className="form-control rounded-left" name="email" placeholder="Email" value={credentials.email} onChange={onChange} required/>
    //                             </div>
    //                             <div className="form-group">
    //                                 <input type="text" className="form-control rounded-left" name="username" placeholder="Username" value={credentials.username} onChange={onChange} required/>
    //                             </div>
    //                             <div className="form-group d-flex">
    //                                 <input type="password" className="form-control rounded-left" name="pass" placeholder="Password" value={credentials.pass} onChange={onChange} required/>
    //                             </div>
    //                             <div className="form-group d-flex">
    //                                 <input type="password" className="form-control rounded-left" name="rpass" placeholder="Retype Password" value={credentials.rpass} onChange={onChange} required/>
    //                             </div>
    //                             <div className="form-group d-flex">
    //                                 {error.length!=0 && <ul>{error.map((e)=>{
    //                                     return <li key={e.msg}>{e.msg}</li>
    //                                     })}
    //                                 </ul>
    //                                 }
    //                             </div>
    //                             <div className="form-group text-center">
    //                                 <button type="submit" className="__submit btn btn-primary rounded  p-3 px-5 mt-5" onClick={RegisterAsSeeker}>Register as Jobseeker</button>
    //                                 <div>OR</div>
    //                                 <button type="submit" className="__submit btn btn-primary rounded  p-3 px-5 " onClick={RegisterAsProvider}>Register as JobProvider</button>
    //                             </div>
    //                         </form>
    // 	                </div>
    // 			    </div>
    // 			</div>
    // 		</div>
    // 	</section>
    //   </div>;
    
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <div className="col-5" style={{ marginTop: '40px' }}>
            <div className="shadow-lg p-3 mb-5 bg-white rounded">
                <h2 style={{ color: "#0062cc", textAlign: "center" }}>
                    Register Yourself
                </h2>
            </div>
            <div className="card shadow-lg p-3 bg-white rounded">
                <div className="card-body" style={{ padding: "20px" }}>
                    <form>
                        <div className="row">
                            <div className="col-sm-3">
                                <h3 className="mb-0 mx-4 mt-3" >Email</h3>
                            </div>
                            <div className="col-sm-9">
                                <input type="email" className="form-control border" required name="email" value={credentials.email} onChange={onChange} />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h3 className="mb-0 mx-4 mt-3" >Username</h3>
                            </div>
                            <div className="col-sm-9">
                                <input type="text" className="form-control border" required name="username" value={credentials.username} onChange={onChange} />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h3 className="mb-0 mx-4 mt-3" >Password</h3>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="password" className="form-control" name="pass" required value={credentials.pass} onChange={onChange} />
                            </div>
                        </div>
                        <hr />
                        <div className="row">
                            <div className="col-sm-3">
                                <h3 className="mb-0 mx-4 mt-3" >Retype Password</h3>
                            </div>
                            <div className="col-sm-9 text-secondary">
                                <input type="password" className="form-control" name="rpass" required value={credentials.repass} onChange={onChange} />
                            </div>
                        </div>
                        <hr />
                        <div className="form-group d-flex">
                            {error.length !== 0 && <ul>{error.map((e) => {
                                return <li key={e.msg}>{e.msg}</li>
                            })}</ul>
                            }
                        </div>
                        <div className="text-center">
                        <button className='btn btn-primary' style={{ width: "300px", height: "40px"}} onClick={RegisterAsSeeker}>Register as Jobseeker</button>
                        <div>OR</div>
                        <button className='btn btn-primary' style={{ width: "300px", height: "40px"}} onClick={RegisterAsProvider}>Register as Jobprovider</button>
                        <br/>
                        <br/>
                        <Link to="/login">Already registered?</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>
    );
}

export default Register;
