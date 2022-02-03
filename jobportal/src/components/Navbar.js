import React, { useState, useEffect } from 'react';
import './Navbar.css';
import { Link } from 'react-router-dom';
import { useHistory, useLocation } from 'react-router-dom';


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
	  <header className="header-area overlay">
        <nav className="navbar navbar-expand-md navbar-dark fixed-top">
            <div className="container">
                <Link to="/" className="navbar-brand">Jobguru.com</Link>
                
                <button type="button" className="navbar-toggler collapsed" data-toggle="collapse" data-target="#main-nav">
                    <span className="menu-icon-bar"></span>
                    <span className="menu-icon-bar"></span>
                    <span className="menu-icon-bar"></span>
                </button>
                
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
                        <li><Link to="/" className="nav-item nav-link">Portfolio</Link></li>

                        {!localStorage.getItem("token") 
                            ?<><li><Link className="nav-item nav-link" to="/login" >Login</Link></li>
                            <li><Link className="nav-item nav-link" to="/register">Register</Link></li></> 
                            :<li className="dropdown">
                                <Link to="/" className="nav-item nav-link" data-toggle="dropdown">Dashboard</Link>
                                <div className="dropdown-menu">
                                    <Link to="/profile" className="dropdown-item">Profile</Link>
                                    <Link to="/" className="dropdown-item" onClick={handleLogout}>Logout</Link>
                                </div>
                            </li>
                            //:<li><Link className="nav-item nav-link" to="/" onClick={handleLogout}>Logout</Link></li>
                        }
                    </ul>
                </div>
            </div>
        </nav>
    </header>
    {/* <div className="banner">
            <div className="container">
                <h1>Find Job with us </h1>
                <p>we are providing a various job across country</p>
                <Link to="/" className="button button-primary">Apply Now</Link>
            </div>
        </div> */}
  </div>;
}

export default Navbar;
