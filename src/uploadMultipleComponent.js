import React, { useState, useEffect } from 'react';
import axios from 'axios';

const config = require('./config.json');

const UploadMultipleComponent = () => {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [displayedImageIndex, setDisplayedImageIndex] = useState(0);
    const [additionalFiles, setAdditionalFiles] = useState([]);
    const maxAllowedFiles = 5;

    useEffect(() => {
        // Check if the unique identifier exists in cookies
        let sessionId = localStorage.getItem('sessionId');
        if (!sessionId) {
          // If it doesn't exist, generate a new one
          sessionId = generateUniqueId();
          localStorage.setItem('sessionId', sessionId);
        }
    
        // Send the unique identifier to the backend
        axios.defaults.headers.common['Session-Token'] = sessionId;
      }, []);
    
      const generateUniqueId = () => {
        // Generate a UUID (Universally Unique Identifier)
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
          var r = Math.random() * 16 | 0,
              v = c == 'x' ? r : (r & 0x3 | 0x8);
          return v.toString(16);
        });
      };
      
    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length <= maxAllowedFiles) {
            setSelectedFiles(files);
            setDisplayedImageIndex(0); // Reset displayed image index when new files are selected
            setAdditionalFiles([]); // Reset additional files when new files are selected
        } else {
            alert("Sorry, you can upload a maximum of 5 pictures for this album");
            // You can provide feedback to the user in a better way, like displaying a message on the UI
            // This alert is just for demonstration purposes
        }
    };

    const handleAdditionalFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 1) {
            alert("Sorry, we allow only one additional attachment.");
            // You can provide feedback to the user in a better way, like displaying a message on the UI
            // This alert is just for demonstration purposes
        } else  {
            const fileType = files[0].type.split('/')[0]; // Get the file type (e.g., "video", "audio", "image")
            if (fileType === "image") {
                alert("Sorry, only video or audio file type is possible to upload.");
                // You can provide feedback to the user in a better way, like displaying a message on the UI
                // This alert is just for demonstration purposes
            } 
            else {
                setAdditionalFiles(files);
            }
        } 
    };

    const handleNext = () => {
        handleUpload();
        if(displayedImageIndex !== selectedFiles.length)
        {
         setDisplayedImageIndex((prevIndex) => prevIndex + 1);
        }
     };

     const handleUpload = async () => {
        const formData = new FormData();
        selectedFiles.forEach((file, index) => {
            formData.append(`file${index}`, file);
            if (index === displayedImageIndex && additionalFiles.length > 0) {
                additionalFiles.forEach((additionalFile, additionalIndex) => {
                    formData.append(`additionalFile${additionalIndex}`, additionalFile);
                });
            }
        });
        try {
            await axios.post('http://34.230.95.146:5000/uploadImages', formData, {
            // await axios.post(`${config.server_address}/uploadImages`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
           
            console.log('Files uploaded successfully');
        } catch (error) {
            console.error('Error uploading files: ', error);
        }
    };
    

    return (
      <div>
            <input type="file" onChange={handleFileChange} multiple accept="image/*"/>
          {selectedFiles.length > 0 && displayedImageIndex < selectedFiles.length && (
              <div>
                    <img
                        src={selectedFiles[displayedImageIndex] && URL.createObjectURL(selectedFiles[displayedImageIndex])}
                        alt="Uploaded"
                        style={{ maxWidth: '200px' }}
                    />
                    <input type="file" onChange={handleAdditionalFileChange} multiple accept="video/*, audio/*"/>
                    <button onClick={handleNext}>
                        Upload
                    </button>
              </div>
            )}
          {
            displayedImageIndex === selectedFiles.length && selectedFiles.length!==0 &&  (
                <div >
                 Yay! your files are uploaded.
                </div>
            )
          }
        </div>
    );
};

export default UploadMultipleComponent;
