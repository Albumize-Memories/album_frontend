import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import UploadFormComponent from './formComponent';
import YouTubeEmbedComponent from './youtubeEmbedComponent';
import SoundCloudEmbed from './soundcloudEmbedComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UploadFormComponent />
    <YouTubeEmbedComponent/>
    {/* <SoundCloudEmbed/> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
