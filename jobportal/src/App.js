import './App.css';
import React, { useState,useEffect } from 'react';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import JobseekerProfile from './components/Jobseeker/Profile';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import JobproviderHome from './components/jobprovider/JobproviderHome';
import Profile from './components/jobprovider/Profile';

function App() {

    const [alert, setAlert] = useState(null);
    const [user, setuser] = useState({});
    const showAlert = (message, type)=>{
        setAlert({
          msg: message,
          type: type
        })
        setTimeout(() => {
            setAlert(null);
        }, 2000);
    }

  const setUser=(u)=>{
    setuser(u);
  }
  return (
    <>
      <Navbar/>
      <br/>
      <br/>
      <Alert alert={alert}/>
        <Switch>
          <Route exact path="/login" ><Login showAlert={showAlert} setUser={setUser}/></Route>
          <Route exact path="/register" ><Register showAlert={showAlert}/></Route>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/about"><About/></Route>
          <Route exact path="/jobseeker/profile" ><JobseekerProfile/></Route>
          <Route exact path="/jobprovider"><JobproviderHome user={user}/></Route>
          <Route exact path="/jobprovider/profile"><Profile/></Route>
        </Switch>
    </>
    
  );
}

export default App;
