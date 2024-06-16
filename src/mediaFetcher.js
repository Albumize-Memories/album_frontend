import React, { useEffect } from 'react';
import axios from 'axios';
import "./mediaFetcher.css";
const MediaLinkFetcher = () => {

    useEffect(() => {
        // Check if URL parameters exist and trigger Lambda if so
        const params = new URLSearchParams(window.location.search);
        const s3Bucket = params.get('s3_bucket_name');
        const objectKey = params.get('object_key');
        console.log('here');
        console.log(s3Bucket, objectKey);
        if (s3Bucket && objectKey) {
            triggerLambda(s3Bucket, objectKey);
        }
    }, []);

    const triggerLambda = async (s3Bucket, objectKey) => {
        try {
            // Make POST request with extracted parameters
            const response = await axios.post('https://backend.tasveer.shop/fetchMedia', JSON.stringify({ s3_bucket_name: s3Bucket, object_key: objectKey }), {
                headers: {
                  // Set any necessary headers based on your backend API requirements
                  'Content-Type': 'application/json',
                },
                });
                console.log(response);
                const mediaLink = response.data.link;
            
                // Redirect the user to the extracted link
                window.location.href = mediaLink;
        } catch (error) {
           alert('Please contact support at tasveer@gmail.com');
            // Handle API errors (e.g., display an error message
        }
       
    };

    return(
        <div className='loading'>
            <h1>Fetching your memories for you...</h1>
            <div class="loading-container">
                <img src="https://business-website-static-assets-730335261607.s3.amazonaws.com/qrAnimation-removebg-preview.png" alt='loading' class="loading-image"/>
            </div>
        </div>
    )
 
};

export default MediaLinkFetcher;
