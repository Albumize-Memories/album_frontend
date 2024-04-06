import React from 'react';
import { useLocation } from 'react-router-dom';
import "./PolicyColumn.css";

export const OrderSuccessful = () => {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');  

    return (
        <div className="policy-column">
            <h1 class="main-page-title page-title h1">
                     Congratulations! Your order has been placed successfully.
            </h1>
            <h2 class="main-page-title page-title h2">
                     Your order ID is: {id}
            </h2>
            <p style={{marginLeft:'8px'}}>Kindly save it to inquire anytime later about your order.</p>      
       </div>
      );
};

