import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import reportWebVitals from './reportWebVitals';
import CreateMemoryFrame from './memoryFrameComponent';
import SessionIdComponent from './sessionIdComponent';
import MediaLinkFetcher from './mediaFetcher';
import MemoryFrameComponentTwo from './memoryFrameComponentTwo'

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your components with BrowserRouter */}
      <SessionIdComponent />
      <MemoryFrameComponentTwo />
      {/* <CreateMemoryFrame /> */}
      {/* <MediaLinkFetcher /> */}
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
