import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import "./PolicyColumn.css";
import {
    FormControl,
    FormLabel,
  } from '@chakra-ui/react'
  import axios from 'axios';
  import { useNavigate } from 'react-router-dom'; 

export const Checkout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const id = new URLSearchParams(location.search).get('id');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [pincode, setPincode] = useState('');
    const sessionId = localStorage.getItem('sessionId');
    const sendPaymentToBackend = async (paymentId, orderId, signature) => {
        try {
            const response = await axios.post('https://backend.tasveer.shop/verifyPayment', JSON.stringify({ paymentId, orderId, signature }), {
              headers: {
                // Set any necessary headers based on your backend API requirements
                'Content-Type': 'application/json',
                'Session-Token': sessionId
              },
            });
            console.log('API response:', response);
            navigate(`/orderSuccessful?id=${orderId}`);
            // Handle successful submission (e.g., display a success message)

            // As the order gets Successful just remove the session_Id from user's Browser so that they can place additional orders with ease.
            localStorage.removeItem('sessionId');
          } catch (error) {
            console.error('API error:', error);
            // Handle API errors (e.g., display an error message)
          }
    };

    
    const handleSubmit = async (event) => {
        event.preventDefault();
        // Process form data (e.g., send it to backend, validate, etc.)
        // You can add your logic here
        try {
            const response = await axios.post('https://backend.tasveer.shop/storeOrderData', JSON.stringify({ name, phone, address, city, state, pincode, id }), {
              headers: {
                // Set any necessary headers based on your backend API requirements
                'Content-Type': 'application/json',
                'Session-Token': sessionId
              },
            });
            console.log('API response:', response);
            const script = document.createElement('script');
        script.src = 'https://checkout.razorpay.com/v1/checkout.js';
        script.async = true;
        document.body.appendChild(script);

        // Initialize Razorpay
        script.onload = () => {
            const options = {
                "key": "rzp_test_3V6oseFw9sRhUt", // Enter the Key ID generated from the Dashboard
                "amount": "50000", // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
                "currency": "INR",
                "name": name, // your business name
                "description": "Test Transaction",
                "image": "https://example.com/your_logo",
                "order_id": id, // Pass the `id` obtained in the response
                "handler": function (response) {
                    const paymentId = response.razorpay_payment_id;
                    const orderId = response.razorpay_order_id;
                    const signature = response.razorpay_signature;
                
                    // Send payment information to backend
                    sendPaymentToBackend(paymentId, orderId, signature);
                },
                "prefill": {
                    "name": name,
                    "contact": phone
                },
                "notes": {
                    "address": address
                },
                "theme": {
                    "color": "#3399cc"
                }
            };
            const rzp1 = new window.Razorpay(options);
            rzp1.open();
        };
            // Handle successful submission (e.g., display a success message)
          } catch (error) {
            console.error('API error:', error);
            // Handle API errors (e.g., display an error message)
            alert("We couldn't upload your data, please reach out to us on tasveer@gmail.com.");
          }
       
    };

    return (
        <div className="policy-column">
            <h1 class="main-page-title page-title h0">
                     Your order ID is: {id}
            </h1>
            <p style={{marginLeft:'8px'}}>Kindly save it to inquire anytime later about your order.</p>
            <form onSubmit={handleSubmit}>
                <FormControl isRequired>
                    <FormLabel>Name</FormLabel>
                    <input type="text" id="name" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                    <FormLabel>Phone Number</FormLabel>
                    <input type="tel" id="phone" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} required />
                    <FormLabel>Shipping Address</FormLabel>
                    <input type="text" id="address" placeholder="Shipping Address" value={address} onChange={(e) => setAddress(e.target.value)} required />
                    <FormLabel>City</FormLabel>
                    <input type="text" id="city" placeholder="City" value={city} onChange={(e) => setCity(e.target.value)} required />
                    <FormLabel>State</FormLabel>
                    <input type="text" id="state" placeholder="State" value={state} onChange={(e) => setState(e.target.value)} required />
                    <FormLabel>Pincode</FormLabel>
                    <input type="text" id="pincode" placeholder="Pincode" value={pincode} onChange={(e) => setPincode(e.target.value)} required />
                </FormControl>
                <button type="submit">Proceed to Payment</button>
            </form>
       </div>
      );
};

