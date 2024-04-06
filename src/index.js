import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from 'react-router-dom'; // Import BrowserRouter
import './index.css';
import reportWebVitals from './reportWebVitals';
import CreateMemoryFrame from './memoryFrameComponent';
import SessionIdComponent from './sessionIdComponent';
import MediaLinkFetcher from './mediaFetcher';
import MemoryFrameComponentTwo from './memoryFrameComponentTwo'
import  { ShippingPolicy }  from './ShippingPolicy';
import  { PrivacyPolicy }  from './PrivacyPolicy';
import  { RefundPolicy }  from './RefundPolicy';
import { TermsAndConditions } from './TermsAndCOnditions';
import  {Checkout}  from './Checkout';
import { OrderSuccessful } from './OrderSuccessful';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter> {/* Wrap your components with BrowserRouter */}
      <SessionIdComponent />
    
      <Routes>
          <Route path="/privacy-policy"element={<PrivacyPolicy/>} />
          <Route path="/shipping-policy" element={<ShippingPolicy/>} />
          <Route path="/refund-policy" element={<RefundPolicy/>} />
          <Route path="/terms-and-conditions" element={<TermsAndConditions/>} />
          <Route path="/checkout" element={ <Checkout />} /> 
          <Route path="/orderSuccessful" element={ <OrderSuccessful />} /> 
          <Route path='/' element={<MemoryFrameComponentTwo/>} />
        </Routes>
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
