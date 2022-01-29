import './App.css';
import React, { useState,useEffect } from 'react';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';

function App() {

  const [alert, setAlert] = useState({msg : "Registered Successfully !!!!!",type : "success"});

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
      <Router>
      <Navbar/>
      <Alert alert={alert}/>
        <Switch>
                <Route exact path="/login" ><Login showAlert={showAlert}/></Route>
                <Route exact path="/register" ><Register showAlert={showAlert}/></Route>
                <Route exact path="/home"><Home/></Route>
        </Switch>
      </Router>
    </>
    
  );
}

export default App;
