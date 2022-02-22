import React from 'react';
import ShowJob from './Jobseeker/ShowJob';
import video from './Jobseeker/video.mp4'
import './Jobseeker/home.css'
import './Login.css'

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
              </div>
            </div>
          </div>
        <ShowJob/>
      </div>
  </>;
}

export default Home;
