import './App.css';
import React, { useState,useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
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
      <Router>
      <Navbar/>
      <Alert alert={alert}/>
        <Switch>
          <Route exact path="/login" ><Login showAlert={showAlert} setUser={setUser}/></Route>
          <Route exact path="/register" ><Register showAlert={showAlert}/></Route>
          <Route exact path="/home"><Home/></Route>
          <Route exact path="/jobprovider"><JobproviderHome user={user}/></Route>
          <Route exact path="/jobprovider/profile"><Profile/></Route>
        </Switch>
      </Router>
    </>
    
  );
}

export default App;
