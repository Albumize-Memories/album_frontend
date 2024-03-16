import React from 'react';
import "./Footer.css";

export const Footer = () => {
  return (
    <section className="component-wrapper footer-wrapper">
      <footer className="main-footer-content-container">
        <div className="footer-column">
          <h4>Contact us</h4>
          <p>
            <b>Email -</b> <a href="mailto:dc.memories.album@gmail.com">dc.memories.album@gmail.com</a>
            <div><b>Mobile No -</b> +91-8860792969</div>
            <div><b>Address -</b> B7, Rohini, New Delhi, Delhi, 110085</div>
          </p>
        </div>
        <div className="footer-column">
          <h4>Quick links</h4>
          <ul className="secondary-menu">
            <li>
            <a href="/refund-policy/">Refund policy</a>
            </li>
            <li>
            <a href="/shipping-policy/">Shipping policy</a>
            </li>
            <li>
              <a href="/privacy-policy/">Privacy policy</a>
            </li>
            <li>
              <a href="/terms-and-conditions/">Terms and conditions</a>
            </li>
          </ul>
        </div>
      </footer>
    </section>
  );
};
