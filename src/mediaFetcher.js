import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MediaLinkFetcher = () => {
    const [urlInput, setUrlInput] = useState('');
    const [link, setLink] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        // Check if URL parameters exist and trigger Lambda if so
        const params = new URLSearchParams(window.location.search);
        const s3Bucket = params.get('s3_bucket_name');
        const objectKey = params.get('object_key');

        if (s3Bucket && objectKey) {
            triggerLambda(s3Bucket, objectKey);
        }
    }, []);

    const triggerLambda = async (s3Bucket, objectKey) => {
        try {
            // Make POST request with extracted parameters
            const response = await axios.post('http://127.0.0.1:5000/fetchMedia', { s3_bucket_name: s3Bucket, object_key: objectKey });
            setLink(response.data.link);
            setError('');
        } catch (error) {
            setLink('');
            setError(error.message);
        }
    };

    const handleInputChange = (e) => {
        setUrlInput(e.target.value);
    };

    const handleButtonClick = () => {
        const url = new URL(urlInput);
        const s3Bucket = url.searchParams.get('s3_bucket_name');
        const objectKey = url.searchParams.get('object_key');
        
        if (s3Bucket && objectKey) {
            triggerLambda(s3Bucket, objectKey);
        } else {
            setError('Invalid URL: Missing parameters');
        }
    };

    const handlePlayButtonClick = () => {
        window.location.href = link;
    };

    return (
        <div>
            <h1>Trigger AWS Lambda</h1>
            <div>
                <label>URL Input:</label>
                <input type="text" value={urlInput} onChange={handleInputChange} />
            </div>
            <button onClick={handleButtonClick}>Trigger Lambda</button>
            
                <div>
                    <p>Result link: <a href={link}>{link}</a></p>
                    <button onClick={handlePlayButtonClick}>Play</button>
                </div>
            
            {error && <p>{error}</p>}
        </div>
    );
};

export default MediaLinkFetcher;
