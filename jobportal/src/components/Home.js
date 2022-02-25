import React from 'react';
import ShowJob from './Jobseeker/ShowJobs/ShowJob';
import ShowAllJob from './Jobseeker/ShowJobs/ShowAllJob';
import video from './Jobseeker/video.mp4'
import './Jobseeker/home.css'
import './Login.css'
import Search from './Jobseeker/Search/Search'

function Home() {
  return <>
      <div>
          <div class="main-banner" id="top">
            <video autoPlay muted loop id="bg-video">
                <source src={video} type="video/mp4" />
            </video>
            <div class="video-overlay header-text">
              <div class="caption">
                <h6>Start your career now</h6>
                <h2>Find the perfect <em>Job</em></h2>
                 <Search className="d-flex align-items-center justify-content-center"/>
              </div>
            </div>
          </div>
         {!localStorage.getItem("token")?<></>:<ShowJob/>}
        <ShowAllJob/>
      </div>
  </>;
}

export default Home;
