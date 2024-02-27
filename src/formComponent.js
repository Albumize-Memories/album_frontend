import React, { useState , useEffect} from 'react';
import UploadMultipleComponent from './uploadMultipleComponent';
import axios from 'axios';

const FormComponent = ({ onSubmit }) => {
    const [theme, setTheme] = useState('');
    const [tagline, setTagline] = useState('');
    const [numPhotos, setNumPhotos] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(theme);
        await onSubmit({ theme, tagline, numPhotos});
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label htmlFor="theme">Type:</label>
                <select id="theme" value={theme} onChange={(e) => setTheme(e.target.value)}>
                    <option value="">Select Theme</option>
                    <option value="travel">Travel</option>
                    <option value="gifting">Gifting</option>
                    <option value="other">Other</option>
                </select>
            </div>
            <div>
                <label htmlFor="tagline">Tagline:</label>
                <input
                    type="text"
                    id="tagline"
                    value={tagline}
                    onChange={(e) => setTagline(e.target.value)}
                    placeholder="Enter tagline"
                />
            </div>
            <div>
                <label htmlFor="numPhotos">Num Photos:</label>
                <input
                    type="text"
                    id="numPhotos"
                    value={numPhotos}
                    onChange={(e) => setNumPhotos(e.target.value)}
                    placeholder="Choose Number Of Photos"
                />
            </div>
            <button type="submit">Submit</button>
        </form>
    );
};

const UploadFormComponent = () => {
    const [showFileSelection, setShowFileSelection] = useState(false);
    const [formData, setFormData] = useState(null);
    const [sessionUid, setSessionUid] = useState('');

    useEffect(() => {
        // Check if the unique identifier exists in cookies
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
          // If it doesn't exist, generate a new one
          sessionId = generateUniqueId();
          localStorage.setItem('sessionId', sessionId);
        }
        // Send the unique identifier to the backend
        // axios.defaults.headers.common['Session-Token'] = sessionId;
        setSessionUid(sessionId);
      }, []);
    
      const generateUniqueId = () => {
        // Generate a UUID (Universally Unique Identifier)
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };

    const handleFormSubmit = async (data) => {
        setFormData(data);
        setShowFileSelection(true);
        const body=JSON.stringify(data);
        try {
            // Make the API call
            const response = await fetch('http://127.0.0.1:5000/createGuestUser', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Session-Token': sessionUid,
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to upload images');
            }

            // Handle the response if needed
            const responseData = await response.json();
            console.log('Response:', responseData);
        } catch (error) {
            console.error('Error:', error.message);
        }
    };

    return (
        <div>
            {!showFileSelection ? (
                <FormComponent onSubmit={handleFormSubmit} />
            ) : (
                <div>
                    <h2>Selected Type: {formData.theme}</h2>
                    <h2>Tagline: {formData.tagline}</h2>
                     <UploadMultipleComponent/>
                </div>
            )}
        </div>
    );
};

export default UploadFormComponent;
