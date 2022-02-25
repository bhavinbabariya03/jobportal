import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser } from '@fortawesome/free-solid-svg-icons'


function Navbar() {
    const [temp, settemp] = useState(0);
    let history=useHistory();

    const handleLogout=(e)=>{
        e.preventDefault();
        localStorage.removeItem("token");
        temp===1 ? settemp(0) : settemp(1);
        console.log(temp);
        history.push("/");
    }

    let location = useLocation();
    
    return <div>
        <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">Jobguru.com</Link>
                <div id="main-nav" className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li><Link to="/" className={`nav-item nav-link ${location.pathname==="/"? "active" : ""}`}>Home</Link></li>
                        <li><Link to="/about" className={`nav-item nav-link ${location.pathname==="/about"? "active" : ""}`}>About Us</Link></li>
                        <li className="dropdown">
                            <Link to="/" className="nav-item nav-link" data-toggle="dropdown">Services</Link>
                            <div className="dropdown-menu">
                                <Link to="/" className="dropdown-item">Dropdown Item 1</Link>
                                <Link to="/" className="dropdown-item">Dropdown Item 2</Link>
                                <Link to="/" className="dropdown-item">Dropdown Item 3</Link>
                            </div>
                        </li>
                        <li><Link to="/jobseeker/applicationstatus" className={`nav-item nav-link ${location.pathname==="/jobseeker/applicationstatus"? "active" : ""}`}>Profile</Link></li>

                        {!localStorage.getItem("token") 
                            ?<><li><Link  to="/login" className={`nav-item nav-link ${location.pathname==="/login"? "active" : ""}`} >Login</Link></li>
                            <li><Link  to="register" className={`nav-item nav-link ${location.pathname==="/register"? "active" : ""}`}>Register</Link></li></> 
                            :<li className="dropdown">
                                <Link to="/" className="nav-item nav-link" data-toggle="dropdown"><FontAwesomeIcon icon={faUser}/>&nbsp;&nbsp;{localStorage.getItem("username")} </Link>
                                <div className="dropdown-menu">
                                    <Link to="/jobseeker/profile" className="dropdown-item">Profile</Link>
                                    <Link to="/" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                                </div>
                            </li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </div>;
}

export default Navbar;
