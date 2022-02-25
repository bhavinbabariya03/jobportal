import './App.css';
import React, { useState,useEffect } from 'react';
import Home from './components/Home';
import About from './components/About';
import Login from './components/Login';
import Register from './components/Register';
import JobseekerProfile from './components/Jobseeker/Profile';
import ApplicationStatus from './components/Jobseeker/ApplicationStatus';
import ViewFullJob from './components/Jobseeker/ShowJobs/ViewFullJob';
import SearchedJob from './components/Jobseeker/Search/SearchedJob';
import SearchedFullJob from './components/Jobseeker/Search/SearchedFullJob';
import { BrowserRouter as Router, Route , Switch} from 'react-router-dom';
import Navbar from './components/Navbar';
import Alert from './components/Alert';
import JobproviderHome from './components/jobprovider/JobproviderHome';
import Profile from './components/jobprovider/Profile';
import Createjob from './components/job/Createjob';
import Showjob from './components/job/Showjob';
import Viewjob from './components/job/Viewjob';
import Editjob from './components/job/Editjob';
import Application from './components/jobprovider/Application';
import Viewprofile from './components/Application/Viewprofile';
import ViewProviderProfile from './components/Jobseeker/ViewProviderProfile';
import Viewprofile from './components/Application/Viewprofile';

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
    <div style={{backgroundColor:"#EEEEEE"}}>
      <Navbar/>
      <br/>
      <br/>
      <Alert alert={alert}/>
        <Switch>
          <Route exact path="/login" ><Login showAlert={showAlert} setUser={setUser}/></Route>
          <Route exact path="/register" ><Register showAlert={showAlert}/></Route>
          <Route exact path="/"><Home/></Route>
          <Route exact path="/about"><About/></Route>
          <Route exact path="/jobseeker/profile/view/:id"><Viewprofile/></Route>
          <Route exact path="/jobseeker/profile" ><JobseekerProfile/></Route>
          <Route exact path="/jobseeker/job/view"><ViewFullJob/></Route>
          <Route path="/jobseeker/job/search"><SearchedFullJob/></Route>
          <Route exact path="/jobseeker/jobs/search"><SearchedJob/></Route>
          <Route exact path="/jobseeker/applicationstatus"><ApplicationStatus/></Route>
          <Route exact path="/jobprovider"><JobproviderHome user={user}/></Route>
          <Route exact path="/jobprovider/profile/view/:id"><ViewProviderProfile/></Route>
          <Route exact path="/jobprovider/profile"><Profile/></Route>
          <Route exact path="/jobprovider/application/"><Application/></Route>
          <Route exact path="/job/"><Showjob/></Route>
          <Route exact path="/job/create"><Createjob/></Route>
          <Route exact path="/job/view"><Viewjob/></Route>
          <Route exact path="/job/edit"><Editjob/></Route>
          <Route exact path="/jobseeker/profile/view/:id"><Viewprofile/></Route>
        </Switch>
    </div>
    
  );
}

export default App;
