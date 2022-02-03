import './App.css';
import React, { useState,useEffect } from 'react';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import Profile from './components/Jobseeker/Profile';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';

function App() {

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type)=>{
      setAlert({
        msg: message,
        type: type
      })
      setTimeout(() => {
          setAlert(null);
      }, 2000);
  }

  return (
    <>
      <Navbar/>
      <Router>
      <Alert alert={alert}/>
        <Switch>
                <Route exact path="/about" ><About/></Route>
                <Route exact path="/login" ><Login showAlert={showAlert}/></Route>
                <Route exact path="/register" ><Register showAlert={showAlert}/></Route>
                <Route exact path="/profile" ><Profile/></Route>
                <Route exact path="/home"><Home/></Route>
        </Switch>
      </Router>
    </>
    
  );
}

export default App;
